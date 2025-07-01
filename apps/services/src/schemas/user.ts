import { z } from 'zod'
import { createRoute } from '@hono/zod-openapi'

// Schemas
export const UserSchema = z.object({
  id: z.number().openapi({ example: 1 }),
  email: z.string().email().openapi({ example: 'user@example.com' }),
  name: z.string().openapi({ example: 'John Doe' }),
  createdAt: z.string().datetime().openapi({ example: '2024-01-01T00:00:00Z' }),
  updatedAt: z.string().datetime().openapi({ example: '2024-01-01T00:00:00Z' }),
})

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format').openapi({ example: 'user@example.com' }),
  name: z.string().min(1, 'Name is required').openapi({ example: 'John Doe' }),
})

export const UpdateUserSchema = CreateUserSchema.partial()

export const UserIdParamSchema = z.object({
  id: z.string().transform((val) => parseInt(val)).pipe(z.number().int().positive()),
})

// Error responses
export const ErrorSchema = z.object({
  error: z.string(),
})

export const NotFoundErrorSchema = z.object({
  error: z.literal('User not found'),
})

// Routes
export const listUsersRoute = createRoute({
  method: 'get',
  path: '/api/users',
  tags: ['users'],
  summary: 'Get all users',
  description: 'Retrieve a list of all users in the system',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(UserSchema),
        },
      },
      description: 'List of users',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal server error',
    },
  },
})

export const getUserRoute = createRoute({
  method: 'get',
  path: '/api/users/{id}',
  tags: ['users'],
  summary: 'Get user by ID',
  description: 'Retrieve a specific user by their ID',
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'User details',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundErrorSchema,
        },
      },
      description: 'User not found',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal server error',
    },
  },
})

export const createUserRoute = createRoute({
  method: 'post',
  path: '/api/users',
  tags: ['users'],
  summary: 'Create a new user',
  description: 'Create a new user in the system',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'User created successfully',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Invalid request body',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal server error',
    },
  },
})

export const updateUserRoute = createRoute({
  method: 'put',
  path: '/api/users/{id}',
  tags: ['users'],
  summary: 'Update a user',
  description: 'Update an existing user by their ID',
  request: {
    params: UserIdParamSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'User updated successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundErrorSchema,
        },
      },
      description: 'User not found',
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Invalid request body',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal server error',
    },
  },
})

export const deleteUserRoute = createRoute({
  method: 'delete',
  path: '/api/users/{id}',
  tags: ['users'],
  summary: 'Delete a user',
  description: 'Delete a user by their ID',
  request: {
    params: UserIdParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: 'User deleted successfully',
    },
    404: {
      content: {
        'application/json': {
          schema: NotFoundErrorSchema,
        },
      },
      description: 'User not found',
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Internal server error',
    },
  },
})