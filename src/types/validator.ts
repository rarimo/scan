import { Coin } from '@cosmjs/amino'

import { VALIDATOR_DELEGATIONS_FILTERS_MAP_STRING } from '@/const'

export enum ValidatorListColumnIds {
  Validator = 'validator',
  VotingPower = 'voting_power',
  Commission = 'commission',
  Condition = 'condition',
  Status = 'status',
}

export type ValidatorListSortBy =
  | ValidatorListColumnIds.VotingPower
  | ValidatorListColumnIds.Commission

export enum ValidatorDelegationsFilters {
  Delegations = 'delegations',
  Redelegations = 'redelegations',
  Unbonding = 'unbonding',
}

export type ValidatorDelegationsFiltersMapStringKey =
  keyof typeof VALIDATOR_DELEGATIONS_FILTERS_MAP_STRING

type ValidatorDelegationBase = {
  delegator_address: string
  validator_address: string
}

export type ValidatorDelegation = ValidatorDelegationBase & {
  coins: Coin[]
}

export type ValidatorEntry = {
  balance: string
  completion_time: string
  creation_height?: number
  initial_balance?: string
}

export type ValidatorRedelegation = {
  entries: ValidatorEntry[]
  validator_dst_address: string
  delegator_address: string
  validator_src_address: string
}

export type ValidatorUnbondingDelegation = ValidatorDelegationBase & {
  entries: ValidatorEntry[]
}
