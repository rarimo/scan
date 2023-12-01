'use client'

import { Box, Tab, Tabs, useTheme } from '@mui/material'
import { TokenType } from '@rarimo/client'
import { useMemo } from 'react'

import { getCollectionCount, getCollectionList } from '@/callers'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import { CollectionBaseFragment } from '@/graphql'
import { useLoading, useTablePagination, useTabsFilter } from '@/hooks'
import { useI18n } from '@/locales/client'

import SupportedTokenList from './SupportedTokenList'

enum Filters {
  FT = 'ft',
  NFT = 'nft',
}

const FILTERS_MAP = {
  [Filters.FT]: 0,
  [Filters.NFT]: 1,
}

export default function SupportedTokens() {
  const t = useI18n()
  const theme = useTheme()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage, setOffset } =
    useTablePagination()

  const {
    data: count,
    isLoading: isLoadingCount,
    isLoadingError: isLoadingCountError,
    reload: reloadCount,
  } = useLoading<number>(0, () => getCollectionCount(filters))

  const {
    data: list,
    isLoading,
    isLoadingError,
    reload: reloadList,
  } = useLoading<CollectionBaseFragment[]>(
    [] as CollectionBaseFragment[],
    () => getCollectionList(limit, offset, filters),
    { loadArgs: [limit, offset] },
  )

  const { filter, handleFilterChange } = useTabsFilter({
    queryKey: 'type',
    defaultValue: FILTERS_MAP[Filters.FT],
    handler: async () => {
      setOffset(0)
      await reloadCount()
      await reloadList()
    },
  })

  const filters = useMemo(
    () =>
      ({
        [FILTERS_MAP[Filters.FT]]: [
          TokenType.Native,
          TokenType.Erc20,
          TokenType.NearFt,
          TokenType.MetaplexFt,
        ],
        [FILTERS_MAP[Filters.NFT]]: [
          TokenType.Erc721,
          TokenType.Erc1155,
          TokenType.NearNft,
          TokenType.MetaplexNft,
        ],
      })[filter],

    [filter],
  )

  const tabs = [
    {
      label: t('supported-tokens.ft-filter-lbl'),
      value: FILTERS_MAP[Filters.FT],
    },
    {
      label: t('supported-tokens.nft-filter-lbl'),
      value: FILTERS_MAP[Filters.NFT],
    },
  ]

  return (
    <ContentSection withBackButton title={t('supported-tokens.table-lbl')}>
      <ContentBox>
        <ContentWrapper>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', p: theme.spacing(0, 2) }}>
            <Tabs value={filter} onChange={handleFilterChange}>
              {tabs.map((tab, idx) => (
                <Tab key={idx} value={tab.value} label={tab.label} />
              ))}
            </Tabs>
          </Box>
          <SupportedTokenList
            isLoading={isLoading || isLoadingCount}
            isLoadingError={isLoadingError || isLoadingCountError}
            limit={limit}
            offset={offset}
            list={list}
            count={count}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
