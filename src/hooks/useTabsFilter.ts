import { useSearchParams } from 'next/navigation'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'

import { useAppState } from '@/hooks/useAppState'

export const useTabsFilter = ({
  queryKey,
  handler,
  defaultValue,
}: {
  queryKey: string
  handler: () => Promise<void>
  defaultValue: number
}) => {
  const searchParams = useSearchParams()
  const { setQueryParams } = useAppState()

  const [filter, setFilter] = useState<number>(Number(searchParams.get(queryKey) ?? defaultValue))
  const [prevFilter, setPrevFilter] = useState<number>(filter)

  const setQueryFilter = (filter: number) => {
    const query = new URLSearchParams()
    query.set(queryKey, `${filter}`)
    setQueryParams(query)
  }

  const handleFilterChange = (_: SyntheticEvent, value: number) => {
    setQueryFilter(value)
    setFilter(value)
  }

  const applyFilter = useCallback(async () => {
    await handler()
    setPrevFilter(filter)
  }, [filter, handler])

  useEffect(() => {
    if (prevFilter === filter) return
    applyFilter()
  }, [applyFilter, filter, prevFilter])

  useEffect(() => {
    if (searchParams.get(queryKey)) return
    setQueryFilter(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { filter, handleFilterChange }
}
