import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'

if (!process.env.DB_FILE_NAME) {
  throw new Error('Please config env DB_FILE_NAME')
}

export const db = drizzle(process.env.DB_FILE_NAME)
