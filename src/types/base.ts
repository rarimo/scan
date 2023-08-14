export type ColorString = string

export type ErrorHandlerPayload = { error: Error; message?: string }

export type StatusMessagePayload = string | ErrorHandlerPayload | { message?: string }
