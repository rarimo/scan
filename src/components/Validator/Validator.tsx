'use client'

import { useCallback, useEffect } from 'react'

import {
  getValidatorDelegationsList,
  getValidatorRedelegationsList,
  getValidatorUnbondingDelegationsList,
} from '@/callers'
import ValidatorBlocks from '@/components/Validator/ValidatorBlocks'
import ValidatorDelegations from '@/components/Validator/ValidatorDelegations'
import ValidatorDetails from '@/components/Validator/ValidatorDetails'
import ValidatorTransactions from '@/components/Validator/ValidatorTransactions'
import {
  VALIDATOR_DELEGATIONS_FILTERS_MAP,
  VALIDATOR_DELEGATIONS_FILTERS_MAP_STRING,
} from '@/const'
import {
  GetValidatorDelegationListQuery,
  GetValidatorRedelegationListQuery,
  GetValidatorUnbondingDelegationListQuery,
} from '@/graphql'
import { useLoading, useTablePagination, useTabsFilter } from '@/hooks'
import { ValidatorDelegationsFilters, ValidatorDelegationsFiltersMapStringKey } from '@/types'

export default function Validator({ operator }: { operator: string }) {
  const { limit, offset, handleChangePage, handleChangeRowsPerPage, setOffset, setTableKey } =
    useTablePagination()

  const { filter, handleFilterChange } = useTabsFilter({
    queryKey: 'delegation_type',
    defaultValue: VALIDATOR_DELEGATIONS_FILTERS_MAP[ValidatorDelegationsFilters.Delegations],
    handler: async () => {
      setOffset(0)
      await reload()
    },
  })

  const {
    data: delegations,
    isLoading: isLoadingDelegationsLoading,
    isLoadingError: isLoadingDelegationsError,
    reload,
  } = useLoading<
    | GetValidatorDelegationListQuery
    | GetValidatorRedelegationListQuery
    | GetValidatorUnbondingDelegationListQuery
  >(
    {} as GetValidatorDelegationListQuery,
    () =>
      ({
        [ValidatorDelegationsFilters.Delegations]: () =>
          getValidatorDelegationsList({
            operator,
            limit,
            offset,
          }),
        [ValidatorDelegationsFilters.Redelegations]: () =>
          getValidatorRedelegationsList({
            operator,
            limit,
            offset,
          }),
        [ValidatorDelegationsFilters.Unbonding]: () =>
          getValidatorUnbondingDelegationsList({
            operator,
            limit,
            offset,
          }),
      })[
        VALIDATOR_DELEGATIONS_FILTERS_MAP_STRING[filter as ValidatorDelegationsFiltersMapStringKey]
      ](),

    { loadArgs: [limit, offset] },
  )

  const setKey = useCallback(() => {
    setTableKey(
      VALIDATOR_DELEGATIONS_FILTERS_MAP_STRING[filter as ValidatorDelegationsFiltersMapStringKey],
    )
  }, [filter, setTableKey])

  useEffect(() => {
    setKey()
  }, [filter, setKey, setTableKey])

  useEffect(() => {
    setKey()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ValidatorDetails operator={operator} reload={reload} />
      <ValidatorDelegations
        data={delegations}
        filter={filter}
        limit={limit}
        offset={offset}
        isLoading={isLoadingDelegationsLoading}
        isLoadingError={isLoadingDelegationsError}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleFilterChange={handleFilterChange}
      />
      <ValidatorTransactions operator={operator} />
      <ValidatorBlocks operator={operator} />
    </>
  )
}
