import { createFormContext } from '@mantine/form'
import type { ApprovalRequestForm, ApprovalRequestSearchForm } from './types'

export const [
  ApprovalRequestFormProvider,
  useApprovalRequestFormContext,
  useApprovalRequestForm,
] = createFormContext<ApprovalRequestForm>()

export const [
  ApprovalRequestSearchFormProvider,
  useApprovalRequestSearchFormContext,
  useApprovalRequestSearchForm,
] = createFormContext<ApprovalRequestSearchForm>()