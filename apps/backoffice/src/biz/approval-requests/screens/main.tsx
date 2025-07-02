'use client'

import { Container, Title, Stack, Group, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

export function ApprovalRequestsMainScreen() {
  const handleCreateNew = () => {
    // Navigate to create screen
    console.log('Navigate to create approval request')
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={2}>Approval Requests</Title>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={handleCreateNew}
          >
            Create New Request
          </Button>
        </Group>
        
        {/* TODO: Add ApprovalRequestTable component here */}
        {/* TODO: Add ApprovalRequestFilters component here */}
      </Stack>
    </Container>
  )
}