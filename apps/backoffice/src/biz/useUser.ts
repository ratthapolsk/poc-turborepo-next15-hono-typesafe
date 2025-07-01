'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetcher } from '@/src/services/fetcher'
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type User = z.infer<typeof UserSchema>

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(1, 'Name is required'),
})

export type CreateUserInput = z.infer<typeof CreateUserSchema>

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetcher.get<User[]>('/api/users'),
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => fetcher.get<User>(`/api/users/${id}`),
    enabled: !!id,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userData: CreateUserInput) => 
      fetcher.post<User>('/api/users', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateUserInput> }) =>
      fetcher.put<User>(`/api/users/${id}`, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['users', data.id] })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => fetcher.delete(`/api/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}