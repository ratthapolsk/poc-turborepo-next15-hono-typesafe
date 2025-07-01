import { OpenAPIHono } from '@hono/zod-openapi'
import { db } from '@/db/connection'
import { users } from '@approval/database'
import { eq, count } from 'drizzle-orm'
import { PaginationUtils } from '@/utils/pagination'
import {
  listUsersRoute,
  getUserRoute,
  createUserRoute,
  updateUserRoute,
  deleteUserRoute,
} from '@/schemas/user'

const app = new OpenAPIHono()

// Get all users with pagination
app.openapi(listUsersRoute, async (c) => {
  try {
    const query = c.req.valid('query')
    const { pageIndex, pageSize } = query
    
    // Get total count
    const [totalResult] = await db.select({ count: count() }).from(users)
    const totalRecords = totalResult.count
    
    // Get paginated data
    const offset = PaginationUtils.getOffset(pageIndex, pageSize)
    const paginatedUsers = await db.select()
      .from(users)
      .limit(pageSize)
      .offset(offset)
    
    // Transform dates to ISO strings for OpenAPI
    const usersWithStringDates = paginatedUsers.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }))
    
    // Create paginated response
    const response = PaginationUtils.createResponse(
      usersWithStringDates,
      pageIndex,
      pageSize,
      totalRecords
    )
    
    return c.json(response)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return c.json({ error: 'Failed to fetch users' }, 500)
  }
})

// Get user by ID
app.openapi(getUserRoute, async (c) => {
  try {
    const { id } = c.req.valid('param')
    const user = await db.select().from(users).where(eq(users.id, id))
    
    if (user.length === 0) {
      return c.json({ error: 'User not found' as const }, 404)
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
      return c.json({ error: 'User not found' as const }, 404)
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
      return c.json({ error: 'User not found' as const }, 404)
    }
    
    return c.json({ message: 'User deleted successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to delete user' }, 500)
  }
})

export default app