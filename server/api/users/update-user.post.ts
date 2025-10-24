// server/api/update-user.post.ts
import type { ResultSetHeader } from 'mysql2/promise'
import { db } from '../../utils/db'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{
      id?: number
      email?: string
      password?: string
      first_name?: string | null
      last_name?: string | null
      role_id?: number | null
      is_active?: number | boolean | null
      email_verified?: number | boolean | null
      locale?: string | null
      profile?: string | null
    }>(event)

    if (!body?.id) {
      return createError({ statusCode: 400, statusMessage: 'Falta id' })
    }

    const fields: string[] = []
    const values: (string | number | null)[] = []

    if (typeof body.email === 'string') {
      fields.push('email = ?')
      values.push(body.email.trim().toLowerCase())
    }
    if (typeof body.first_name !== 'undefined') {
      fields.push('first_name = ?')
      values.push(body.first_name)
    }
    if (typeof body.last_name !== 'undefined') {
      fields.push('last_name = ?')
      values.push(body.last_name)
    }
    if (typeof body.role_id !== 'undefined' && body.role_id !== null) {
      fields.push('role_id = ?')
      values.push(body.role_id)
    }
    if (typeof body.is_active !== 'undefined' && body.is_active !== null) {
      fields.push('is_active = ?')
      values.push(Number(body.is_active ? 1 : 0))
    }
    if (typeof body.email_verified !== 'undefined' && body.email_verified !== null) {
      fields.push('email_verified = ?')
      values.push(Number(body.email_verified ? 1 : 0))
    }
    if (typeof body.locale !== 'undefined') {
      fields.push('locale = ?')
      values.push(body.locale)
    }
    if (typeof body.profile !== 'undefined') {
      fields.push('profile = ?')
      values.push(body.profile)
    }
    if (typeof body.password === 'string' && body.password.length > 0) {
      const hash = await bcrypt.hash(body.password, 12)
      fields.push('password_hash = ?')
      values.push(hash)
    }

    if (!fields.length) {
      return createError({ statusCode: 400, statusMessage: 'Nada para actualizar' })
    }

    fields.push('updated_at = NOW()')
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`
    values.push(body.id)

    const [res] = await db.execute<ResultSetHeader>(sql, values)

    return { success: true, affectedRows: res.affectedRows }
  } catch (err) {
    console.error('update-user.error:', err)
    return createError({ statusCode: 500, statusMessage: 'Error al actualizar usuario' })
  }
})
