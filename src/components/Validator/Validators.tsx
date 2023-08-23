'use client'

import { Box, Tab, Tabs, useTheme } from '@mui/material'
import { BondStatus } from '@rarimo/client'
import { useEffect, useMemo } from 'react'

import { getValidatorCount, getValidatorList } from '@/callers'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import ValidatorList from '@/components/Validator/ValidatorList'
import { GetValidatorBaseQuery } from '@/graphql'
import { useLoading, useTablePagination, useTabsFilter } from '@/hooks'
import { useI18n } from '@/locales/client'
import { ValidatorListSortBy } from '@/types'

enum Filters {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

const FILTERS_MAP = {
  [Filters.ACTIVE]: 0,
  [Filters.INACTIVE]: 1,
  [Filters.ALL]: 2,
}

export default function Validators() {
  const t = useI18n()
  const theme = useTheme()

  const {
    limit,
    offset,
    handleChangePage,
    handleChangeRowsPerPage,
    order,
    orderBy,
    setSort,
    setOffset,
  } = useTablePagination<ValidatorListSortBy>()

  const {
    data: validatorCount,
    isLoading: isLoadingValidatorCount,
    isLoadingError: isLoadingValidatorCountError,
    reload: reloadCount,
  } = useLoading<number>(0, () => getValidatorCount(filters))

  const {
    data: result,
    isLoading,
    isLoadingError,
    reload: reloadList,
  } = useLoading<GetValidatorBaseQuery>(
    {} as GetValidatorBaseQuery,
    () => getValidatorList({ limit, offset, order, orderBy, ...filters }),
    { loadArgs: [limit, offset] },
  )

  const { filter, handleFilterChange } = useTabsFilter({
    queryKey: 'status',
    defaultValue: FILTERS_MAP[Filters.ACTIVE],
    handler: async () => {
      setOffset(0)
      await reloadCount()
      await reloadList()
    },
  })

  const filters = useMemo(
    () =>
      ({
        [FILTERS_MAP[Filters.ACTIVE]]: {
          jailed: false,
          status: BondStatus.Bonded,
        },
        [FILTERS_MAP[Filters.INACTIVE]]: {
          jailed: true,
          status: -1,
        },
        [FILTERS_MAP[Filters.ALL]]: {},
      })[filter],

    [filter],
  )

  const tabs = [
    {
      label: t('validators.active-filter-lbl'),
      value: FILTERS_MAP[Filters.ACTIVE],
    },
    {
      label: t('validators.inactive-filter-lbl'),
      value: FILTERS_MAP[Filters.INACTIVE],
    },
    {
      label: t('validators.all-filter-lbl'),
      value: FILTERS_MAP[Filters.ALL],
    },
  ]

  useEffect(() => {
    reloadList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order])

  return (
    <ContentSection withBackButton title={t('validators.title')}>
      <ContentBox>
        <ContentWrapper>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', p: theme.spacing(0, 2) }}>
            <Tabs
              value={filter}
              onChange={handleFilterChange}
              aria-label={t('validators.tabs-lbl')}
              sx={{
                '& > .MuiTabs-scroller > .MuiTabs-flexContainer': {
                  height: 64,

                  '& > .MuiTab-root': {
                    textTransform: 'uppercase',
                  },
                },
              }}
            >
              {tabs.map((tab, idx) => (
                <Tab key={idx} value={tab.value} label={tab.label} />
              ))}
            </Tabs>
          </Box>
          <ValidatorList
            isLoading={isLoading || isLoadingValidatorCount}
            isLoadingError={isLoadingError || isLoadingValidatorCountError}
            limit={limit}
            slashingParams={result?.slashing_params?.[0]}
            stakingPool={result?.staking_pool?.[0]}
            offset={offset}
            order={order}
            orderBy={orderBy}
            list={result?.validator}
            count={validatorCount}
            setSort={setSort}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
