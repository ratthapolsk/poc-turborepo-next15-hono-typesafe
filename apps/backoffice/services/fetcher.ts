import { apiClient } from './client'

export const fetcher = {
  get: <T>(url: string) => apiClient.get<T>(url),
  post: <T>(url: string, data?: any) => apiClient.post<T>(url, data),
  put: <T>(url: string, data?: any) => apiClient.put<T>(url, data),
  delete: <T>(url: string) => apiClient.delete<T>(url),
}

export default fetcher