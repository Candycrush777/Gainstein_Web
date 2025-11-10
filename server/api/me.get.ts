import { verifyJwtFromCookie } from "../utils/jwt";
import { db } from "../utils/db";
import type { RowDataPacket } from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const payload = verifyJwtFromCookie(event);
  if (!payload) {
    return createError({ statusCode: 401, statusMessage: "No autenticado" });
  }

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT id, email, first_name, last_name FROM users WHERE id = ? LIMIT 1",
    [payload.id]
  );

  if (rows.length === 0) {
    return createError({ statusCode: 404, statusMessage: "Usuario no encontrado" });
  }

  return {
    id: rows[0].id,
    email: rows[0].email,
    first_name: rows[0].first_name,
    last_name: rows[0].last_name
  };
});
