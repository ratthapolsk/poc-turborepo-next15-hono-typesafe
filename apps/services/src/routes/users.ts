import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { CreateUserSchema, UpdateUserSchema } from '@/types'
import { eq } from 'drizzle-orm'

const app = new Hono()

app.get('/', async (c) => {
  try {
    const allUsers = await db.select().from(users)
    return c.json(allUsers)
  } catch (error) {
    return c.json({ error: 'Failed to fetch users' }, 500)
  }
})

app.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const user = await db.select().from(users).where(eq(users.id, id))
    
    if (user.length === 0) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json(user[0])
  } catch (error) {
    return c.json({ error: 'Failed to fetch user' }, 500)
  }
})

app.post('/', zValidator('json', CreateUserSchema), async (c) => {
  try {
    const data = c.req.valid('json')
    const newUser = await db.insert(users).values({
      ...data,
      updatedAt: new Date(),
    }).returning()
    
    return c.json(newUser[0], 201)
  } catch (error) {
    return c.json({ error: 'Failed to create user' }, 500)
  }
})

app.put('/:id', zValidator('json', UpdateUserSchema), async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const data = c.req.valid('json')
    
    const updatedUser = await db.update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    
    if (updatedUser.length === 0) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json(updatedUser[0])
  } catch (error) {
    return c.json({ error: 'Failed to update user' }, 500)
  }
})

app.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
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