'use client'

import { TableCell } from '@mui/material'
import { useEffect } from 'react'

import { getProposalVotesCountByID, getProposalVotesListByID } from '@/callers'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import ProposalVotesRow from '@/components/Proposal/ProposalVotesRow'
import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { ProposalVoteFragment } from '@/graphql'
import { Bus } from '@/helpers'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TableColumn } from '@/types'

export enum ProposalVotesColumnIds {
  Voter = 'voter_address',
  Tx = 'hash',
  Block = 'height',
  Date = 'timestamp',
  Option = 'option',
}

export default function ProposalVotes({ id }: { id: string }) {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination('votes')

  const {
    data: voteCount,
    isLoading: isLoadingVotesCount,
    isLoadingError: isLoadingVotesCountError,
    reload: reloadVotesCount,
  } = useLoading<number>(0, () => getProposalVotesCountByID(id))

  const {
    data: votesList,
    isLoading,
    isLoadingError,
    reload: reloadVotes,
  } = useLoading<ProposalVoteFragment[]>([], () => getProposalVotesListByID(id, limit, offset), {
    loadArgs: [limit, offset],
  })

  useEffect(() => {
    Bus.on(Bus.eventList.reloadVotes, () => {
      reloadVotesCount()
      reloadVotes()
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: readonly TableColumn<ProposalVotesColumnIds>[] = [
    {
      id: ProposalVotesColumnIds.Voter,
      label: t('proposal-votes.voter-account-id-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: ProposalVotesColumnIds.Tx,
      label: t('proposal-votes.tx-hash-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: ProposalVotesColumnIds.Block,
      label: t('proposal-votes.block-height-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 120,
        maxWidth: 150,
      },
    },
    {
      id: ProposalVotesColumnIds.Date,
      label: t('proposal-votes.age-col-lbl'),
      sx: { ...OVERFLOW_SX, minWidth: 120, maxWidth: 150 },
    },
    {
      id: ProposalVotesColumnIds.Option,
      label: t('proposal-votes.option-col-lbl'),
      sx: { minWidth: 70 },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as ProposalVoteFragment) : votesList).map(
    (row, idx) => <ProposalVotesRow columns={columns} vote={row} isLoading={isLoading} key={idx} />,
  )

  return (
    <ContentSection title={t('proposal-votes.title-lbl')}>
      <ContentBox>
        <ContentWrapper>
          <TableWithPagination
            label={t('proposal-votes.title-lbl')}
            noDataTitle={t('proposal-votes.no-data-title')}
            noDataSubtitle={t('proposal-votes.no-data-subtitle')}
            errorTitle={t('proposal-votes.error-title')}
            errorSubtitle={t('proposal-votes.error-subtitle')}
            isLoadingError={isLoadingError || isLoadingVotesCountError}
            isLoading={isLoading || isLoadingVotesCount}
            isMinHeighted={false}
            limit={limit}
            offset={offset}
            count={voteCount}
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
