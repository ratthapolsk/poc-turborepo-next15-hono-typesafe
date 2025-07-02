// Approval Request Status Options
export const APPROVAL_STATUS_OPTIONS = [
  { value: 'pending', label: 'รอการอนุมัติ', color: 'yellow' },
  { value: 'approved', label: 'อนุมัติแล้ว', color: 'green' },
  { value: 'rejected', label: 'ปฏิเสธ', color: 'red' },
] as const

// Default pagination settings
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE_INDEX = 1

// Form validation messages
export const FORM_MESSAGES = {
  TITLE_REQUIRED: 'กรุณาระบุ หัวข้อคำขออนุมัติ',
  TITLE_MIN_LENGTH: 'หัวข้อคำขออนุมัติ ต้องไม่เป็นค่าว่าง',
  INVALID_STATUS: 'สถานะไม่ถูกต้อง',
} as const

// API endpoints
export const API_ENDPOINTS = {
  LIST: '/api/approval-requests',
  CREATE: '/api/approval-requests',
  GET: (id: number) => `/api/approval-requests/${id}`,
  UPDATE: (id: number) => `/api/approval-requests/${id}`,
  DELETE: (id: number) => `/api/approval-requests/${id}`,
} as const

// Default form values
export const approvalRequestFormDefaultValues = {
  title: '',
  description: '',
  requesterId: '',
  status: 'pending',
}

export const approvalRequestSearchFormDefaultValues = {
  title: null,
  status: null,
  requesterId: null,
}

export const defaultPagination = {
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
}