'use client'

import { time } from '@distributedlab/tools'
import { Chip, Link as MuiLink, TableCell, TableRow } from '@mui/material'
import { OpType } from '@rarimo/client'
import Link from 'next/link'
import { useMemo } from 'react'

import { AvatarName } from '@/components/Avatar'
import { OVERFLOW_SX } from '@/const'
import { OperationFragment } from '@/graphql'
import { abbr, createColumnMap, generatePath } from '@/helpers'
import { useLocalize, useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

import { OperationColumnIds } from './OperationList'
import OperationStatus from './OperationStatus'

export default function OperationListRow({
  row,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<OperationColumnIds>[]
  row?: OperationFragment
  isLoading: boolean
}) {
  const { localizeOperationType } = useLocalize()
  const columnMap = createColumnMap<OperationColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  const operationType = useMemo(() => {
    return localizeOperationType(row?.operation_type as OpType)
  }, [localizeOperationType, row?.operation_type])

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={{
          ...columnMap[OperationColumnIds.Index]?.sx,
          ...OVERFLOW_SX,
        }}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Operation, { index: row?.index ?? '' })}
          >
            {abbr(row?.index, 14, 20)}
          </MuiLink>,
          columnMap[OperationColumnIds.Index]?.sx,
        )}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          ...columnMap[OperationColumnIds.Type]?.sx,
        }}
      >
        {withSkeleton(<Chip label={operationType} />, { height: 32, width: '100%' })}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          ...columnMap[OperationColumnIds.Creator]?.sx,
        }}
      >
        {withSkeleton(<AvatarName address={row?.creator ?? ''} abbrAddress={false} />, {
          width: '100%',
        })}
      </TableCell>

      <TableCell sx={{ ...columnMap[OperationColumnIds.Date]?.sx }}>
        {withSkeleton(time(row?.timestamp, { utc: true }).fromNow, { width: '140px' })}
      </TableCell>

      <TableCell
        sx={{
          ...columnMap[OperationColumnIds.Status]?.sx,
        }}
        align={columnMap[OperationColumnIds.Status]?.align}
      >
        {withSkeleton(<OperationStatus status={row?.status ?? ''} />, {
          height: 32,
          width: '100%',
        })}
      </TableCell>
    </TableRow>
  )
}
