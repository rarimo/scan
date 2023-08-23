'use client'

import {
  Chip,
  Link as MuiLink,
  Skeleton,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from '@mui/material'
import isEmpty from 'lodash-es/isEmpty'
import Link from 'next/link'
import { ReactNode, useMemo } from 'react'

import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentWrapper } from '@/components/Content'
import OverviewTable from '@/components/OverviewTable'
import ProposalDetailsContentRow from '@/components/Proposal/ProposalDetailsContentRow'
import ProposalStatus from '@/components/Proposal/ProposalStatus'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_LARGE_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { RoutePaths } from '@/enums'
import { ProposalFragment } from '@/graphql'
import { calculateTallyResults, generatePath } from '@/helpers'
import { useProposalMetadata } from '@/hooks'
import { useI18n } from '@/locales/client'

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
  const theme = useTheme()

  const isProposalExist = useMemo(() => !isEmpty(proposal), [proposal])

  const { metadata, proposalTypesLocalized } = useProposalMetadata(proposal)

  const tallyResults = useMemo(
    () =>
      proposal?.proposal_tally_result
        ? calculateTallyResults(proposal.proposal_tally_result)
        : null,
    [proposal],
  )

  const withSkeleton = (children: ReactNode, sx?: SxProps) =>
    isLoading ? <Skeleton sx={{ width: '100%', ...(sx || {}) }} /> : children

  const tallyResultsStack = [
    {
      label: t('proposal-details.tally-result-yes-lbl'),
      percent: tallyResults?.yes,
    },
    {
      label: t('proposal-details.tally-result-abstain-lbl'),
      percent: tallyResults?.abstain,
    },
    {
      label: t('proposal-details.tally-result-no-lbl'),
      percent: tallyResults?.no,
    },
    {
      label: t('proposal-details.tally-result-no-with-veto-lbl'),
      percent: tallyResults?.no_with_veto,
    },
  ]

  const rows = [
    {
      head: t('proposal-details.proposer-account-id-lbl'),
      body: withSkeleton(
        <AvatarName address={proposal?.proposer_address ?? ''} abbrAddress={false} />,
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
            body: (
              <Stack spacing={theme.spacing(4)} direction={'row'}>
                {tallyResultsStack.map((item, idx) => (
                  <Typography key={idx} component={'span'}>
                    <Typography component={'span'} variant={'body2'}>
                      {item.label}
                    </Typography>
                    <Typography
                      component={'span'}
                      variant={'body2'}
                      color={theme.palette.text.secondary}
                    >
                      {item.percent + '%'}
                    </Typography>
                  </Typography>
                ))}
              </Stack>
            ),
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
