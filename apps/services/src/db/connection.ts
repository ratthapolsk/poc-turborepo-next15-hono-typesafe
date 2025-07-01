import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@approval/database'
import { DATABASE_URL } from '@approval/database'

const client = postgres(DATABASE_URL)
export const db = drizzle(client, { schema })

export type Database = typeof db