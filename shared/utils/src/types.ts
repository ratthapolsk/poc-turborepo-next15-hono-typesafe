import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
})

export const UpdateUserSchema = CreateUserSchema.partial()

export const ApprovalRequestSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(['pending', 'approved', 'rejected']),
  requester_id: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const CreateApprovalRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  requester_id: z.number().optional(),
})

export const UpdateApprovalRequestSchema = CreateApprovalRequestSchema.partial().extend({
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
})

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type ApprovalRequest = z.infer<typeof ApprovalRequestSchema>
export type CreateApprovalRequest = z.infer<typeof CreateApprovalRequestSchema>
export type UpdateApprovalRequest = z.infer<typeof UpdateApprovalRequestSchema>