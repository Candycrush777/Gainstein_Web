// server/api/users/list.get.ts
import { db } from "../utils/db"
import type { RowDataPacket } from "mysql2/promise"

export default defineEventHandler(async (event) => {
  try {
    // Podemos aceptar query params (búsqueda, paginación)
    const query = getQuery(event)
    const search = query.search ? `%${query.search}%` : `%`
    const limit = query.limit ? parseInt(query.limit as string) : 20
    const offset = query.offset ? parseInt(query.offset as string) : 0

    // Consulta: unir nombre y apellidos
    const [users] = await db.query<RowDataPacket[]>(
      `SELECT 
        id,
        CONCAT(first_name, ' ', last_name) AS name,
        email,
        role_id,
        is_active,
        created_at,
        last_login
       FROM users
       WHERE first_name LIKE ? 
          OR last_name LIKE ? 
          OR email LIKE ?
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [search, search, search, limit, offset]
    )

    return {
      success: true,
      data: users,
      meta: {
        limit,
        offset,
        count: users.length,
      },
    }
  } catch (error) {
    console.error("list.get.error:", error)
    return {
      success: false,
      message: "Error al listar usuarios",
    }
  }
})





