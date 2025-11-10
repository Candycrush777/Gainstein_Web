// server/api/users/list.get.ts
import { db } from "../utils/db";
import type { RowDataPacket } from "mysql2/promise";
import { verifyJwtFromCookie } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  try {
    // Requiere sesión (cookie httpOnly con JWT); si no, 401
    const auth = verifyJwtFromCookie(event);
    if (!auth) {
      return createError({ statusCode: 401, statusMessage: "No autenticado" });
    }

    // Listado simple (sin filtros, sin paginación)
    const [users] = await db.query<RowDataPacket[]>(
      `
      SELECT 
        id,
        TRIM(CONCAT(COALESCE(first_name,''), ' ', COALESCE(last_name,''))) AS name,
        email,
        role_id,
        is_active,
        created_at,
        last_login
      FROM users
      ORDER BY created_at DESC
      `
    );

    return {
      success: true,
      data: users
    };
  } catch (error) {
    console.error("users.list.get.error:", error);
    return createError({ statusCode: 500, statusMessage: "Error al listar usuarios" });
  }
});






