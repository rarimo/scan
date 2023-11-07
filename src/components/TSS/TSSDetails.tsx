'use client'

import { getTSSByAddress } from '@/callers'
import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import OverviewTable from '@/components/OverviewTable'
import TSSStatus from '@/components/TSS/TSSStatus'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_LARGE_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { TssFragment } from '@/graphql'
import { abbr } from '@/helpers'
import { useLoading, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function TSSDetails({ address }: { address: string }) {
  const t = useI18n()

  const {
    data: tss,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<TssFragment>({} as TssFragment, () => getTSSByAddress(address))

  const withSkeleton = useSkeleton(isLoading)

  const rows = [
    {
      head: t('tss-details.account-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={tss?.account ?? ''}>
          <AvatarName abbrAddress={false} address={tss?.account ?? ''} />
        </CopyToClipboardWrapper>,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('tss-details.delegator-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={tss?.delegator || tss?.account || ''}>
          <AvatarName abbrAddress={false} address={tss?.delegator || tss?.account || ''} />
        </CopyToClipboardWrapper>,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('tss-details.address-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={tss?.address}>{tss?.address}</CopyToClipboardWrapper>,
        TABLE_BIG_SKELETON_SX,
      ),
    },
    {
      head: t('tss-details.status-col-lbl'),
      body: withSkeleton(<TSSStatus status={tss?.status ?? ''} />, TABLE_TYPE_BOX_SKELETON_SX),
    },
    {
      head: t('tss-details.public-key-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={tss?.pub_key}>
          {abbr(tss?.pub_key, 18, 24)}
        </CopyToClipboardWrapper>,
        TABLE_MEDIUM_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('tss-details.violations-col-lbl'),
      body: withSkeleton(tss?.violations_count, TABLE_SMALL_TEXT_SKELETON_SX),
    },
    {
      head: t('tss-details.freeze-end-block-col-lbl'),
      body: withSkeleton(tss?.freeze_end_block, TABLE_SMALL_TEXT_SKELETON_SX),
    },
  ]

  return (
    <ContentSection withBackButton title={t('tss-details.title')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('tss-details.title')}
            noDataMessage={t('tss-details.no-data-msg')}
            isEmpty={isEmpty}
            isLoadingError={isLoadingError}
            rows={rows}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
