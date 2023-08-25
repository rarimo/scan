import { getBlockCount, getBlocksList } from '@/callers'
import BlocksList from '@/components/Block/BlocksList'
import { ContentBox, ContentSection } from '@/components/Content'
import { BlockListFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function ValidatorBlocks({ operator }: { operator: string }) {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination('blocks')

  const {
    data: blocksCount,
    isLoading: isLoadingBlockCount,
    isLoadingError: isLoadingBlockCountError,
  } = useLoading<number>(0, () => getBlockCount({ operator }))

  const { data, isLoading, isLoadingError } = useLoading<BlockListFragment[]>(
    [],
    () => getBlocksList({ limit, offset, operator }),
    { loadArgs: [limit, offset] },
  )

  return (
    <ContentSection title={t('validator-blocks.title-lbl')}>
      <ContentBox>
        <BlocksList
          isMinHeighted={false}
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
