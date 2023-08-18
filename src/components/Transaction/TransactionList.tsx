'use client'

import { TableCell } from '@mui/material'

import { ContentWrapper } from '@/components/Content'
import { TableWithPagination } from '@/components/TableWithPagination'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps, TransactionListFragment } from '@/types'

import { TransactionListRow } from './TransactionListRow'

export enum ColumnIds {
  HASH = 'hash',
  SENDER = 'sender',
  OPERATION = 'operation',
  BLOCK = 'title',
  DATE = 'date',
  STATUS = 'status',
}

export const TransactionList = ({
  isLoading,
  isLoadingError,
  limit,
  offset,
  list,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableListProps<TransactionListFragment>) => {
  const t = useI18n()

  const columns: readonly TableColumn<ColumnIds>[] = [
    {
      id: ColumnIds.HASH,
      label: t('transactions-list.hash-col-lbl'),
      minWidth: 260,
      maxWidth: 262,
    },
    {
      id: ColumnIds.SENDER,
      label: t('transactions-list.sender-col-lbl'),
      minWidth: 260,
      maxWidth: 260,
    },
    {
      id: ColumnIds.OPERATION,
      label: t('transactions-list.operation-col-lbl'),
      minWidth: 260,
      maxWidth: 260,
    },
    {
      id: ColumnIds.BLOCK,
      label: t('transactions-list.block-col-lbl'),
      maxWidth: 175,
      minWidth: 175,
    },
    {
      id: ColumnIds.DATE,
      label: t('transactions-list.date-col-lbl'),
      minWidth: 150,
      maxWidth: 150,
    },
    {
      id: ColumnIds.STATUS,
      label: t('transactions-list.status-col-lbl'),
      minWidth: 220,
      maxWidth: 220,
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as TransactionListFragment) : list).map(
    (row, idx) => (
      <TransactionListRow columns={columns} transaction={row} isLoading={isLoading} key={idx} />
    ),
  )

  return (
    <ContentWrapper>
      <TableWithPagination
        label={t('transactions-list.table-lbl')}
        noDataMessage={t('transactions-list.no-data-msg')}
        isLoadingError={isLoadingError}
        isLoading={isLoading}
        limit={limit}
        offset={offset}
        count={count}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        headCells={headCells}
        rows={rows}
      />
    </ContentWrapper>
  )
}
