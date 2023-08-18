import { useI18n } from '@/locales/client'

export type ColorString = string

export type ErrorHandlerPayload = { error: Error; message?: string }

export type StatusMessagePayload = string | ErrorHandlerPayload | { message?: string }

export type SortOrder = 'asc' | 'desc'

export type TFunction = ReturnType<typeof useI18n>
