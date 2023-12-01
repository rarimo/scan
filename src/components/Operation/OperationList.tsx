'use client'

import { TableCell } from '@mui/material'

import { ContentWrapper } from '@/components/Content'
import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { OperationFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps } from '@/types'

import OperationListRow from './OperationListRow'

export enum OperationColumnIds {
  Index = 'index',
  Creator = 'creator',
  Type = 'type',
  Status = 'status',
  Date = 'date',
}

export default function OperationList({
  isLoading,
  isLoadingError,
  limit,
  offset,
  list,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  isMinHeighted,
}: TableListProps<OperationFragment>) {
  const t = useI18n()

  const columns: readonly TableColumn<OperationColumnIds>[] = [
    {
      id: OperationColumnIds.Index,
      label: t('operation-list.index-col-lbl'),
      sx: {
        minWidth: 260,
        maxWidth: 260,
      },
    },
    {
      id: OperationColumnIds.Type,
      label: t('operation-list.type-col-lbl'),
      sx: {
        minWidth: 150,
        maxWidth: 220,
      },
    },
    {
      id: OperationColumnIds.Creator,
      label: t('operation-list.creator-col-lbl'),
      sx: {
        minWidth: 260,
        maxWidth: 260,
      },
    },
    {
      id: OperationColumnIds.Date,
      label: t('operation-list.date-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 120,
        maxWidth: 150,
      },
    },
    {
      id: OperationColumnIds.Status,
      label: t('operation-list.status-col-lbl'),
      sx: {
        minWidth: 150,
        maxWidth: 150,
      },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as OperationFragment) : list).map(
    (row, idx) => <OperationListRow columns={columns} row={row} isLoading={isLoading} key={idx} />,
  )

  return (
    <ContentWrapper>
      <TableWithPagination
        label={t('operation-list.table-lbl')}
        noDataTitle={t('operation-list.no-data-title')}
        noDataSubtitle={t('operation-list.no-data-subtitle')}
        errorTitle={t('operation-list.error-title')}
        errorSubtitle={t('operation-list.error-subtitle')}
        isLoadingError={isLoadingError}
        isLoading={isLoading}
        isMinHeighted={isMinHeighted}
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
