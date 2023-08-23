import { time } from '@distributedlab/tools'
import { Chip, Link as MuiLink, Skeleton, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AvatarName } from '@/components/Avatar'
import { TxsColumnIds } from '@/components/Transaction/TransactionList'
import TransactionStatus from '@/components/Transaction/TransactionStatus'
import { OVERFLOW_SX } from '@/const'
import { RoutePaths } from '@/enums'
import { TransactionListFragment } from '@/graphql'
import { generatePath } from '@/helpers'
import { createColumnMap, parseAddress } from '@/helpers'
import { useLocalize } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TableColumn } from '@/types'

export default function TransactionListRow({
  transaction,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<TxsColumnIds>[]
  transaction?: TransactionListFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<TxsColumnIds>(columns)

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
          ...OVERFLOW_SX,
          minWidth: columnMap[TxsColumnIds.Hash]?.minWidth,
          maxWidth: columnMap[TxsColumnIds.Hash]?.maxWidth,
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
          ...OVERFLOW_SX,
          minWidth: columnMap[TxsColumnIds.Sender]?.minWidth,
          maxWidth: columnMap[TxsColumnIds.Sender]?.maxWidth,
        }}
      >
        {withSkeleton(<AvatarName address={parseAddress(transaction)} />)}
      </TableCell>

      <TableCell
        sx={{ minWidth: columnMap[TxsColumnIds.Operation]?.minWidth }}
        align={columnMap[TxsColumnIds.Operation].align}
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

      <TableCell sx={{ minWidth: columnMap[TxsColumnIds.Block]?.minWidth }}>
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
          ...OVERFLOW_SX,
          minWidth: columnMap[TxsColumnIds.Date]?.minWidth,
          whiteSpace: 'nowrap',
        }}
      >
        {withSkeleton(time(transaction?.block?.timestamp, { utc: true }).fromNow)}
      </TableCell>
      <TableCell
        sx={{ minWidth: columnMap[TxsColumnIds.Status]?.minWidth }}
        align={columnMap[TxsColumnIds.Status].align}
      >
        {withSkeleton(<TransactionStatus status={transaction?.success} />, 32, 'auto')}
      </TableCell>
    </TableRow>
  )
}
