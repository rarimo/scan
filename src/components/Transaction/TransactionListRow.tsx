import { time } from '@distributedlab/tools'
import { Chip, Link as MuiLink, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components/Avatar'
import { TxsColumnIds } from '@/components/Transaction/TransactionList'
import TransactionStatus from '@/components/Transaction/TransactionStatus'
import { OVERFLOW_SX } from '@/const'
import { TransactionListFragment } from '@/graphql'
import { generatePath } from '@/helpers'
import { createColumnMap, parseAddress } from '@/helpers'
import { useLocalize, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'
import { RoutePaths, TableColumn } from '@/types'

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

  const withSkeleton = useSkeleton(isLoading)

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
          { width: '100%' },
        )}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          minWidth: columnMap[TxsColumnIds.Sender]?.minWidth,
          maxWidth: columnMap[TxsColumnIds.Sender]?.maxWidth,
        }}
      >
        {withSkeleton(<AvatarName address={parseAddress(transaction)} />, { width: '100%' })}
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
          { width: '100%', height: 32 },
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
          { width: '100%' },
        )}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          minWidth: columnMap[TxsColumnIds.Date]?.minWidth,
          whiteSpace: 'nowrap',
        }}
      >
        {withSkeleton(time(transaction?.block?.timestamp, { utc: true }).fromNow, {
          width: '100%',
        })}
      </TableCell>
      <TableCell
        sx={{ minWidth: columnMap[TxsColumnIds.Status]?.minWidth }}
        align={columnMap[TxsColumnIds.Status].align}
      >
        {withSkeleton(<TransactionStatus status={transaction?.success} />, {
          width: '100%',
          ml: 'auto',
          height: 32,
        })}
      </TableCell>
    </TableRow>
  )
}
