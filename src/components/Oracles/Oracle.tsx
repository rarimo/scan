'use client'

import { getOracleByAddress } from '@/callers'
import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import OverviewTable from '@/components/OverviewTable'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { OracleFragment } from '@/graphql'
import { formatCurrencyWithDenom } from '@/helpers'
import { useLoading, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'

import OracleStatus from './OracleStatus'

export default function Oracle({ address }: { address: string }) {
  const t = useI18n()

  const {
    data: oracle,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<OracleFragment>({} as OracleFragment, () => getOracleByAddress(address))

  const withSkeleton = useSkeleton(isLoading)

  const rows = [
    {
      head: t('oracle.account-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={oracle?.account ?? ''}>
          <AvatarName abbrAddress={false} address={oracle?.account ?? ''} />
        </CopyToClipboardWrapper>,
        TABLE_BIG_SKELETON_SX,
      ),
    },
    {
      head: t('oracle.chain-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={oracle?.account ?? ''}>
          {oracle?.chain}
        </CopyToClipboardWrapper>,
        TABLE_SMALL_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('oracle.status-col-lbl'),
      body: withSkeleton(
        <OracleStatus status={oracle?.status ?? ''} />,
        TABLE_TYPE_BOX_SKELETON_SX,
      ),
    },
    {
      head: t('oracle.stake-col-lbl'),
      body: withSkeleton(formatCurrencyWithDenom(oracle?.stake), TABLE_MEDIUM_TEXT_SKELETON_SX),
    },
    {
      head: t('oracle.violations-col-lbl'),
      body: withSkeleton(oracle?.violations_count, TABLE_SMALL_TEXT_SKELETON_SX),
    },
    {
      head: t('oracle.missed-col-lbl'),
      body: withSkeleton(oracle?.missed_count, TABLE_SMALL_TEXT_SKELETON_SX),
    },
    {
      head: t('oracle.votes-col-lbl'),
      body: withSkeleton(oracle?.votes_count, TABLE_SMALL_TEXT_SKELETON_SX),
    },
    {
      head: t('oracle.operations-col-lbl'),
      body: withSkeleton(oracle?.create_operations_count, TABLE_SMALL_TEXT_SKELETON_SX),
    },
    {
      head: t('oracle.freeze-end-block-col-lbl'),
      body: withSkeleton(oracle?.freeze_end_block, TABLE_SMALL_TEXT_SKELETON_SX),
    },
  ]

  return (
    <ContentSection withBackButton title={t('oracle.title')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('oracle.title')}
            noDataMessage={t('oracle.no-data-msg')}
            isEmpty={isEmpty}
            isLoadingError={isLoadingError}
            rows={rows}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
