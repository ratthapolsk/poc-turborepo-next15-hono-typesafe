'use client'

import { useApprovalRequestFormContext } from '../context'
import {
  type ComboboxData,
  Container,
  Grid,
  TextInput,
  Textarea,
  Select,
  rem,
} from '@mantine/core'
import { APPROVAL_STATUS_OPTIONS } from '../constants'

interface ApprovalRequestFormProps {
  isUpdate?: boolean
  dropdowns?: {
    users?: ComboboxData
  }
}

export const ApprovalRequestForm: React.FC<ApprovalRequestFormProps> = ({
  isUpdate,
  dropdowns,
}) => {
  const { getInputProps, key, getValues } = useApprovalRequestFormContext()

  return (
    <Container p={rem(16)}>
      <Grid gutter="md">
        {isUpdate && (
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              label="รหัสในระบบ"
              value={getValues().id ?? ''}
              disabled
            />
          </Grid.Col>
        )}
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label="หัวข้อคำขออนุมัติ"
            placeholder="หัวข้อคำขออนุมัติ"
            key={key('title')}
            {...getInputProps('title')}
            withAsterisk
          />
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Textarea
            label="รายละเอียด"
            placeholder="รายละเอียด (ไม่บังคับ)"
            rows={4}
            key={key('description')}
            {...getInputProps('description')}
          />
        </Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TextInput
            label="รหัสผู้ขออนุมัติ"
            placeholder="รหัสผู้ขออนุมัติ (ไม่บังคับ)"
            key={key('requesterId')}
            {...getInputProps('requesterId')}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Select
            label="สถานะคำขออนุมัติ"
            placeholder="สถานะคำขออนุมัติ"
            data={APPROVAL_STATUS_OPTIONS.map(option => ({
              value: option.value,
              label: option.label
            }))}
            key={key('status')}
            {...getInputProps('status')}
            withAsterisk
            clearable
            searchable
            nothingFoundMessage="ไม่พบข้อมูล"
          />
        </Grid.Col>
      </Grid>
    </Container>
  )
}