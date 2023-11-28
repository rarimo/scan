'use client'

import { time } from '@distributedlab/tools'
import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'

import { getConfirmationByRoot } from '@/callers'
import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import OverviewTable from '@/components/OverviewTable'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_LARGE_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
} from '@/const'
import { ConfirmationFragment } from '@/graphql'
import { generatePath } from '@/helpers'
import { useLoading, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

export default function Confirmation({ root }: { root: string }) {
  const t = useI18n()

  const {
    data: confirmation,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<ConfirmationFragment>({} as ConfirmationFragment, () =>
    getConfirmationByRoot(root),
  )
  const withSkeleton = useSkeleton(isLoading)

  const rows = [
    {
      head: t('confirmation.root-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={confirmation?.root}>
          {confirmation?.root}
        </CopyToClipboardWrapper>,
        TABLE_BIG_SKELETON_SX,
      ),
    },
    {
      head: t('confirmation.tx-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={confirmation?.tx ?? ''}>
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Transaction, {
              hash: String(confirmation?.tx),
            })}
          >
            {confirmation?.tx}
          </MuiLink>
        </CopyToClipboardWrapper>,
        TABLE_BIG_SKELETON_SX,
      ),
    },
    {
      head: t('confirmation.creator-col-lbl'),
      body: withSkeleton(
        <AvatarName abbrAddress={false} address={confirmation?.creator ?? ''} />,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('confirmation.block-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={confirmation?.height ?? ''}>
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Block, {
              height: String(confirmation?.height),
            })}
          >
            {confirmation?.height}
          </MuiLink>
        </CopyToClipboardWrapper>,
        TABLE_SMALL_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('confirmation.age-col-lbl'),
      body: withSkeleton(
        time(confirmation?.block?.timestamp, { utc: true }).fromNow,
        TABLE_MEDIUM_TEXT_SKELETON_SX,
      ),
    },
  ]

  return (
    <ContentSection withBackButton title={t('confirmation.title')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('confirmation.title')}
            noDataMessage={t('confirmation.no-data-msg')}
            isEmpty={isEmpty}
            isLoadingError={isLoadingError}
            rows={rows}
            sx={{}}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
