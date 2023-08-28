'use client'

import { time } from '@distributedlab/tools'
import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { useMemo } from 'react'

import AvatarName from '@/components/Avatar/AvatarName'
import { ContentWrapper } from '@/components/Content'
import HomeLatestDataRow from '@/components/Home/HomeLatestDataRow'
import NoData from '@/components/NoData'
import PreviewList from '@/components/PreviewList'
import { TransactionBaseFragment } from '@/graphql'
import { abbr, generatePath, parseAddress } from '@/helpers'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

const LINK_PROPS = {
  display: 'inline',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export default function HomeLatestTransactions({
  isLoading,
  isLoadingError,
  transactionList,
  limitRow,
}: {
  isLoadingError: boolean
  isLoading: boolean
  transactionList: TransactionBaseFragment[]
  limitRow: number
}) {
  const t = useI18n()

  const txList = useMemo(() => {
    return transactionList.map(i => {
      return {
        ...i,
        sender: parseAddress(i),
      }
    })
  }, [transactionList])

  const list = (
    <PreviewList
      actions={{
        label: t('transaction-list.view-all'),
        link: RoutePaths.Transactions,
      }}
      title={t('transaction-list.title')}
      isError={isLoadingError}
      isLoading={isLoading}
    >
      {(isLoading ? new Array(limitRow).fill({} as TransactionBaseFragment) : txList).map(
        (el, idx) => (
          <HomeLatestDataRow
            key={idx}
            isLoading={isLoading}
            head={
              <MuiLink
                component={Link}
                href={generatePath(RoutePaths.Transaction, {
                  hash: `${el?.hash}`,
                })}
                sx={LINK_PROPS}
              >
                {abbr(el?.hash ?? '')}
              </MuiLink>
            }
            subhead={time(el.block?.timestamp, { utc: true })?.fromNow}
            footer={t('transaction-list.from') + ':'}
            subfooter={<AvatarName address={el?.sender ?? ''} />}
          />
        ),
      )}
    </PreviewList>
  )

  return !isLoading && (!transactionList.length || isLoadingError) ? (
    <ContentWrapper>
      <NoData
        title={t('transaction-list.no-data-title')}
        subtitle={t('transaction-list.no-data-subtitle')}
        errorTitle={t('transaction-list.error-title')}
        errorSubtitle={t('transaction-list.error-subtitle')}
        isError={isLoadingError}
      />
    </ContentWrapper>
  ) : (
    list
  )
}
