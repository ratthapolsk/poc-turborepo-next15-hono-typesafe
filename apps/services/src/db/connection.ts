import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { DATABASE_URL } from '@/utils/env'

const client = postgres(DATABASE_URL)
export const db = drizzle(client, { schema })

export type Database = typeof db