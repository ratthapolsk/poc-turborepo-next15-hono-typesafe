import { Loader, Center } from '@mantine/core'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  centered?: boolean
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'blue', 
  centered = false 
}: LoadingSpinnerProps) {
  const spinner = <Loader size={size} color={color} />
  
  if (centered) {
    return <Center>{spinner}</Center>
  }
  
  return spinner
}