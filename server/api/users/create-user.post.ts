// server/api/create-user.post.ts
import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { db } from '../../utils/db'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{
      email?: string
      password?: string
      first_name?: string
      last_name?: string
      role_id?: number
      locale?: string
      profile?: string | null
    }>(event)

    if (!body?.email || !body?.password) {
      return createError({ statusCode: 400, statusMessage: 'Email y password son obligatorios' })
    }

    const email = body.email.trim().toLowerCase()

    // ¿Email ya existe?
    const [exists] = await db.query<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email]
    )
    if (exists.length) {
      return createError({ statusCode: 400, statusMessage: 'Email ya registrado' })
    }

    const passwordHash = await bcrypt.hash(body.password, 12)

    const roleId = body.role_id ?? 2        // 1=admin, 2=user (por ejemplo)
    const isActive = 1
    const emailVerified = 0
    const firstName = body.first_name ?? null
    const lastName = body.last_name ?? null
    const locale = body.locale ?? 'es'
    const profile = body.profile ?? null

    const [res] = await db.execute<ResultSetHeader>(
      `
      INSERT INTO users
        (email, password_hash, first_name, last_name, role_id, is_active, email_verified, created_at, updated_at, last_login, locale, profile)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NULL, ?, ?)
      `,
      [email, passwordHash, firstName, lastName, roleId, isActive, emailVerified, locale, profile]
    )

    return {
      success: true,
      userId: res.insertId
    }
  } catch (err) {
    console.error('create-user.error:', err)
    return createError({ statusCode: 500, statusMessage: 'Error al crear usuario' })
  }
})
