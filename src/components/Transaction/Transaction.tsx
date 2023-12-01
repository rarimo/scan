'use client'

import { time } from '@distributedlab/tools'
import { Chip, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { useMemo } from 'react'

import { getTransactionByHash } from '@/callers'
import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import OverviewTable from '@/components/OverviewTable'
import TransactionDetailsContentRow from '@/components/Transaction/TransactionDetailsContentRow'
import TransactionStatus from '@/components/Transaction/TransactionStatus'
import { CONFIG } from '@/config'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_LARGE_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { TransactionFragment } from '@/graphql'
import { formatCurrencyWithDenom, generatePath, parseAddress } from '@/helpers'
import { useLoading, useLocalize, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

export default function Transaction({ hash }: { hash: string }) {
  const t = useI18n()
  const { localizeMsgType } = useLocalize()

  const {
    data: transaction,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<TransactionFragment>({} as TransactionFragment, () =>
    getTransactionByHash(hash as string),
  )

  const withSkeleton = useSkeleton(isLoading)

  const address = useMemo(() => parseAddress(transaction), [transaction])

  const rows = [
    {
      head: t('transaction-details.hash-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={transaction?.hash}>
          {transaction?.hash}
        </CopyToClipboardWrapper>,
        TABLE_BIG_SKELETON_SX,
      ),
    },
    {
      head: t('transaction-details.status-lbl'),
      body: withSkeleton(
        <TransactionStatus status={transaction?.success} />,
        TABLE_TYPE_BOX_SKELETON_SX,
      ),
    },
    {
      head: t('transaction-details.block-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={transaction?.height ?? ''}>
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Block, {
              height: String(transaction?.height),
            })}
          >
            {transaction?.height}
          </MuiLink>
        </CopyToClipboardWrapper>,
        TABLE_MEDIUM_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('transaction-details.age-lbl'),
      body: withSkeleton(
        time(transaction?.block?.timestamp, { utc: true }).fromNow,
        TABLE_MEDIUM_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('transaction-details.sender-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={address}>
          <AvatarName abbrAddress={false} address={address} />
        </CopyToClipboardWrapper>,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('transaction-details.validator-lbl'),
      body: withSkeleton(
        <AvatarName
          abbrAddress={false}
          address={transaction?.block?.validator?.validator_info?.operator_address ?? ''}
          name={transaction?.block?.validator?.validator_descriptions?.[0]?.moniker ?? ''}
          imageUrl={transaction?.block?.validator?.validator_descriptions?.[0]?.avatar_url ?? ''}
        />,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('transaction-details.gas-used-lbl'),
      body: withSkeleton(transaction?.gas_used, TABLE_SMALL_TEXT_SKELETON_SX),
    },
    {
      head: t('transaction-details.fee-lbl'),
      body: withSkeleton(
        formatCurrencyWithDenom(transaction?.fee?.amount[0]?.amount, CONFIG.DECIMALS),
        TABLE_SMALL_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('transaction-details.operation-lbl'),
      body: withSkeleton(
        <Chip
          label={
            localizeMsgType(transaction?.messages?.[0]?.['@type']) ?? t('message-types.unknown-lbl')
          }
        />,
        TABLE_TYPE_BOX_SKELETON_SX,
      ),
    },
  ]

  return (
    <ContentSection withBackButton title={t('transaction-details.title')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('transaction-details.title')}
            noDataMessage={t('transaction-details.no-data-message')}
            isEmpty={isEmpty}
            isLoadingError={isLoadingError}
            rows={rows}
            sx={{}}
          />
          <OverviewTable
            sx={{
              '& > tr:last-child td, & > tr:nth-last-of-type(-n + 3) td': {
                border: 0,
              },
            }}
          >
            <TransactionDetailsContentRow transaction={transaction} />
          </OverviewTable>
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
