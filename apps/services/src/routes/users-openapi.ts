import { OpenAPIHono } from '@hono/zod-openapi'
import { db } from '@/db/connection'
import { users } from '@approval/database'
import { eq } from 'drizzle-orm'
import {
  listUsersRoute,
  getUserRoute,
  createUserRoute,
  updateUserRoute,
  deleteUserRoute,
} from '@/schemas/user'

const app = new OpenAPIHono()

// Get all users
app.openapi(listUsersRoute, async (c) => {
  try {
    const allUsers = await db.select().from(users)
    
    // Transform dates to ISO strings for OpenAPI
    const usersWithStringDates = allUsers.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }))
    
    return c.json(usersWithStringDates)
  } catch (error) {
    return c.json({ error: 'Failed to fetch users' }, 500)
  }
})

// Get user by ID
app.openapi(getUserRoute, async (c) => {
  try {
    const { id } = c.req.valid('param')
    const user = await db.select().from(users).where(eq(users.id, id))
    
    if (user.length === 0) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    // Transform dates to ISO strings for OpenAPI
    const userWithStringDates = {
      ...user[0],
      createdAt: user[0].createdAt.toISOString(),
      updatedAt: user[0].updatedAt.toISOString(),
    }
    
    return c.json(userWithStringDates)
  } catch (error) {
    return c.json({ error: 'Failed to fetch user' }, 500)
  }
})

// Create new user
app.openapi(createUserRoute, async (c) => {
  try {
    const data = c.req.valid('json')
    const newUser = await db.insert(users).values({
      ...data,
      updatedAt: new Date(),
    }).returning()
    
    // Transform dates to ISO strings for OpenAPI
    const userWithStringDates = {
      ...newUser[0],
      createdAt: newUser[0].createdAt.toISOString(),
      updatedAt: newUser[0].updatedAt.toISOString(),
    }
    
    return c.json(userWithStringDates, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create user' }, 500)
  }
})

// Update user
app.openapi(updateUserRoute, async (c) => {
  try {
    const { id } = c.req.valid('param')
    const data = c.req.valid('json')
    
    const updatedUser = await db.update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    
    if (updatedUser.length === 0) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    // Transform dates to ISO strings for OpenAPI
    const userWithStringDates = {
      ...updatedUser[0],
      createdAt: updatedUser[0].createdAt.toISOString(),
      updatedAt: updatedUser[0].updatedAt.toISOString(),
    }
    
    return c.json(userWithStringDates)
  } catch (error) {
    return c.json({ error: 'Failed to update user' }, 500)
  }
})

// Delete user
app.openapi(deleteUserRoute, async (c) => {
  try {
    const { id } = c.req.valid('param')
    const deletedUser = await db.delete(users).where(eq(users.id, id)).returning()
    
    if (deletedUser.length === 0) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json({ message: 'User deleted successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to delete user' }, 500)
  }
})

export default app