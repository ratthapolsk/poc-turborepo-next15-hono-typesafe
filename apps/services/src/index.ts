import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { corsMiddleware } from '@/middleware/cors'
import { createOpenAPIApp } from '@/lib/openapi'
import usersRoutes from '@/routes/users-openapi'
import approvalRequestsRoutes from '@/routes/approval-requests-simple'
import healthRoutes from '@/routes/health-openapi'
import { env, PORT } from '@/utils/env'
import 'dotenv/config'

// Create OpenAPI app
const app = createOpenAPIApp()

// Middleware
app.use(logger())
app.use('/*', corsMiddleware)

// Routes
app.route('/', healthRoutes)
app.route('/', usersRoutes)
app.route('/api/approval-requests', approvalRequestsRoutes)

console.log(`🚀 Server is running on port ${PORT}`)
console.log(`🌍 Environment: ${env.NODE_ENV}`)
console.log(`🔒 Security: Environment validated`)
console.log(`📚 API Documentation: http://localhost:${PORT}/docs`)
console.log(`📄 OpenAPI Spec: http://localhost:${PORT}/openapi.json`)

serve({
  fetch: app.fetch,
  port: PORT,
})