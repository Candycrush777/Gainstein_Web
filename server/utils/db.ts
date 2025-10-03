// server/utils/db.ts
import type { Pool } from 'mysql2/promise';
import { createPool } from 'mysql2/promise';

// Validar variables críticas (password puede estar vacío)
if (!process.env.DB_HOST || !process.env.DB_USER || process.env.DB_NAME === undefined) {
  throw new Error('Faltan variables de entorno de base de datos');
}

export const db: Pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT ?? 10),
  queueLimit: 0
});

