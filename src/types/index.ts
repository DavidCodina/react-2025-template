export type Code =
  | 'OK'
  | 'CREATED'
  | 'UPDATED'
  | 'DELETED'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR'
  | 'STOCK_ERROR_FOUND'
  | 'PRICE_ERROR_FOUND'
  | 'ORDER_EXISTS'
  | 'USER_ARCHIVED'

export type API_Response<T = unknown> = Promise<{
  data: T
  message: string
  success: boolean
  errors?: Record<string, string> | null
  // 99.99% of the time, `code` implies an error code (i.e., 'ORDER_EXISTS', 'STOCK_ERRORS_FOUND', etc.)
  // However, Stripe uses the naming convention of `code` and I've followed that convention for my own codes.
  code?: Code
  // I like adding this because it makes the type more flexible, while still being informative.
  // That said, if you need additional properties, it's MUCH safer to write a custom
  // API_Response type for that clientAPI function (i.e., see getCartProducts.ts).
  [key: string]: any
}>

export type Roles = 'user' | 'manager' | 'admin'
