// server/api/delete-user.post.ts
import type { ResultSetHeader } from 'mysql2/promise'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ id?: number }>(event)
    if (!body?.id) {
      return createError({ statusCode: 400, statusMessage: 'Falta id' })
    }

    const [res] = await db.execute<ResultSetHeader>(
      `UPDATE users SET is_active = 0, updated_at = NOW() WHERE id = ?`,
      [body.id]
    )

    return { success: true, affectedRows: res.affectedRows }
  } catch (err) {
    console.error('delete-user.error:', err)
    return createError({ statusCode: 500, statusMessage: 'Error al eliminar usuario' })
  }
})
