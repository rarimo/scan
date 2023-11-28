'use client'

import { getConfirmationOperationVoteCount, getConfirmationOperationVotes } from '@/callers'
import { ContentBox, ContentSection } from '@/components/Content'
import { OperationVoteFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'

import OperationVoteList from '../Operation/OperationVoteList'

export default function ConfirmationOperationVotes({ indexes }: { indexes: string[] }) {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: count,
    isLoading: isLoadingCount,
    isLoadingError: isLoadingCountError,
  } = useLoading<number>(0, () => getConfirmationOperationVoteCount(indexes))

  const { data, isLoading, isLoadingError } = useLoading<OperationVoteFragment[]>(
    [],
    () => getConfirmationOperationVotes({ indexes, limit, offset }),
    {
      loadArgs: [limit, offset],
    },
  )
  return (
    <ContentSection title={t('operation-vote-list.table-lbl')}>
      <ContentBox>
        <OperationVoteList
          limit={limit}
          offset={offset}
          list={data}
          count={count}
          isLoading={isLoading || isLoadingCount}
          isLoadingError={isLoadingError || isLoadingCountError}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          isMinHeighted={false}
        />
      </ContentBox>
    </ContentSection>
  )
}
