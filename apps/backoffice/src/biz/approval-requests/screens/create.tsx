'use client'

import {
  Button,
  Fieldset,
  FocusTrap,
  Grid,
  LoadingOverlay,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { zodResolver } from 'mantine-form-zod-resolver'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { ApprovalRequestForm } from '../components/form'
import { approvalRequestFormDefaultValues } from '../constants'
import { ApprovalRequestFormProvider, useApprovalRequestForm } from '../context'
import {
  type ApprovalRequestForm as ApprovalRequestFormType,
  approvalRequestCreateSchema,
} from '../types'

interface ApprovalRequestCreateScreenProps {
  modalId?: string
}

export const ApprovalRequestCreateScreen: React.FC<
  ApprovalRequestCreateScreenProps
> = ({ modalId }) => {
  const router = useRouter()
  const formHandler = useApprovalRequestForm({
    initialValues: approvalRequestFormDefaultValues,
    validateInputOnChange: true,
    validate: zodResolver(approvalRequestCreateSchema),
  })

  // Mock API call - replace with actual API
  const createApprovalRequest = async (data: ApprovalRequestFormType) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Creating approval request:', data)
    
    notifications.show({
      color: 'green',
      message: 'บันทึกข้อมูลสำเร็จ',
    })

    if (!modalId) {
      router.push('/approval-requests')
      return
    }

    modals.close(modalId)
  }

  const onHandleSubmit = async (values: ApprovalRequestFormType) => {
    try {
      const parsedValue = approvalRequestCreateSchema.parse(values)

      await createApprovalRequest({
        title: parsedValue?.title || '',
        description: parsedValue?.description || null,
        requesterId: parsedValue?.requesterId ? Number(parsedValue.requesterId) : null,
        status: parsedValue?.status || 'pending',
      })
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
      })
    }
  }

  const isEventLoading = false // Replace with actual loading state

  return (
    <Fieldset
      variant="unstyled"
      disabled={isEventLoading}
    >
      <ApprovalRequestFormProvider form={formHandler}>
        <form onSubmit={formHandler.onSubmit(onHandleSubmit)}>
          <FocusTrap active={true}>
            <ApprovalRequestForm />
            <Grid justify="flex-end">
              {modalId && (
                <Grid.Col span={{ base: 12, md: 3 }}>
                  <Button
                    type="button"
                    color="gray.7"
                    size="xs"
                    mt="sm"
                    ml="auto"
                    variant="transparent"
                    fullWidth
                    loading={isEventLoading}
                    onClick={() => {
                      modals.close(modalId)
                    }}
                  >
                    ยกเลิก
                  </Button>
                </Grid.Col>
              )}
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Button
                  type="submit"
                  color="primary"
                  size="xs"
                  mt="sm"
                  ml="auto"
                  variant="outline"
                  fullWidth
                  loading={isEventLoading}
                >
                  บันทึก
                </Button>
              </Grid.Col>
            </Grid>
          </FocusTrap>
        </form>
      </ApprovalRequestFormProvider>
    </Fieldset>
  )
}