import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { DATABASE_URL } from '@/utils/env'
import postgres from 'postgres'

async function runMigrations() {
  console.log('🔄 Running database migrations...')
  
  try {
    // Create migration client
    const migrationClient = postgres(DATABASE_URL, { max: 1 })
    const migrationDb = drizzle(migrationClient)
    
    // Run migrations
    await migrate(migrationDb, { migrationsFolder: './src/db/migrations' })
    
    console.log('✅ Migrations completed successfully!')
    
    // Close migration client
    await migrationClient.end()
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigrations()