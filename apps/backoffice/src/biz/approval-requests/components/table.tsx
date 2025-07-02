'use client'

import { Box, Badge } from '@mantine/core'
import type { MRT_ColumnDef } from 'mantine-react-table'
import type { ApprovalRequest } from '../types'
import { APPROVAL_STATUS_OPTIONS } from '../constants'

export const approvalRequestTableColumns: MRT_ColumnDef<ApprovalRequest>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableResizing: true,
    size: 80,
    Cell: ({ row }) => {
      const value = row.original.id ?? ''
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {value}
        </Box>
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'หัวข้อคำขออนุมัติ',
    enableResizing: true,
    Cell: ({ row }) => {
      const value = row.original.title ?? ''
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {value}
        </Box>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'รายละเอียด',
    enableResizing: true,
    Cell: ({ row }) => {
      const value = row.original.description ?? ''
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {value || '-'}
        </Box>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'สถานะ',
    enableResizing: true,
    size: 120,
    Cell: ({ row }) => {
      const value = row.original.status ?? ''
      const statusOption = APPROVAL_STATUS_OPTIONS.find(option => option.value === value)
      
      return (
        <Badge 
          color={statusOption?.color || 'gray'}
          variant="light"
        >
          {statusOption?.label || value}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'requesterId',
    header: 'รหัสผู้ขออนุมัติ',
    enableResizing: true,
    size: 150,
    Cell: ({ row }) => {
      const value = row.original.requesterId ?? ''
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {value || '-'}
        </Box>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'วันที่สร้าง',
    enableResizing: true,
    size: 120,
    Cell: ({ row }) => {
      const value = row.original.createdAt
      const formattedDate = value 
        ? new Date(value).toLocaleDateString('th-TH')
        : '-'
      
      return (
        <Box
          component="div"
          className="whitespace-normal text-pretty break-all"
        >
          {formattedDate}
        </Box>
      )
    },
  },
]