import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const useSearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [addQueue, setAddQueue] = useState<URLSearchParams[]>([])
  const [removeQueue, setRemoveQueue] = useState<URLSearchParams[]>([])
  const [params, setParams] = useState<URLSearchParams>()
  const [prevPath, setPrevPath] = useState(pathname)

  const setQueryParams = useCallback((add: URLSearchParams, remove?: URLSearchParams) => {
    setAddQueue(prev => [...prev, add])
    if (remove) setRemoveQueue(prev => [...prev, remove])
  }, [])

  useEffect(() => {
    const isAddExist = addQueue.length
    const isRemoveExist = removeQueue.length
    const _params = params || new URLSearchParams(window?.location?.search)

    for (const [key, value] of addQueue?.[0]?.entries() ?? []) {
      _params.set(key, value)
    }

    for (const [key] of removeQueue?.[0]?.entries() ?? []) {
      _params.delete(key)
    }

    if (isAddExist) setAddQueue(prev => prev.slice(1))
    if (isRemoveExist) setRemoveQueue(prev => prev.slice(1))
    if (isAddExist || isRemoveExist) setParams(_params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addQueue.length, removeQueue.length])

  useEffect(() => {
    if (!params) return
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addQueue, removeQueue, params])

  useEffect(() => {
    if (prevPath === pathname) return
    setPrevPath(pathname)
    setParams(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return { setQueryParams }
}
