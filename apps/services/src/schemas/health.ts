import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'

// Schemas
export const HealthResponseSchema = z.object({
  status: z.literal('healthy'),
  timestamp: z.string().datetime(),
})

export const AppInfoSchema = z.object({
  message: z.string(),
  version: z.string(),
  status: z.string(),
})

// Routes
export const healthCheckRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['health'],
  summary: 'Health check',
  description: 'Check if the API server is running and healthy',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: HealthResponseSchema,
        },
      },
      description: 'Service is healthy',
    },
  },
})

export const appInfoRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['health'],
  summary: 'App information',
  description: 'Get basic information about the API',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: AppInfoSchema,
        },
      },
      description: 'App information',
    },
  },
})