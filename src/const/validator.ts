import { ValidatorDelegationsFilters } from '@/types'

export const VALIDATOR_DELEGATIONS_FILTERS_MAP = {
  [ValidatorDelegationsFilters.Delegations]: 0,
  [ValidatorDelegationsFilters.Redelegations]: 1,
  [ValidatorDelegationsFilters.Unbonding]: 2,
}

export const VALIDATOR_DELEGATIONS_FILTERS_MAP_STRING = {
  0: ValidatorDelegationsFilters.Delegations,
  1: ValidatorDelegationsFilters.Redelegations,
  2: ValidatorDelegationsFilters.Unbonding,
}
