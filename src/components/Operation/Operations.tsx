'use client'

import { getOperationCount, getOperationList } from '@/callers'
import { OperationFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'

import { ContentBox, ContentSection } from '../Content'
import OperationList from './OperationList'

export default function Operations() {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: count,
    isLoading: isLoadingCount,
    isLoadingError: isLoadingCountError,
  } = useLoading<number>(0, getOperationCount)

  const { data, isLoading, isLoadingError } = useLoading<OperationFragment[]>(
    [],
    () => getOperationList(limit, offset),
    {
      loadArgs: [limit, offset],
    },
  )

  return (
    <ContentSection withBackButton title={t('operation-list.table-lbl')}>
      <ContentBox>
        <OperationList
          limit={limit}
          offset={offset}
          list={data}
          count={count}
          isLoading={isLoading || isLoadingCount}
          isLoadingError={isLoadingError || isLoadingCountError}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentBox>
    </ContentSection>
  )
}
