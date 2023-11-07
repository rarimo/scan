'use client'

import { Stack } from '@mui/material'

import { getTSSCount, getTSSList } from '@/callers'
import { ContentSection } from '@/components/Content'
import TSSList from '@/components/TSS/TSSList'
import TSSState from '@/components/TSS/TSSState'
import { TssListFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function TSSs() {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: tssCount,
    isLoading: isLoadingTSSCount,
    isLoadingError: isLoadingTSSCountError,
  } = useLoading<number>(0, getTSSCount)

  const { data, isLoading, isLoadingError } = useLoading<TssListFragment[]>(
    [],
    () => getTSSList(limit, offset),
    {
      loadArgs: [limit, offset],
    },
  )

  return (
    <ContentSection withBackButton title={t('tsss.table-lbl')}>
      <Stack spacing={4}>
        <TSSState />
        <TSSList
          limit={limit}
          offset={offset}
          list={data}
          count={tssCount}
          isLoading={isLoading || isLoadingTSSCount}
          isLoadingError={isLoadingError || isLoadingTSSCountError}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Stack>
    </ContentSection>
  )
}
