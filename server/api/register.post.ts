// server/api/register.post.ts
import { db } from "../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export default defineEventHandler(async (event) => {
  try {
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

    // ¿existe email?
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (rows.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email ya registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    // 👇 Insertar también first_name y last_name (opcionales)
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

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw createError({
        statusCode: 500,
        statusMessage: "JWT_SECRET no está configurado en el entorno",
      });
    }
    const expiryDays = Number(process.env.JWT_EXPIRES_IN?.replace("d", "")) || 7;

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
    // si ya es un createError, se respeta el status
    if (isError(err)) throw err;
    console.error("register.error:", err);
    throw createError({ statusCode: 500, statusMessage: "Error en el servidor" });
  }
});

