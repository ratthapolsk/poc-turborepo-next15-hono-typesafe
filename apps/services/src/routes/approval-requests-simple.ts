import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { db } from '@/db/connection'
import { approvalRequests } from '@approval/database'
import { eq, count, and } from 'drizzle-orm'
import { PaginationUtils, PaginationQuerySchema } from '@/utils/pagination'
import { z } from 'zod'

const app = new Hono()

// Validation schemas
const CreateApprovalRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  requesterId: z.number().optional(),
})

const UpdateApprovalRequestSchema = CreateApprovalRequestSchema.partial().extend({
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
})

const ApprovalRequestFiltersSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  requesterId: z.coerce.number().int().positive().optional(),
})

const ApprovalRequestQuerySchema = PaginationQuerySchema.merge(ApprovalRequestFiltersSchema)

// Get all approval requests with pagination and filters
app.get('/', zValidator('query', ApprovalRequestQuerySchema), async (c) => {
  try {
    const query = c.req.valid('query')
    const { pageIndex, pageSize, status, requesterId } = query
    
    // Build where conditions
    const whereConditions = []
    if (status) {
      whereConditions.push(eq(approvalRequests.status, status))
    }
    if (requesterId) {
      whereConditions.push(eq(approvalRequests.requesterId, requesterId))
    }
    
    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined
    
    // Get total count with filters
    const [totalResult] = await db.select({ count: count() })
      .from(approvalRequests)
      .where(whereClause)
    const totalRecords = totalResult.count
    
    // Get paginated data with filters
    const offset = PaginationUtils.getOffset(pageIndex, pageSize)
    const paginatedRequests = await db.select()
      .from(approvalRequests)
      .where(whereClause)
      .limit(pageSize)
      .offset(offset)
    
    // Transform dates to ISO strings
    const requestsWithStringDates = paginatedRequests.map(request => ({
      ...request,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
    }))
    
    // Create paginated response
    const response = PaginationUtils.createResponse(
      requestsWithStringDates,
      pageIndex,
      pageSize,
      totalRecords
    )
    
    return c.json(response)
  } catch (error) {
    console.error('Failed to fetch approval requests:', error)
    return c.json({ error: 'Failed to fetch approval requests' }, 500)
  }
})

// Get approval request by ID
app.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const request = await db.select().from(approvalRequests).where(eq(approvalRequests.id, id))
    
    if (request.length === 0) {
      return c.json({ error: 'Approval request not found' }, 404)
    }
    
    // Transform dates to ISO strings
    const requestWithStringDates = {
      ...request[0],
      createdAt: request[0].createdAt.toISOString(),
      updatedAt: request[0].updatedAt.toISOString(),
    }
    
    return c.json(requestWithStringDates)
  } catch (error) {
    console.error('Failed to fetch approval request:', error)
    return c.json({ error: 'Failed to fetch approval request' }, 500)
  }
})

// Create new approval request
app.post('/', zValidator('json', CreateApprovalRequestSchema), async (c) => {
  try {
    const data = c.req.valid('json')
    const newRequest = await db.insert(approvalRequests).values({
      ...data,
      status: 'pending', // Default status
      updatedAt: new Date(),
    }).returning()
    
    // Transform dates to ISO strings
    const requestWithStringDates = {
      ...newRequest[0],
      createdAt: newRequest[0].createdAt.toISOString(),
      updatedAt: newRequest[0].updatedAt.toISOString(),
    }
    
    return c.json(requestWithStringDates, 201)
  } catch (error) {
    console.error('Failed to create approval request:', error)
    return c.json({ error: 'Failed to create approval request' }, 500)
  }
})

// Update approval request
app.put('/:id', zValidator('json', UpdateApprovalRequestSchema), async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const data = c.req.valid('json')
    
    const updatedRequest = await db.update(approvalRequests)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(approvalRequests.id, id))
      .returning()
    
    if (updatedRequest.length === 0) {
      return c.json({ error: 'Approval request not found' }, 404)
    }
    
    // Transform dates to ISO strings
    const requestWithStringDates = {
      ...updatedRequest[0],
      createdAt: updatedRequest[0].createdAt.toISOString(),
      updatedAt: updatedRequest[0].updatedAt.toISOString(),
    }
    
    return c.json(requestWithStringDates)
  } catch (error) {
    console.error('Failed to update approval request:', error)
    return c.json({ error: 'Failed to update approval request' }, 500)
  }
})

// Delete approval request
app.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const deletedRequest = await db.delete(approvalRequests).where(eq(approvalRequests.id, id)).returning()
    
    if (deletedRequest.length === 0) {
      return c.json({ error: 'Approval request not found' }, 404)
    }
    
    return c.json({ message: 'Approval request deleted successfully' })
  } catch (error) {
    console.error('Failed to delete approval request:', error)
    return c.json({ error: 'Failed to delete approval request' }, 500)
  }
})

export default app