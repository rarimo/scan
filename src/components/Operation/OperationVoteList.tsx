'use client'

import { TableCell } from '@mui/material'

import { ContentWrapper } from '@/components/Content'
import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { OperationVoteFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps } from '@/types'

import OperationVotesRow from './OperationVotesRow'

export enum OperationVotesColumnIds {
  Voter = 'voter',
  Tx = 'tx',
  Block = 'block',
  Age = 'age',
  Option = 'option',
}

export default function OperationVoteList({
  isLoading,
  isLoadingError,
  limit,
  offset,
  list,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableListProps<OperationVoteFragment>) {
  const t = useI18n()

  const columns: readonly TableColumn<OperationVotesColumnIds>[] = [
    {
      id: OperationVotesColumnIds.Voter,
      label: t('operation-vote-list.voter-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: OperationVotesColumnIds.Tx,
      label: t('operation-vote-list.tx-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: OperationVotesColumnIds.Block,
      label: t('operation-vote-list.block-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 120,
        maxWidth: 150,
      },
    },
    {
      id: OperationVotesColumnIds.Age,
      label: t('operation-vote-list.age-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 120,
        maxWidth: 150,
      },
    },
    {
      id: OperationVotesColumnIds.Option,
      label: t('operation-vote-list.option-col-lbl'),
      sx: { minWidth: 70, maxWidth: 70 },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as OperationVoteFragment) : list).map(
    (row, idx) => (
      <OperationVotesRow columns={columns} vote={row} isLoading={isLoading} key={idx} />
    ),
  )

  return (
    <ContentWrapper>
      <TableWithPagination
        label={t('operation-vote-list.table-lbl')}
        noDataTitle={t('operation-vote-list.no-data-title')}
        noDataSubtitle={t('operation-vote-list.no-data-subtitle')}
        errorTitle={t('operation-vote-list.error-title')}
        errorSubtitle={t('operation-vote-list.error-subtitle')}
        isLoadingError={isLoadingError}
        isLoading={isLoading}
        isMinHeighted={false}
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
