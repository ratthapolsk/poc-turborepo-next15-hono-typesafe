const { defineConfig } = require('drizzle-kit')
const { config } = require('dotenv')
const { resolve } = require('path')

// Load .env from project root
const envPath = resolve(__dirname, '../../.env')
config({ path: envPath })

module.exports = defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})