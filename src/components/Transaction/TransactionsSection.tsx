'use client'

import { getTransactionCount, getTransactionsList } from '@/callers'
import { ContentBox, ContentSection } from '@/components/Content'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TransactionListFragment } from '@/types'

import { TransactionList } from './TransactionList'

export const TransactionsSection = () => {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: transactionCount,
    isLoading: isLoadingTransactionCount,
    isLoadingError: isLoadingTransactionCountError,
  } = useLoading<number>(0, getTransactionCount)

  const {
    data: transactionList,
    isLoading,
    isLoadingError,
  } = useLoading<TransactionListFragment[]>([], () => getTransactionsList({ limit, offset }), {
    loadArgs: [limit, offset],
  })

  return (
    <ContentSection withBackButton title={t('transactions-list.table-lbl')}>
      <ContentBox>
        <TransactionList
          limit={limit}
          offset={offset}
          list={transactionList}
          count={transactionCount}
          isLoading={isLoading || isLoadingTransactionCount}
          isLoadingError={isLoadingError || isLoadingTransactionCountError}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentBox>
    </ContentSection>
  )
}
