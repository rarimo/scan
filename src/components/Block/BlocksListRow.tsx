'use client'

import { time } from '@distributedlab/tools'
import { Link as MuiLink, Skeleton, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AvatarName } from '@/components/Avatar'
import { RoutePaths } from '@/enums'
import { BlockListFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { TableColumn } from '@/types'

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

  const withSkeleton = (children: ReactNode, height?: number, width = '100%', ml?: string) =>
    isLoading ? (
      <Skeleton width={width} {...(height && { height })} sx={{ ...(ml && { ml }) }} />
    ) : (
      children
    )

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
          0,
          '100px',
        )}
      </TableCell>

      <TableCell sx={{ ...columnMap[BlocksColumnIds.Date]?.sx }}>
        {withSkeleton(time(block?.timestamp, { utc: true }).fromNow, 0, '140px')}
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
          22,
          '439px',
        )}
      </TableCell>
      <TableCell
        sx={columnMap[BlocksColumnIds.Gas]?.sx}
        align={columnMap[BlocksColumnIds.Gas]?.align}
      >
        {withSkeleton(block?.total_gas, undefined, '90px', 'auto')}
      </TableCell>

      <TableCell
        sx={columnMap[BlocksColumnIds.TxN]?.sx}
        align={columnMap[BlocksColumnIds.TxN]?.align}
      >
        {withSkeleton(block?.transactions_aggregate?.aggregate?.count, undefined, '60px', 'auto')}
      </TableCell>
    </TableRow>
  )
}
