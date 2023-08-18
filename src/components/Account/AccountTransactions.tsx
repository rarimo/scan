'use client'

import { PublicKey } from '@rarimo/client'

import { getTransactionCount, getTransactionsList } from '@/callers'
import { ContentBox, ContentSection } from '@/components/Content'
import { TransactionList } from '@/components/Transaction'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TransactionListFragment } from '@/types'

export const AccountTransactions = ({ sender }: { sender: PublicKey }) => {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: transactionCount,
    isLoading: isLoadingTransactionCount,
    isLoadingError: isLoadingTransactionCountError,
  } = useLoading<number>(0, () => getTransactionCount({ sender }))

  const {
    data: transactionList,
    isLoading,
    isLoadingError,
  } = useLoading<TransactionListFragment[]>(
    [],
    () => getTransactionsList({ limit, offset, sender }),
    { loadArgs: [limit, offset] },
  )

  return (
    <ContentSection title={t('account-transactions.title-lbl')}>
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
