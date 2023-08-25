import { HTTP_STATUS_CODES } from '@distributedlab/fetcher'

class NotFoundError extends Error {
  public name = 'NotFoundError'
  public status = HTTP_STATUS_CODES.NOT_FOUND
  constructor() {
    super()
  }
}

export const throwNotFound = (): never => {
  throw new NotFoundError()
}

export const ensureNotFoundNumber = (v: unknown) => {
  if (typeof v === 'number' || !Number.isNaN(Number(v))) return
  return throwNotFound()
}
