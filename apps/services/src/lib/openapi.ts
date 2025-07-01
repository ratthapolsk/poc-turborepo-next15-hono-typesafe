import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

export function createOpenAPIApp() {
  const app = new OpenAPIHono()

  // Generate OpenAPI doc
  app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Approval System API',
      description: 'A comprehensive API for approval workflow management',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'users',
        description: 'User management endpoints',
      },
      {
        name: 'health',
        description: 'Health check endpoints',
      },
    ],
  })

  // Swagger UI
  app.get('/docs', swaggerUI({ url: '/openapi.json' }))

  return app
}

export type AppType = ReturnType<typeof createOpenAPIApp>