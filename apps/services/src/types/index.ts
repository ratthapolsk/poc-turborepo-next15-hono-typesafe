import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
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
  status: z.string(),
  requesterId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateApprovalRequestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  requesterId: z.number().optional(),
})

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type ApprovalRequest = z.infer<typeof ApprovalRequestSchema>
export type CreateApprovalRequest = z.infer<typeof CreateApprovalRequestSchema>