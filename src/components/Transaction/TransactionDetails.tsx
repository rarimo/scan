'use client'

import { time } from '@distributedlab/tools'
import { Chip, Link as MuiLink, Skeleton, SxProps } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { getTransactionByHash } from '@/callers'
import { CONFIG } from '@/config'
import {
  TABLE_ADDRESS_SKELETON_SX,
  TABLE_HASH_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { RoutePaths } from '@/enums'
import { formatCurrencyWithDenom, generatePath, parseAddress } from '@/helpers'
import { useLoading, useLocalize } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TransactionFragment } from '@/types'

import { AvatarName } from '../Avatar'
import { ContentBox, ContentSection, ContentWrapper } from '../Content'
import { CopyToClipboardWrapper } from '../CopyToClipboardWrapper'
import { OverviewTable } from '../OverviewTable'
import { TransactionDetailsContentRow } from './TransactionDetailsContentRow'
import { TransactionStatus } from './TransactionStatus'

export const TransactionDetailsSection = ({ hash }: { hash: string }) => {
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

  const withSkeleton = (children: ReactNode, sx?: SxProps) =>
    isLoading ? <Skeleton sx={{ width: '100%', ...(sx || {}) }} /> : children

  const rows = [
    {
      head: t('transaction-details.hash-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={transaction?.hash}>
          {transaction?.hash}
        </CopyToClipboardWrapper>,
        TABLE_HASH_SKELETON_SX,
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
        <MuiLink
          component={Link}
          href={generatePath(RoutePaths.Block, {
            height: String(transaction?.height),
          })}
        >
          {transaction?.height}
        </MuiLink>,
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
        <AvatarName abbrAddress={false} address={parseAddress(transaction)} />,
        TABLE_ADDRESS_SKELETON_SX,
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
        TABLE_ADDRESS_SKELETON_SX,
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
