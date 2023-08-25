import { RoutePaths } from '@/types'

export const generatePath = (
  route: RoutePaths,
  params: Record<string, string | number>,
): string => {
  if (!params) throw ReferenceError('Params is required')

  let path = String(route)

  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`[${key}]`, String(value))
  }

  return path
}
