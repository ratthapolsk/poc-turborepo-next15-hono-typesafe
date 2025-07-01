import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { corsMiddleware } from '@/middleware/cors'
import usersRoute from '@/routes/users'
import { env, PORT } from '@/utils/env'
import 'dotenv/config'

const app = new Hono()

app.use(logger())
app.use('/*', corsMiddleware)

app.get('/', (c) => {
  return c.json({ 
    message: 'Approval System API',
    version: '1.0.0',
    status: 'running' 
  })
})

app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

app.route('/api/users', usersRoute)

console.log(`🚀 Server is running on port ${PORT}`)
console.log(`🌍 Environment: ${env.NODE_ENV}`)
console.log(`🔒 Security: Environment validated`)

serve({
  fetch: app.fetch,
  port: PORT,
})