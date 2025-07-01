import { drizzle } from 'drizzle-orm/postgres-js'
import { DATABASE_URL } from '@/utils/env'
import { users, approvalRequests } from '@/db/schema'
import postgres from 'postgres'
import { sql } from 'drizzle-orm'

async function resetDatabase() {
  console.log('🗑️ Resetting database...')
  
  try {
    const client = postgres(DATABASE_URL)
    const db = drizzle(client, { schema: { users, approvalRequests } })
    
    // Truncate tables in correct order (foreign key constraints)
    console.log('🧹 Truncating tables...')
    await db.execute(sql`TRUNCATE TABLE approval_requests CASCADE`)
    await db.execute(sql`TRUNCATE TABLE users CASCADE`)
    
    // Reset sequences
    await db.execute(sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`)
    await db.execute(sql`ALTER SEQUENCE approval_requests_id_seq RESTART WITH 1`)
    
    console.log('✅ Database reset successfully!')
    
    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Reset failed:', error)
    process.exit(1)
  }
}

resetDatabase()