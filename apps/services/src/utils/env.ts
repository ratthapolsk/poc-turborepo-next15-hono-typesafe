import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  
  // Server
  PORT: z.string().transform(val => parseInt(val, 10)).pipe(z.number().min(1).max(65535)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Security
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  API_KEY: z.string().min(16, 'API_KEY must be at least 16 characters'),
  
  // CORS
  CORS_ORIGIN: z.string().url('CORS_ORIGIN must be a valid URL'),
})

function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error('❌ Environment validation failed:')
    console.error(error.issues?.map(issue => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n'))
    process.exit(1)
  }
}

export const env = validateEnv()

// Export individual env vars for convenience
export const {
  DATABASE_URL,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  API_KEY,
  CORS_ORIGIN
} = env