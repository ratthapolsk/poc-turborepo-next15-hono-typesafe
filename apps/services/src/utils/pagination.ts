import { z } from 'zod'

// Pagination input schema
export const PaginationQuerySchema = z.object({
  pageIndex: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
})

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>

// Pagination metadata
export const PaginationMetadataSchema = z.object({
  pageIndex: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  totalRecords: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
})

export type PaginationMetadata = z.infer<typeof PaginationMetadataSchema>

// Generic paginated response
export function createPaginatedResponseSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema),
    pagination: PaginationMetadataSchema,
  })
}

// Pagination utility functions
export class PaginationUtils {
  /**
   * Calculate pagination metadata
   */
  static calculateMetadata(
    pageIndex: number,
    pageSize: number,
    totalRecords: number
  ): PaginationMetadata {
    const totalPages = Math.ceil(totalRecords / pageSize)
    
    return {
      pageIndex,
      pageSize,
      totalRecords,
      totalPages,
      hasNextPage: pageIndex < totalPages,
      hasPreviousPage: pageIndex > 1,
    }
  }

  /**
   * Calculate SQL OFFSET for database queries
   */
  static getOffset(pageIndex: number, pageSize: number): number {
    return (pageIndex - 1) * pageSize
  }

  /**
   * Validate and normalize pagination parameters
   */
  static validatePagination(query: unknown): PaginationQuery {
    return PaginationQuerySchema.parse(query)
  }

  /**
   * Create paginated response
   */
  static createResponse<T>(
    data: T[],
    pageIndex: number,
    pageSize: number,
    totalRecords: number
  ) {
    const pagination = this.calculateMetadata(pageIndex, pageSize, totalRecords)
    
    return {
      data,
      pagination,
    }
  }
}

// OpenAPI pagination query parameters
export const PaginationQueryParams = z.object({
  pageIndex: z.string()
    .optional()
    .transform((val) => val ? parseInt(val) : 1)
    .pipe(z.number().int().min(1))
    .openapi({ 
      param: { in: 'query' },
      example: '1',
      description: 'Page number (1-based indexing)',
    }),
  pageSize: z.string()
    .optional()
    .transform((val) => val ? parseInt(val) : 10)
    .pipe(z.number().int().min(1).max(100))
    .openapi({ 
      param: { in: 'query' },
      example: '10',
      description: 'Number of items per page (max 100)',
    }),
})

export type PaginationQueryParams = z.infer<typeof PaginationQueryParams>