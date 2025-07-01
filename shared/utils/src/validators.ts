import { z } from 'zod'

export const EmailValidator = z.string().email('Please enter a valid email address')

export const PasswordValidator = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

export const PhoneValidator = z
  .string()
  .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
  .min(10, 'Phone number must be at least 10 digits')

export const RequiredStringValidator = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`)

export const OptionalStringValidator = z.string().optional()

export const NumericIdValidator = z
  .number()
  .int()
  .positive('ID must be a positive integer')

export const BooleanValidator = z.boolean()

export const DateValidator = z.date()

export const PaginationValidator = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
})

export type PaginationParams = z.infer<typeof PaginationValidator>