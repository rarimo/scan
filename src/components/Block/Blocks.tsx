'use client'

import { getBlockCount, getBlocksList } from '@/callers'
import { BlockListFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'

import { ContentBox, ContentSection } from '../Content'
import BlocksList from './BlocksList'

export default function Blocks() {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: blocksCount,
    isLoading: isLoadingBlockCount,
    isLoadingError: isLoadingBlockCountError,
  } = useLoading<number>(0, getBlockCount)

  const { data, isLoading, isLoadingError } = useLoading<BlockListFragment[]>(
    [],
    () => getBlocksList({ limit, offset }),
    {
      loadArgs: [limit, offset],
    },
  )

  return (
    <ContentSection withBackButton title={t('block-list.table-lbl')}>
      <ContentBox>
        <BlocksList
          limit={limit}
          offset={offset}
          list={data}
          count={blocksCount}
          isLoading={isLoading || isLoadingBlockCount}
          isLoadingError={isLoadingError || isLoadingBlockCountError}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentBox>
    </ContentSection>
  )
}
