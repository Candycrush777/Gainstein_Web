// server/api/users/list.get.ts
import { db } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    // Puedes recibir query params para filtrar/paginar si quieres
    const query = getQuery(event)
    const search = query.search ? `%${query.search}%` : '%'
    const limit = query.limit ? parseInt(query.limit as string) : 20
    const offset = query.offset ? parseInt(query.offset as string) : 0

    // Consulta básica: filtra por nombre o email (LIKE) y ordena por nombre
    const [users] = await db.query(
      `SELECT id, name, email, created_at
       FROM users
       WHERE name LIKE ? OR email LIKE ?
       ORDER BY name ASC
       LIMIT ? OFFSET ?`,
      [search, search, limit, offset]
    )

    return {
      success: true,
      data: users,
      meta: {
        limit,
        offset,
        count: (users as unknown[]).length
      }
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Error al listar usuarios'
    }
  }
})


