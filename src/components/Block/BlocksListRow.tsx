'use client'

import { time } from '@distributedlab/tools'
import { Link as MuiLink, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components/Avatar'
import { BlockListFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

import { BlocksColumnIds } from './BlocksList'

export default function BlocksListRow({
  block,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<BlocksColumnIds>[]
  block?: BlockListFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<BlocksColumnIds>(columns)

  const overflow = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={{
          ...columnMap[BlocksColumnIds.Block]?.sx,
          ...overflow,
        }}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Block, { height: block?.height })}
          >
            {block?.height}
          </MuiLink>,
          {
            width: 100,
          },
        )}
      </TableCell>

      <TableCell sx={{ ...columnMap[BlocksColumnIds.Date]?.sx }}>
        {withSkeleton(time(block?.timestamp, { utc: true }).fromNow, { width: '140px' })}
      </TableCell>
      <TableCell
        sx={{
          ...columnMap[BlocksColumnIds.Validator]?.sx,
          ...overflow,
        }}
      >
        {withSkeleton(
          <AvatarName
            address={block?.validator?.validator_info?.operator_address ?? ''}
            name={block?.validator?.validator_descriptions?.[0]?.moniker ?? ''}
            imageUrl={block?.validator?.validator_descriptions?.[0]?.avatar_url ?? ''}
            abbrAddress={false}
          />,
          {
            height: 22,
            width: 439,
          },
        )}
      </TableCell>
      <TableCell
        sx={columnMap[BlocksColumnIds.Gas]?.sx}
        align={columnMap[BlocksColumnIds.Gas]?.align}
      >
        {withSkeleton(block?.total_gas, { width: 90, ml: 'auto' })}
      </TableCell>

      <TableCell
        sx={columnMap[BlocksColumnIds.TxN]?.sx}
        align={columnMap[BlocksColumnIds.TxN]?.align}
      >
        {withSkeleton(block?.transactions_aggregate?.aggregate?.count, { width: 60, ml: 'auto' })}
      </TableCell>
    </TableRow>
  )
}
