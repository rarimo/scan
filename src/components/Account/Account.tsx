'use client'

import { Skeleton } from '@mui/material'
import { Coin } from '@rarimo/client'
import { ReactNode } from 'react'

import { client } from '@/client'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import OverviewTable from '@/components/OverviewTable'
import { CONFIG } from '@/config'
import { formatCurrencyWithDenom } from '@/helpers'
import { useLoading } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function Account({ address }: { address: string }) {
  const t = useI18n()

  const { data, isLoading, isLoadingError, isEmpty } = useLoading<Coin[] | undefined>(
    [],
    async () => {
      return client.query.getAllBalances(address)
    },
  )

  const withLoading = (children: ReactNode) => (isLoading ? <Skeleton width={'100%'} /> : children)

  const rows = [
    {
      head: t('account.address-lbl'),
      body: withLoading(<CopyToClipboardWrapper value={address}>{address}</CopyToClipboardWrapper>),
    },
    {
      head: t('account.balance-lbl'),
      body: withLoading(formatCurrencyWithDenom(data?.[0]?.amount, CONFIG.DECIMALS)),
    },
  ]

  return (
    <ContentSection withBackButton title={t('account.title-lbl')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('account.title-lbl')}
            noDataMessage={t('account.no-data-msg')}
            isEmpty={isEmpty}
            isLoadingError={isLoadingError}
            rows={rows}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
