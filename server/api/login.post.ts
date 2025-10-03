// server/api/login.post.ts
import { db } from "../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { RowDataPacket } from "mysql2/promise";

export default defineEventHandler(async (event) => {
  try {
    // Leer body
    const body = await readBody<{ email?: string; password?: string }>(event);

    if (!body?.email || !body?.password) {
      return createError({
        statusCode: 400,
        statusMessage: "Email y contraseña son obligatorios",
      });
    }

    const email = body.email.trim().toLowerCase();

    // Buscar usuario en la DB
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return createError({ statusCode: 401, statusMessage: "Credenciales inválidas" });
    }

    const user = rows[0];

    // Comparar contraseña
    const isMatch = await bcrypt.compare(body.password, user.password_hash);
    if (!isMatch) {
      return createError({ statusCode: 401, statusMessage: "Credenciales inválidas" });
    }

    // Validar que JWT_SECRET está definido
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw createError({
        statusCode: 500,
        statusMessage: "JWT_SECRET no está configurado en el entorno",
      });
    }

    // Leer días de expiración desde .env
    const expiryDays =
      Number(process.env.JWT_EXPIRES_IN?.replace("d", "")) || 7;

    // Generar JWT
    const payload = {
      id: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + expiryDays * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, secret);

    return {
      success: true,
      message: "Login exitoso",
      token,
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
