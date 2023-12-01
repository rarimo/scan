'use client'

import { Chip, Link as MuiLink, Stack, TableCell, TableRow } from '@mui/material'
import { CollectionDataIndex, CollectionMetadata } from '@rarimo/client'
import Link from 'next/link'
import { useMemo } from 'react'

import { OVERFLOW_SX } from '@/const'
import { CollectionBaseFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

import { CollectionColumnIds } from './SupportedTokenList'

export default function SupportedTokenListRow({
  row,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<CollectionColumnIds>[]
  row?: CollectionBaseFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<CollectionColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  const metadata = useMemo(() => {
    return row?.meta as CollectionMetadata | undefined
  }, [row])

  const chains = useMemo(() => {
    const datas = (row?.data as CollectionDataIndex[]) || ([] as CollectionDataIndex[])
    return datas?.map(i => i.chain)
  }, [row])

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={{
          ...columnMap[CollectionColumnIds.Index]?.sx,
          ...OVERFLOW_SX,
        }}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.SupportedToken, { index: row?.index ?? '' })}
          >
            {row?.index}
          </MuiLink>,
          columnMap[CollectionColumnIds.Index]?.sx,
        )}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          ...columnMap[CollectionColumnIds.Name]?.sx,
        }}
      >
        {withSkeleton(metadata?.name, { width: '100%' })}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          ...columnMap[CollectionColumnIds.Symbol]?.sx,
        }}
      >
        {withSkeleton(metadata?.symbol, { width: '100%' })}
      </TableCell>

      <TableCell
        sx={columnMap[CollectionColumnIds.Chains]?.sx}
        align={columnMap[CollectionColumnIds.Chains].align}
      >
        {withSkeleton(
          <Stack
            direction={'row'}
            spacing={1}
            sx={{
              justifyContent: 'flex-end',
            }}
          >
            {chains.map((item, idx) => (
              <Chip label={item} key={idx} />
            ))}
          </Stack>,
          {
            width: '100%',
            height: 32,
          },
        )}
      </TableCell>
    </TableRow>
  )
}
