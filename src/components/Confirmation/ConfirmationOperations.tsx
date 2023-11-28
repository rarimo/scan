'use client'

import { getConfirmationOperationList } from '@/callers'
import { OperationFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'

import { ContentBox, ContentSection } from '../Content'
import OperationList from '../Operation/OperationList'

export default function ConfirmationOperations({ indexes }: { indexes: string[] }) {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const { data, isLoading, isLoadingError } = useLoading<OperationFragment[]>(
    [],
    () => getConfirmationOperationList({ limit, offset, indexes }),
    {
      loadArgs: [limit, offset],
    },
  )

  return (
    <ContentSection title={t('operation-list.table-lbl')}>
      <ContentBox>
        <OperationList
          limit={limit}
          offset={offset}
          list={data}
          count={indexes.length}
          isLoading={isLoading}
          isLoadingError={isLoadingError}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          isMinHeighted={false}
        />
      </ContentBox>
    </ContentSection>
  )
}
