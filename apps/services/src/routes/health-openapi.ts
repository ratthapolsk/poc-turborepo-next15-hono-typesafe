import { OpenAPIHono } from '@hono/zod-openapi'
import { healthCheckRoute, appInfoRoute } from '@/schemas/health'

const app = new OpenAPIHono()

// App info
app.openapi(appInfoRoute, (c) => {
  return c.json({ 
    message: 'Approval System API',
    version: '1.0.0',
    status: 'running' 
  })
})

// Health check
app.openapi(healthCheckRoute, (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  })
})

export default app