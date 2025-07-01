import { drizzle } from 'drizzle-orm/postgres-js'
import { DATABASE_URL } from '@/utils/env'
import { users, approvalRequests } from '@/db/schema'
import postgres from 'postgres'

async function seedDatabase() {
  console.log('🌱 Seeding database...')
  
  try {
    const client = postgres(DATABASE_URL)
    const db = drizzle(client, { schema: { users, approvalRequests } })
    
    // Insert seed users
    console.log('👥 Inserting users...')
    const insertedUsers = await db.insert(users).values([
      { email: 'admin@example.com', name: 'System Admin' },
      { email: 'user@example.com', name: 'Test User' },
      { email: 'manager@example.com', name: 'Manager User' },
    ]).returning()
    
    // Insert seed approval requests
    console.log('📝 Inserting approval requests...')
    await db.insert(approvalRequests).values([
      {
        title: 'Budget Approval Request',
        description: 'Request approval for Q1 budget allocation',
        requesterId: insertedUsers[1].id,
        status: 'pending'
      },
      {
        title: 'Leave Request',
        description: 'Annual leave request for 2 weeks',
        requesterId: insertedUsers[2].id,
        status: 'pending'
      }
    ])
    
    console.log('✅ Database seeded successfully!')
    
    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seedDatabase()