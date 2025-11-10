import { db } from "../utils/db";
import bcrypt from "bcrypt";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import { isError } from "h3";
import { signJwt, setJwtCookie } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    // 1) Leer body y validar mínimos
    const body = await readBody<{
      email?: string;
      password?: string;
      repeat_password?: string;
      first_name?: string | null;
      last_name?: string | null;
    }>(event);

    if (!body?.email || !body?.password || !body?.repeat_password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email, contraseña y repetir contraseña son obligatorios",
      });
    }
    if (body.password !== body.repeat_password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Las contraseñas no coinciden",
      });
    }

    const email = body.email.trim().toLowerCase();

    // 2) Verificar email único
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    if (rows.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email ya registrado",
      });
    }

    // 3) Hashear password
    const hashedPassword = await bcrypt.hash(body.password, 12);

    // 4) Insertar usuario
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO users
        (email, first_name, last_name, password_hash, is_active, email_verified, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [email, body.first_name ?? null, body.last_name ?? null, hashedPassword, 1, 0]
    );

    const insertId = result.insertId;
    if (!insertId) {
      throw createError({
        statusCode: 500,
        statusMessage: "No se pudo crear el usuario",
      });
    }

    // 5) JWT + cookie httpOnly (sesión iniciada tras registro)
    const token = signJwt({ id: insertId, email });
    setJwtCookie(event, token);

    // 6) Respuesta
    return {
      success: true,
      message: "Usuario registrado correctamente",
      userId: insertId,
    };
  } catch (err) {
    if (isError(err)) throw err;
    console.error("register.error:", err);
    throw createError({ statusCode: 500, statusMessage: "Error en el servidor" });
  }
});


