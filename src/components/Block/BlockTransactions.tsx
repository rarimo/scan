import { getTransactionsListByBlock } from '@/callers'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TransactionListFragment } from '@/types'

import { ContentBox, ContentSection } from '../Content'
import { TransactionList } from '../Transaction'

export const BlockTransactions = ({
  blockHeight,
  isBlockLoading,
  isBlockLoadingError,
  amountTX,
}: {
  blockHeight?: number | bigint
  amountTX: number
  isBlockLoading: boolean
  isBlockLoadingError: boolean
}) => {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: transactionList,
    isLoading,
    isLoadingError,
  } = useLoading<TransactionListFragment[]>(
    [],
    () => getTransactionsListByBlock(limit, offset, blockHeight),
    { loadArgs: [limit, offset] },
  )

  return (
    <ContentSection title={t('block-transactions.title-lbl')}>
      <ContentBox>
        <TransactionList
          limit={limit}
          offset={offset}
          list={transactionList}
          count={amountTX}
          isLoading={isLoading || isBlockLoading}
          isLoadingError={isLoadingError || isBlockLoadingError}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentBox>
    </ContentSection>
  )
}
