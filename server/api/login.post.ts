import { db } from "../utils/db";
import bcrypt from "bcrypt";
import type { RowDataPacket } from "mysql2/promise";
import { signJwt, setJwtCookie } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    // 1) Leer body y normalizar email
    const body = await readBody<{ email?: string; password?: string }>(event);
    if (!body?.email || !body?.password) {
      return createError({
        statusCode: 400,
        statusMessage: "Email y contraseña son obligatorios",
      });
    }
    const email = body.email.trim().toLowerCase();

    // 2) Buscar usuario
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    if (rows.length === 0) {
      return createError({ statusCode: 401, statusMessage: "Credenciales inválidas" });
    }
    const user = rows[0];

    // 3) Comparar contraseña
    const isMatch = await bcrypt.compare(body.password, user.password_hash);
    if (!isMatch) {
      return createError({ statusCode: 401, statusMessage: "Credenciales inválidas" });
    }

    // 4) Firmar JWT con expiración de .env (p.ej. 7d) y setear cookie httpOnly
    const token = signJwt({ id: user.id, email: user.email });
    setJwtCookie(event, token);

    // 5) Responder sin exponer token al cliente
    return {
      success: true,
      message: "Login exitoso",
      userId: user.id,
    };
  } catch (err) {
    console.error("login.error:", err);
    return createError({
      statusCode: 500,
      statusMessage: "Error en el servidor",
    });
  }
});
