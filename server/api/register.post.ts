// server/api/register.post.ts
import { db } from "../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export default defineEventHandler(async (event) => {
  try {
    // Leer body
    const body = await readBody<{
      email?: string;
      password?: string;
      repeat_password?: string;
    }>(event);

    // Validaciones
    if (!body?.email || !body?.password || !body?.repeat_password) {
      return createError({
        statusCode: 400,
        statusMessage:
          "Email, contraseña y repetir contraseña son obligatorios",
      });
    }
    if (body.password !== body.repeat_password) {
      return createError({
        statusCode: 400,
        statusMessage: "Las contraseñas no coinciden",
      });
    }

    const email = body.email.trim().toLowerCase();

    // Comprobar si el email ya existe
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      return createError({
        statusCode: 400,
        statusMessage: "Email ya registrado",
      });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(body.password, 12);

    // Insertar usuario
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO users (email, password_hash, is_active, email_verified, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
      [email, hashedPassword, 1, 0]
    );

    const insertId = result.insertId;
    if (!insertId) {
      return createError({
        statusCode: 500,
        statusMessage: "No se pudo crear el usuario",
      });
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

    // Generar JWT - payload con expiración incluida
    const payload = {
      id: insertId,
      email,
      exp: Math.floor(Date.now() / 1000) + expiryDays * 24 * 60 * 60,
    };

    const token = jwt.sign(payload, secret);

    return {
      success: true,
      message: "Usuario registrado correctamente",
      token,
      userId: insertId,
    };
  } catch (err) {
    console.error("register.error:", err);
    return createError({
      statusCode: 500,
      statusMessage: "Error en el servidor",
    });
  }
});
