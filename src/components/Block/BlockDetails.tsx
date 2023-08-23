'use client'

import { time } from '@distributedlab/tools'
import { Skeleton, SxProps } from '@mui/material'
import { ReactNode } from 'react'

import { getBlockByHeight } from '@/callers'
import { AvatarName } from '@/components/Avatar'
import BlockTransactions from '@/components/Block/BlockTransactions'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import OverviewTable from '@/components/OverviewTable'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_LARGE_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
} from '@/const'
import { BlockFragment } from '@/graphql'
import { useLoading } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function BlockDetails({ height }: { height: string }) {
  const t = useI18n()

  const {
    data: block,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<BlockFragment>({} as BlockFragment, () => getBlockByHeight(Number(height)))

  const withSkeleton = (children: ReactNode, sx?: SxProps) =>
    isLoading ? <Skeleton sx={{ width: '100%', ...(sx || {}) }} /> : children

  const rows = [
    {
      head: t('block-details.height-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={block?.height}>{block?.height}</CopyToClipboardWrapper>,
        TABLE_SMALL_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('block-details.age-lbl'),
      body: withSkeleton(
        time(block?.timestamp, { utc: true }).fromNow,
        TABLE_SMALL_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('block-details.hash-lbl'),
      body: withSkeleton(block?.hash, TABLE_BIG_SKELETON_SX),
    },
    {
      head: t('block-details.validator-lbl'),
      body: withSkeleton(
        <AvatarName
          abbrAddress={false}
          address={block.validator?.validator_info?.operator_address ?? ''}
          name={block.validator?.validator_descriptions?.[0]?.moniker ?? ''}
          imageUrl={block.validator?.validator_descriptions?.[0]?.avatar_url ?? ''}
        />,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('block-details.gas-total-lbl'),
      body: withSkeleton(block?.total_gas, TABLE_SMALL_TEXT_SKELETON_SX),
    },
    {
      head: t('block-details.tnx-lbl'),
      body: withSkeleton(block?.num_txs, TABLE_SMALL_TEXT_SKELETON_SX),
    },
  ]

  return (
    <>
      <ContentSection withBackButton title={t('block-details.title')}>
        <ContentBox>
          <ContentWrapper>
            <OverviewTable
              label={t('block-details.title')}
              noDataMessage={t('block-details.no-data-message')}
              isEmpty={isEmpty}
              isLoadingError={isLoadingError}
              rows={rows}
            />
          </ContentWrapper>
        </ContentBox>
      </ContentSection>
      <BlockTransactions
        isBlockLoading={isLoading}
        amountTX={Number(block?.num_txs ?? 0)}
        isBlockLoadingError={isLoadingError}
        blockHeight={Number(height)}
      />
    </>
  )
}
