// server/api/list.get.ts
import type { RowDataPacket } from 'mysql2/promise'
import { db } from '../../utils/db'


export default defineEventHandler(async (event) => {
  try {
    const q = getQuery(event)
    const search = (q.search as string)?.trim() ?? ''
    const limit = Math.max(1, Math.min(100, Number(q.limit ?? 20)))
    const offset = Math.max(0, Number(q.offset ?? 0))

    // Filtra por nombre completo o email (solo usuarios activos)
    const like = `%${search}%`

    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT
        id,
        email,
        first_name,
        last_name,
        role_id,
        is_active,
        email_verified,
        created_at,
        updated_at,
        last_login,
        locale,
        profile
      FROM users
      WHERE (is_active = 1)
        AND (
          ? = '' OR
          CONCAT(COALESCE(first_name,''), ' ', COALESCE(last_name,'')) LIKE ?
          OR email LIKE ?
        )
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
      [search, like, like, limit, offset]
    )

    return {
      success: true,
      data: rows,
      meta: { limit, offset, count: rows.length }
    }
  } catch (err) {
    console.error('list.get.error:', err)
    return createError({ statusCode: 500, statusMessage: 'Error al listar usuarios' })
  }
})
