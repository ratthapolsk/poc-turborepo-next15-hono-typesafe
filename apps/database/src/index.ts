// Export schema for other apps to import
export * from './db/schema'

// Export database connection utilities
export { DATABASE_URL } from './utils/env'

// Re-export drizzle types for convenience
export type { InferInsertModel, InferSelectModel } from 'drizzle-orm'