import { time } from '@distributedlab/tools'
import { Chip, Link as MuiLink, Skeleton, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AvatarName } from '@/components/Avatar'
import { RoutePaths } from '@/enums'
import { generatePath } from '@/helpers'
import { createColumnMap, parseAddress } from '@/helpers'
import { useLocalize } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TableColumn, TransactionListFragment } from '@/types'

import { ColumnIds } from './TransactionList'
import { TransactionStatus } from './TransactionStatus'

export const TransactionListRow = ({
  transaction,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ColumnIds>[]
  transaction?: TransactionListFragment
  isLoading: boolean
}) => {
  const columnMap = createColumnMap<ColumnIds>(columns)

  const t = useI18n()
  const { localizeMsgType } = useLocalize()

  const withSkeleton = (children: ReactNode, height?: number, ml?: string) =>
    isLoading ? (
      <Skeleton width={'100%'} {...(height && { height })} {...(ml && { ml })} />
    ) : (
      children
    )

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={{
          minWidth: columnMap[ColumnIds.HASH]?.minWidth,
          maxWidth: columnMap[ColumnIds.HASH]?.maxWidth,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Transaction, {
              hash: `${transaction?.hash}`,
            })}
          >
            {transaction?.hash}
          </MuiLink>,
        )}
      </TableCell>

      <TableCell
        sx={{
          minWidth: columnMap[ColumnIds.SENDER]?.minWidth,
          maxWidth: columnMap[ColumnIds.SENDER]?.maxWidth,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {withSkeleton(
          <AvatarName address={parseAddress(transaction)} imageSize={20} fontSize={14} />,
        )}
      </TableCell>

      <TableCell
        sx={{ minWidth: columnMap[ColumnIds.OPERATION]?.minWidth }}
        align={columnMap[ColumnIds.OPERATION].align}
      >
        {withSkeleton(
          <Chip
            label={
              localizeMsgType(transaction?.messages?.[0]?.['@type']) ??
              t('message-types.unknown-lbl')
            }
          />,
          32,
        )}
      </TableCell>

      <TableCell sx={{ minWidth: columnMap[ColumnIds.BLOCK]?.minWidth }}>
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Block, {
              height: String(transaction?.block?.height),
            })}
          >
            {transaction?.block?.height}
          </MuiLink>,
        )}
      </TableCell>

      <TableCell
        sx={{
          minWidth: columnMap[ColumnIds.DATE]?.minWidth,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {withSkeleton(time(transaction?.block?.timestamp, { utc: true }).fromNow)}
      </TableCell>
      <TableCell
        sx={{ minWidth: columnMap[ColumnIds.STATUS]?.minWidth }}
        align={columnMap[ColumnIds.STATUS].align}
      >
        {withSkeleton(<TransactionStatus status={transaction?.success} />, 32, 'auto')}
      </TableCell>
    </TableRow>
  )
}
