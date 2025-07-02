import { z } from 'zod'

export const approvalRequestCreateSchema = z.object({
  title: z
    .string({ message: 'กรุณาระบุ หัวข้อคำขออนุมัติ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หัวข้อคำขออนุมัติ ต้องไม่เป็นค่าว่าง',
    }),
  description: z
    .string({ message: 'กรุณาระบุ รายละเอียด' })
    .nullable()
    .optional(),
  requesterId: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสผู้ขออนุมัติ' }),
      z.string({ message: 'กรุณาระบุ รหัสผู้ขออนุมัติ' }),
    ])
    .nullable()
    .optional(),
  status: z
    .string({ message: 'กรุณาระบุ สถานะคำขออนุมัติ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สถานะคำขออนุมัติ ต้องไม่เป็นค่าว่าง',
    }),
})

export const approvalRequestUpdateSchema = z.object({
  id: z.string({ message: 'กรุณาระบุ รหัสในระบบ' }).nullish(),
  title: z
    .string({ message: 'กรุณาระบุ หัวข้อคำขออนุมัติ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'หัวข้อคำขออนุมัติ ต้องไม่เป็นค่าว่าง',
    }),
  description: z
    .string({ message: 'กรุณาระบุ รายละเอียด' })
    .nullable()
    .optional(),
  requesterId: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสผู้ขออนุมัติ' }),
      z.string({ message: 'กรุณาระบุ รหัสผู้ขออนุมัติ' }),
    ])
    .nullable()
    .optional(),
  status: z
    .string({ message: 'กรุณาระบุ สถานะคำขออนุมัติ' })
    .transform((v) => v.trim())
    .refine((v) => v !== null && v !== '', {
      message: 'สถานะคำขออนุมัติ ต้องไม่เป็นค่าว่าง',
    }),
})

export const approvalRequestSearchSchema = z.object({
  title: z
    .string({ message: 'กรุณาระบุ หัวข้อคำขออนุมัติ' })
    .nullish(),
  status: z
    .string({ message: 'กรุณาระบุ สถานะคำขออนุมัติ' })
    .nullish(),
  requesterId: z
    .union([
      z.number({ message: 'กรุณาระบุ รหัสผู้ขออนุมัติ' }),
      z.string({ message: 'กรุณาระบุ รหัสผู้ขออนุมัติ' }),
    ])
    .nullish(),
})

export type ApprovalRequest = {
  id: number
  title: string
  description?: string | null
  status: 'pending' | 'approved' | 'rejected'
  requesterId?: number | null
  createdAt: string
  updatedAt: string
}

export type ApprovalRequestCreate = z.infer<typeof approvalRequestCreateSchema>
export type ApprovalRequestUpdate = z.infer<typeof approvalRequestUpdateSchema>
export type ApprovalRequestForm = ApprovalRequestCreate & ApprovalRequestUpdate
export type ApprovalRequestSearchForm = z.infer<typeof approvalRequestSearchSchema>