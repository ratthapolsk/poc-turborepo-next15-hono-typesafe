import { defineConfig } from 'drizzle-kit'
import { DATABASE_URL } from './src/utils/db-env'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
})