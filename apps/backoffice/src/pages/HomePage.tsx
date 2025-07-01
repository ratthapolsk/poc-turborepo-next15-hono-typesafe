import { Container, Title, Text, Button, Stack } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

export function HomePage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl" align="center">
        <div className="text-center">
          <Title order={1} mb="md">
            Approval System
          </Title>
          <Text size="lg" c="dimmed">
            Backoffice Dashboard with Vite + Vitest
          </Text>
        </div>
        
        <Button
          leftSection={<IconCheck size={16} />}
          variant="filled"
          size="lg"
        >
          Get Started
        </Button>
      </Stack>
    </Container>
  )
}