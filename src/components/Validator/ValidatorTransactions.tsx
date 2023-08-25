import { getTransactionCount, getTransactionsList } from '@/callers'
import { ContentBox, ContentSection } from '@/components/Content'
import TransactionList from '@/components/Transaction/TransactionList'
import { TransactionListFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function ValidatorTransactions({ operator }: { operator: string }) {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination('txs')

  const {
    data: transactionCount,
    isLoading: isLoadingTransactionCount,
    isLoadingError: isLoadingTransactionCountError,
  } = useLoading<number>(0, () => getTransactionCount({ operator }))

  const {
    data: transactionList,
    isLoading,
    isLoadingError,
  } = useLoading<TransactionListFragment[]>(
    [],
    () => getTransactionsList({ limit, offset, operator }),
    { loadArgs: [limit, offset] },
  )

  return (
    <ContentSection title={t('validator-transactions.title-lbl')}>
      <ContentBox>
        <TransactionList
          isMinHeighted={false}
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
