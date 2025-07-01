/**
 * Frontend pagination utilities for consistent pagination across the app
 */

export interface PaginationMetadata {
  pageIndex: number
  pageSize: number
  totalRecords: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMetadata
}

export interface PaginationQuery {
  pageIndex?: number
  pageSize?: number
}

export class FrontendPaginationUtils {
  static readonly DEFAULT_PAGE_INDEX = 1
  static readonly DEFAULT_PAGE_SIZE = 10
  static readonly MAX_PAGE_SIZE = 100

  /**
   * Normalize pagination parameters with defaults
   */
  static normalizePagination(params?: PaginationQuery): Required<PaginationQuery> {
    return {
      pageIndex: params?.pageIndex || this.DEFAULT_PAGE_INDEX,
      pageSize: Math.min(params?.pageSize || this.DEFAULT_PAGE_SIZE, this.MAX_PAGE_SIZE),
    }
  }

  /**
   * Build query string for pagination
   */
  static buildQueryString(params?: PaginationQuery): string {
    const normalized = this.normalizePagination(params)
    const searchParams = new URLSearchParams()
    
    if (normalized.pageIndex !== this.DEFAULT_PAGE_INDEX) {
      searchParams.set('pageIndex', normalized.pageIndex.toString())
    }
    
    if (normalized.pageSize !== this.DEFAULT_PAGE_SIZE) {
      searchParams.set('pageSize', normalized.pageSize.toString())
    }
    
    const queryString = searchParams.toString()
    return queryString ? `?${queryString}` : ''
  }

  /**
   * Calculate page numbers for pagination UI
   */
  static getPageNumbers(
    currentPage: number,
    totalPages: number,
    maxVisible: number = 5
  ): number[] {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const half = Math.floor(maxVisible / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  /**
   * Get pagination info for display
   */
  static getPaginationInfo(pagination: PaginationMetadata): string {
    const { pageIndex, pageSize, totalRecords } = pagination
    const start = (pageIndex - 1) * pageSize + 1
    const end = Math.min(pageIndex * pageSize, totalRecords)
    
    if (totalRecords === 0) {
      return 'No records found'
    }
    
    return `Showing ${start}-${end} of ${totalRecords} records`
  }

  /**
   * Check if pagination is needed
   */
  static isPaginationNeeded(totalRecords: number, pageSize: number): boolean {
    return totalRecords > pageSize
  }
}