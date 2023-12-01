'use client'

import { Link as MuiLink, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components/Avatar'
import { OVERFLOW_SX } from '@/const'
import { TssListFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

import { TSSColumnIds } from './TSSList'
import TSSStatus from './TSSStatus'

export default function TSSListRow({
  tss,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<TSSColumnIds>[]
  tss?: TssListFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<TSSColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={{
          ...columnMap[TSSColumnIds.Account]?.sx,
          ...OVERFLOW_SX,
        }}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.TSS, { address: tss?.account ?? '' })}
          >
            {tss?.account}
          </MuiLink>,
          columnMap[TSSColumnIds.Account]?.sx,
        )}
      </TableCell>

      <TableCell
        sx={{
          ...columnMap[TSSColumnIds.Delegator]?.sx,
          ...OVERFLOW_SX,
        }}
      >
        {withSkeleton(
          <AvatarName address={tss?.delegator || tss?.account || ''} abbrAddress={false} />,
          {
            width: '100%',
          },
        )}
      </TableCell>

      <TableCell sx={columnMap[TSSColumnIds.Violations]?.sx}>
        {withSkeleton(tss?.violations_count, { width: 80 })}
      </TableCell>

      <TableCell
        sx={{ ...columnMap[TSSColumnIds.Status]?.sx }}
        align={columnMap[TSSColumnIds.Status]?.align}
      >
        {withSkeleton(<TSSStatus status={tss?.status ?? ''} />, {
          height: 32,
          width: '100%',
        })}
      </TableCell>
    </TableRow>
  )
}
