'use client'

import { TableCell } from '@mui/material'

import { getProposalDepositsCountByID, getProposalDepositsListByID } from '@/callers'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import ProposalDepositsRow from '@/components/Proposal/ProposalDepositsRow'
import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { ProposalDepositFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TableColumn } from '@/types'

export enum ProposalDepositsColumnIds {
  Depositor = 'depositor_address',
  Amount = 'amount',
  Block = 'height',
  Date = 'timestamp',
  Tx = 'hash',
}

export default function ProposalDeposits({ id }: { id: string }) {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: depositCount,
    isLoading: isLoadingDepositCount,
    isLoadingError: isLoadingDepositCountError,
  } = useLoading<number>(0, () => getProposalDepositsCountByID(id))

  const {
    data: depositList,
    isLoading,
    isLoadingError,
  } = useLoading<ProposalDepositFragment[]>(
    [],
    () => getProposalDepositsListByID(id, limit, offset),
    { loadArgs: [limit, offset] },
  )

  const columns: readonly TableColumn<ProposalDepositsColumnIds>[] = [
    {
      id: ProposalDepositsColumnIds.Depositor,
      label: t('proposal-deposits.depositor-account-id-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: ProposalDepositsColumnIds.Tx,
      label: t('proposal-deposits.tx-hash-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: ProposalDepositsColumnIds.Block,
      label: t('proposal-deposits.block-height-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 40,
        maxWidth: 80,
      },
    },
    {
      id: ProposalDepositsColumnIds.Date,
      label: t('proposal-deposits.age-col-lbl'),
      sx: { ...OVERFLOW_SX, minWidth: 40, maxWidth: 80 },
    },
    {
      id: ProposalDepositsColumnIds.Amount,
      label: t('proposal-deposits.amount-col-lbl'),
      sx: { minWidth: 70 },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as ProposalDepositFragment) : depositList).map(
    (row, idx) => (
      <ProposalDepositsRow columns={columns} deposit={row} isLoading={isLoading} key={idx} />
    ),
  )

  return (
    <ContentSection title={t('proposal-deposits.title-lbl')}>
      <ContentBox>
        <ContentWrapper>
          <TableWithPagination
            label={t('proposal-deposits.title-lbl')}
            noDataMessage={t('proposal-deposits.no-data-msg')}
            isLoadingError={isLoadingError || isLoadingDepositCountError}
            isMinHeighted={false}
            isLoading={isLoading || isLoadingDepositCount}
            limit={limit}
            offset={offset}
            count={depositCount}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            headCells={headCells}
            rows={rows}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
