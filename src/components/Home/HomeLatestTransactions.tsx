'use client'

import { time } from '@distributedlab/tools'
import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { useMemo } from 'react'

import { AvatarName } from '@/components/Avatar/AvatarName'
import { HomeLatestDataRow } from '@/components/Home/HomeLatestDataRow'
import { NoDataRow } from '@/components/NoDataRow'
import { PreviewList } from '@/components/PreviewList'
import { RoutePaths } from '@/enums'
import { abbr, generatePath, parseAddress } from '@/helpers'
import { useI18n } from '@/locales/client'
import { TransactionBaseFragment } from '@/types'

const LINK_PROPS = {
  display: 'inline',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export const HomeLatestTransactions = ({
  isLoading,
  isLoadingError,
  transactionList,
  limitRow,
}: {
  isLoadingError: boolean
  isLoading: boolean
  transactionList: TransactionBaseFragment[]
  limitRow: number
}) => {
  const t = useI18n()

  const list = useMemo(() => {
    return transactionList.map(i => {
      return {
        ...i,
        sender: parseAddress(i),
      }
    })
  }, [transactionList])

  return (
    <PreviewList
      actions={{
        label: t('transactions-list.view-all'),
        link: RoutePaths.Transactions,
      }}
      title={t('transactions-list.title')}
      isError={isLoadingError}
      isLoading={isLoading}
    >
      <>
        {!isLoading && (!transactionList.length || isLoadingError) && (
          <NoDataRow message={t('transactions-list.no-data-msg')} error={isLoadingError} />
        )}
        {(isLoading ? new Array(limitRow).fill({} as TransactionBaseFragment) : list).map(
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
              footer={t('transactions-list.from') + ':'}
              subfooter={<AvatarName address={el?.sender ?? ''} />}
            />
          ),
        )}
      </>
    </PreviewList>
  )
}
