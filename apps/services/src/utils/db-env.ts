import { z } from 'zod'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local from project root
const envPath = resolve(__dirname, '../../../../.env.local')
console.log('Loading env from:', envPath)
const result = config({ path: envPath })
console.log('Env load result:', result.parsed ? 'SUCCESS' : 'FAILED')
console.log('DATABASE_URL from env:', process.env.DATABASE_URL)

const dbEnvSchema = z.object({
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
})

function validateDbEnv() {
  try {
    return dbEnvSchema.parse(process.env)
  } catch (error: unknown) {
    console.error('❌ Database environment validation failed:')
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as { issues: Array<{ path: string[]; message: string }> }
      console.error(zodError.issues?.map(issue => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n'))
    } else {
      console.error(error)
    }
    process.exit(1)
  }
}

export const dbEnv = validateDbEnv()
export const { DATABASE_URL } = dbEnv