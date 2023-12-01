'use client'

import { Chip, Link as MuiLink, Stack } from '@mui/material'
import isEmpty from 'lodash-es/isEmpty'
import Link from 'next/link'
import { useMemo } from 'react'

import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentWrapper } from '@/components/Content'
import OverviewTable from '@/components/OverviewTable'
import ProposalDetailsContentRow from '@/components/Proposal/ProposalDetailsContentRow'
import ProposalDetailsTallyResult from '@/components/Proposal/ProposalDetailsTallyResult'
import ProposalStatus from '@/components/Proposal/ProposalStatus'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_LARGE_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { ProposalFragment } from '@/graphql'
import { calculateTallyResults, generatePath } from '@/helpers'
import { useProposalMetadata, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

import CopyToClipboardWrapper from '../CopyToClipboardWrapper'

export default function ProposalDetails({
  isLoading,
  isLoadingError,
  proposal,
}: {
  isLoading: boolean
  isLoadingError: boolean
  proposal: ProposalFragment
}) {
  const t = useI18n()

  const isProposalExist = useMemo(() => !isEmpty(proposal), [proposal])

  const { metadata, proposalTypesLocalized } = useProposalMetadata(proposal)

  const tallyResults = useMemo(
    () =>
      proposal?.proposal_tally_result
        ? calculateTallyResults(proposal.proposal_tally_result)
        : null,
    [proposal],
  )

  const withSkeleton = useSkeleton(isLoading)

  const rows = [
    {
      head: t('proposal-details.proposer-account-id-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={proposal?.proposer_address ?? ''}>
          <AvatarName address={proposal?.proposer_address ?? ''} abbrAddress={false} />
        </CopyToClipboardWrapper>,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('proposal-details.type-lbl'),
      body: withSkeleton(
        <Stack direction={'row'} spacing={1}>
          {(proposalTypesLocalized as string[]).map((i, idx) => (
            <Chip label={i} key={idx} />
          ))}
        </Stack>,
        TABLE_TYPE_BOX_SKELETON_SX,
      ),
    },
    {
      head: t('proposal-details.title-lbl'),
      body: withSkeleton(metadata?.title, TABLE_BIG_SKELETON_SX),
    },
    {
      head: t('proposal-details.description-lbl'),
      body: withSkeleton(metadata?.description, TABLE_TYPE_BOX_SKELETON_SX),
    },
    {
      head: t('proposal-details.status-lbl'),
      body: withSkeleton(
        <ProposalStatus status={proposal?.status ?? ''} />,
        TABLE_TYPE_BOX_SKELETON_SX,
      ),
    },
    {
      head: t('proposal-details.submit-block-lbl'),
      body: withSkeleton(
        <MuiLink
          component={Link}
          href={generatePath(RoutePaths.Block, {
            height: String(proposal?.submit_block),
          })}
        >
          {proposal?.submit_block}
        </MuiLink>,
        TABLE_MEDIUM_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('proposal-details.voting-start-block-lbl'),
      body: withSkeleton(
        <MuiLink
          component={Link}
          href={generatePath(RoutePaths.Block, {
            height: String(proposal?.voting_start_block),
          })}
        >
          {proposal?.voting_start_block}
        </MuiLink>,
        TABLE_MEDIUM_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('proposal-details.voting-end-block-lbl'),
      body: withSkeleton(
        <MuiLink
          component={Link}
          href={generatePath(RoutePaths.Block, {
            height: String(proposal?.voting_end_block),
          })}
        >
          {proposal?.voting_end_block}
        </MuiLink>,
        TABLE_MEDIUM_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('proposal-details.deposit-end-block-lbl'),
      body: withSkeleton(
        <MuiLink
          component={Link}
          href={generatePath(RoutePaths.Block, {
            height: String(proposal?.deposit_end_block),
          })}
        >
          {proposal?.deposit_end_block}
        </MuiLink>,
        TABLE_MEDIUM_TEXT_SKELETON_SX,
      ),
    },
    ...(tallyResults
      ? [
          {
            head: t('proposal-details.tally-result-lbl'),
            body: <ProposalDetailsTallyResult result={tallyResults} />,
          },
        ]
      : []),
  ]

  return (
    <ContentBox>
      <ContentWrapper>
        <OverviewTable
          label={t('proposal-details.table-lbl')}
          noDataMessage={t('proposal-details.no-data-msg')}
          isEmpty={!isProposalExist}
          isLoadingError={isLoadingError}
          rows={rows}
          sx={{}}
        />
        <OverviewTable
          sx={{
            '& > tr:last-child td, & > tr:last-child th, & > tr:nth-last-of-type(-n + 2) td': {
              border: 0,
            },
          }}
        >
          <ProposalDetailsContentRow proposal={proposal} />
        </OverviewTable>
      </ContentWrapper>
    </ContentBox>
  )
}
