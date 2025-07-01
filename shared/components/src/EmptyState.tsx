import { Stack, Text, Button } from '@mantine/core'
import { IconInbox } from '@tabler/icons-react'

interface EmptyStateProps {
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
}

export function EmptyState({
  title = 'No data found',
  description = 'There are no items to display',
  action,
  icon = <IconInbox size={48} stroke={1.2} />
}: EmptyStateProps) {
  return (
    <Stack align="center" gap="md" py="xl">
      <div style={{ color: 'var(--mantine-color-dimmed)' }}>
        {icon}
      </div>
      
      <Stack align="center" gap="xs">
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          {description}
        </Text>
      </Stack>
      
      {action && (
        <Button onClick={action.onClick} variant="light">
          {action.label}
        </Button>
      )}
    </Stack>
  )
}