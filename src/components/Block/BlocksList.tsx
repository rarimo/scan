'use client'

import { TableCell } from '@mui/material'

import BlocksListRow from '@/components/Block/BlocksListRow'
import { ContentWrapper } from '@/components/Content'
import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { BlockListFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps } from '@/types'

export enum BlocksColumnIds {
  Block = 'block',
  TxN = 'txn',
  Date = 'date',
  Validator = 'validator',
  Gas = 'gas',
}

export default function BlocksList({
  isLoading,
  isLoadingError,
  limit,
  offset,
  list,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  isMinHeighted = true,
}: TableListProps<BlockListFragment>) {
  const t = useI18n()

  const columns: readonly TableColumn<BlocksColumnIds>[] = [
    {
      id: BlocksColumnIds.Block,
      label: t('block-list.block-col-lbl'),
      sx: {
        minWidth: 260,
      },
    },
    {
      id: BlocksColumnIds.Date,
      label: t('block-list.date-col-lbl'),
      sx: {
        minWidth: 260,
      },
    },
    {
      id: BlocksColumnIds.Validator,
      label: t('block-list.validator-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 260,
      },
    },
    {
      id: BlocksColumnIds.Gas,
      label: t('block-list.gas-col-lbl'),
      sx: {
        minWidth: 120,
      },
      align: 'right',
    },
    {
      id: BlocksColumnIds.TxN,
      label: t('block-list.tnx-col-lbl'),
      sx: {
        minWidth: 120,
      },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as BlockListFragment) : list).map(
    (row, idx) => <BlocksListRow columns={columns} block={row} isLoading={isLoading} key={idx} />,
  )

  return (
    <ContentWrapper>
      <TableWithPagination
        isMinHeighted={isMinHeighted}
        label={t('block-list.table-lbl')}
        noDataTitle={t('block-list.no-data-title')}
        noDataSubtitle={t('block-list.no-data-subtitle')}
        errorTitle={t('block-list.error-title')}
        errorSubtitle={t('block-list.error-subtitle')}
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
