'use client'

import { useSearchParams } from 'next/navigation'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { CONFIG } from '@/config'
import { useAppState } from '@/hooks/useAppState'
import { SortOrder } from '@/types'

const QUERY_KEYS = {
  LIMIT: 'limit',
  OFFSET: 'offset',
  ORDER: 'order',
  ORDER_BY: 'orderBy',
}

export const useTablePagination = <T = unknown>(tableKey?: string) => {
  const query = useSearchParams()!

  const { setQueryParams } = useAppState()

  const [table, setTable] = useState(tableKey)
  const [limit, setLimit] = useState<number>(CONFIG.PAGE_LIMIT)
  const [offset, setOffset] = useState<number>(0)
  const [order, setOrder] = useState<SortOrder>('' as SortOrder)
  const [orderBy, setOrderBy] = useState<T>('' as T)

  const handlers = useMemo(
    () => ({
      [QUERY_KEYS.LIMIT]: (v: string) => setLimit(Number(v)),
      [QUERY_KEYS.OFFSET]: (v: string) => setOffset(Number(v)),
      [QUERY_KEYS.ORDER]: (v: string) => setOrder(v as SortOrder),
      [QUERY_KEYS.ORDER_BY]: (v: string) => setOrderBy(v as T),
    }),
    [],
  )

  const values = useMemo(
    () => ({
      [QUERY_KEYS.LIMIT]: limit,
      [QUERY_KEYS.OFFSET]: offset,
      [QUERY_KEYS.ORDER]: order,
      [QUERY_KEYS.ORDER_BY]: orderBy,
    }),
    [limit, offset, order, orderBy],
  )

  const handleChangePage = (_: unknown, newPage: number) => {
    setOffset(newPage * limit)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(+event.target.value)
    setOffset(0)
  }

  const setSort = (sortOrderBy: T) => {
    const isAsc = orderBy === sortOrderBy && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(sortOrderBy)
  }

  const setTableKey = (key: string) => {
    const toRemove = new URLSearchParams()

    for (const [key, value] of Object.entries(values)) {
      toRemove.set(key, String(value))
    }

    setTable(key)
    setOffset(0)
    setOrder('' as SortOrder)
    setOrderBy('' as T)

    setQueryParams(new URLSearchParams(), toRemove)
  }

  const getKey = useCallback((key: string) => (table ? `${table}[${key}]` : key), [table])

  useEffect(() => {
    for (const [key, handler] of Object.entries(handlers)) {
      const value = query.get(getKey(key))
      if (value) handler(value)
    }
  }, [getKey, handlers, query])

  const getQuery = useCallback(() => {
    const _query = new URLSearchParams()

    for (const [key, value] of Object.entries(values)) {
      if (value || value === 0) _query.set(getKey(key), String(value))
    }

    return _query
  }, [getKey, values])

  const replaceUrl = useCallback(() => {
    setQueryParams(getQuery())
  }, [getQuery, setQueryParams])

  useEffect(() => {
    replaceUrl()
  }, [limit, offset, order, orderBy, replaceUrl, table])

  useEffect(() => {
    replaceUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    limit,
    offset,
    order,
    orderBy,
    handleChangePage,
    handleChangeRowsPerPage,
    setSort,
    setOffset,
    setTableKey,
  }
}
