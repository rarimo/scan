'use client'

import { time } from '@distributedlab/tools'
import { Link as MuiLink, Skeleton, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AvatarName } from '@/components/Avatar'
import { RoutePaths } from '@/enums'
import { createColumnMap, generatePath } from '@/helpers'
import { BlockListFragment, TableColumn } from '@/types'

import { ColumnIds } from './BlocksList'

export const BlocksListRow = ({
  block,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ColumnIds>[]
  block?: BlockListFragment
  isLoading: boolean
}) => {
  const columnMap = createColumnMap<ColumnIds>(columns)

  const overflow = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  const withSkeleton = (children: ReactNode, height?: number) =>
    isLoading ? <Skeleton width={'100%'} {...(height && { height })} /> : children

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={{
          ...columnMap[ColumnIds.BLOCK]?.sx,
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
        )}
      </TableCell>

      <TableCell sx={{ ...columnMap[ColumnIds.DATE]?.sx }}>
        {withSkeleton(time(block?.timestamp, { utc: true }).fromNow)}
      </TableCell>
      <TableCell
        sx={{
          ...columnMap[ColumnIds.VALIDATOR]?.sx,
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
        )}
      </TableCell>
      <TableCell sx={columnMap[ColumnIds.GAS]?.sx} align={columnMap[ColumnIds.GAS]?.align}>
        {withSkeleton(block?.total_gas)}
      </TableCell>

      <TableCell sx={columnMap[ColumnIds.TXN]?.sx} align={columnMap[ColumnIds.TXN]?.align}>
        {withSkeleton(block?.transactions_aggregate?.aggregate?.count)}
      </TableCell>
    </TableRow>
  )
}
