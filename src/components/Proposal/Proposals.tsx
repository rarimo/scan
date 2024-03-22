'use client'

import { TableCell } from '@mui/material'
import { useEffect } from 'react'

import { getProposalCount, getProposalList } from '@/callers'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import ProposalsRow from '@/components/Proposal/ProposalsRow'
import ProposalsSubmit from '@/components/Proposal/ProposalsSubmit'
import TableWithPagination from '@/components/TableWithPagination'
import { ProposalBaseFragment } from '@/graphql'
import { Bus } from '@/helpers'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TableColumn } from '@/types'

export enum ProposalsColumnIds {
  Id = 'id',
  Title = 'title',
  Type = 'type',
  Proposer = 'proposer_address',
  Status = 'status',
}

export default function Proposals() {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: proposalCount,
    isLoading: isLoadingProposalCount,
    isLoadingError: isLoadingProposalCountError,
    reload: reloadProposalCount,
  } = useLoading<number>(0, getProposalCount)

  const {
    data: proposalList,
    isLoading,
    isLoadingError,
    reload: reloadProposalsList,
  } = useLoading<ProposalBaseFragment[]>([], () => getProposalList(limit, offset), {
    loadArgs: [limit, offset],
  })

  useEffect(() => {
    Bus.on(Bus.eventList.reloadVotes, () => {
      reloadProposalCount()
      reloadProposalsList()
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: readonly TableColumn<ProposalsColumnIds>[] = [
    {
      id: ProposalsColumnIds.Id,
      label: t('proposals.id-col-lbl'),
      minWidth: 80,
      maxWidth: 80,
    },
    {
      id: ProposalsColumnIds.Title,
      label: t('proposals.title-col-lbl'),
      minWidth: 260,
      maxWidth: 260,
    },
    {
      id: ProposalsColumnIds.Type,
      label: t('proposals.type-col-lbl'),
      minWidth: 260,
      maxWidth: 260,
    },
    {
      id: ProposalsColumnIds.Proposer,
      label: t('proposals.proposer-col-lbl'),
      minWidth: 260,
      maxWidth: 430,
    },
    {
      id: ProposalsColumnIds.Status,
      label: t('proposals.status-col-lbl'),
      minWidth: 150,
      maxWidth: 150,
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as ProposalBaseFragment) : proposalList).map(
    (row, idx) => <ProposalsRow columns={columns} proposal={row} isLoading={isLoading} key={idx} />,
  )

  return (
    <ContentSection withBackButton title={t('proposals.title-lbl')} action={<ProposalsSubmit />}>
      <ContentBox>
        <ContentWrapper>
          <TableWithPagination
            label={t('proposals.table-lbl')}
            noDataTitle={t('proposals.no-data-title')}
            noDataSubtitle={t('proposals.no-data-subtitle')}
            errorTitle={t('proposals.error-title')}
            errorSubtitle={t('proposals.error-subtitle')}
            isLoadingError={isLoadingError || isLoadingProposalCountError}
            isLoading={isLoading || isLoadingProposalCount}
            limit={limit}
            offset={offset}
            count={proposalCount}
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
