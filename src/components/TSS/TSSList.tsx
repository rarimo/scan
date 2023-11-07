'use client'

import { TableCell } from '@mui/material'

import { ContentBox, ContentWrapper } from '@/components/Content'
import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { TssListFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps } from '@/types'

import TSSListRow from './TSSListRow'

export enum TSSColumnIds {
  Account = 'account',
  Status = 'status',
  Delegator = 'delegator',
  Violations = 'violations',
}

export default function TSSList({
  isLoading,
  isLoadingError,
  limit,
  offset,
  list,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
  isMinHeighted = true,
}: TableListProps<TssListFragment>) {
  const t = useI18n()

  const columns: readonly TableColumn<TSSColumnIds>[] = [
    {
      id: TSSColumnIds.Account,
      label: t('tss-list.account-col-lbl'),
      sx: {
        minWidth: 260,
        maxWidth: 260,
      },
    },
    {
      id: TSSColumnIds.Delegator,
      label: t('tss-list.delegator-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 260,
        maxWidth: 260,
      },
    },
    {
      id: TSSColumnIds.Violations,
      label: t('tss-list.violations-col-lbl'),
      sx: {
        minWidth: 80,
        maxWidth: 80,
      },
    },
    {
      id: TSSColumnIds.Status,
      label: t('tss-list.status-col-lbl'),
      sx: {
        minWidth: 150,
        maxWidth: 150,
      },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as TssListFragment) : list).map((row, idx) => (
    <TSSListRow columns={columns} tss={row} isLoading={isLoading} key={idx} />
  ))

  return (
    <ContentBox>
      <ContentWrapper>
        <TableWithPagination
          isMinHeighted={isMinHeighted}
          label={t('tss-list.table-lbl')}
          noDataTitle={t('tss-list.no-data-title')}
          noDataSubtitle={t('tss-list.no-data-subtitle')}
          errorTitle={t('tss-list.error-title')}
          errorSubtitle={t('tss-list.error-subtitle')}
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
    </ContentBox>
  )
}
