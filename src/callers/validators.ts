import {
  AuthorizationTypes,
  BondStatus,
  Coin,
  DelegationResponse,
  GrantAuthorization,
  MessageTypeUrls,
} from '@rarimo/client'
import { isUndefined } from 'lodash-es'

import { getClient } from '@/client'
import { CONFIG } from '@/config'
import {
  apolloClient,
  GetValidatorBase,
  GetValidatorBaseQuery,
  GetValidatorByAddress,
  GetValidatorByAddressQuery,
  GetValidatorByConsensusAddress,
  GetValidatorByConsensusAddressQuery,
  GetValidatorCommissionAmount,
  GetValidatorCommissionAmountQuery,
  GetValidatorCount,
  GetValidatorCountQuery,
  GetValidatorDelegationList,
  GetValidatorDelegationListQuery,
  GetValidatorRedelegationList,
  GetValidatorRedelegationListQuery,
  GetValidatorUnbondingDelegationList,
  GetValidatorUnbondingDelegationListQuery,
} from '@/graphql'
import { ErrorHandler } from '@/helpers'
import { SortOrder, ValidatorListColumnIds, ValidatorListSortBy } from '@/types'

type OnSubmitHandler = (args: { address: string; amount: string }) => Promise<void>
type ErrorWithStatusCode = { response: { status: number } }

const createValidatorWhere = (status?: number, jailed?: boolean) => {
  const where = {
    validator_statuses: {
      status: {},
      jailed: {},
    },
  }

  if (status) {
    where.validator_statuses.status =
      status === BondStatus.Bonded ? { _eq: status } : { _neq: BondStatus.Bonded }
  }
  if (!isUndefined(jailed)) {
    where.validator_statuses.jailed = { _eq: jailed }
  }

  return where
}

// @ts-ignore
const createValidatorOrderBy = (orderBy?: ValidatorListSortBy, order?: SortOrder) => {
  if (!orderBy) return {}

  if (orderBy === ValidatorListColumnIds.VotingPower) {
    return {
      validator_voting_powers_aggregate: { max: { voting_power: order } },
    }
  }

  if (orderBy === ValidatorListColumnIds.Commission) {
    return { validator_commissions_aggregate: { max: { commission: order } } }
  }
}

export const getValidatorList = async ({
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
  status,
  jailed,
  order,
  orderBy,
}: {
  limit?: number
  offset?: number
  status?: number
  jailed?: boolean
  order?: SortOrder
  orderBy?: ValidatorListSortBy
}): Promise<GetValidatorBaseQuery> => {
  const { data } = await apolloClient.query<GetValidatorBaseQuery>({
    query: GetValidatorBase,
    fetchPolicy: 'network-only',
    variables: {
      limit,
      offset,
      where: createValidatorWhere(status, jailed),
      order_by: createValidatorOrderBy(orderBy, order),
    },
  })

  return data
}

export const getValidatorCount = async ({
  status,
  jailed,
}: {
  status?: number
  jailed?: boolean
}): Promise<number> => {
  const { data } = await apolloClient.query<GetValidatorCountQuery>({
    query: GetValidatorCount,
    fetchPolicy: 'network-only',
    variables: {
      where: createValidatorWhere(status, jailed),
    },
  })

  return data?.validator_aggregate.aggregate?.count ?? 0
}

export const getValidatorByAddress = async (
  address: string,
): Promise<GetValidatorByAddressQuery> => {
  const { data } = await apolloClient.query<GetValidatorByAddressQuery>({
    query: GetValidatorByAddress,
    fetchPolicy: 'network-only',
    variables: { address },
  })

  return data
}

export const getValidatorByConsensusAddress = async (
  address: string,
): Promise<GetValidatorByConsensusAddressQuery> => {
  const { data } = await apolloClient.query<GetValidatorByConsensusAddressQuery>({
    query: GetValidatorByConsensusAddress,
    fetchPolicy: 'network-only',
    variables: { address },
  })

  return data
}

export const getValidatorDelegationsList = async ({
  operator,
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
}: {
  operator: string
  limit?: number
  offset?: number
}): Promise<GetValidatorDelegationListQuery> => {
  const { data } = await apolloClient.query<GetValidatorDelegationListQuery>({
    query: GetValidatorDelegationList,
    fetchPolicy: 'network-only',
    variables: {
      limit,
      offset,
      operator,
    },
  })

  return data
}

export const getValidatorRedelegationsList = async ({
  operator,
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
}: {
  operator: string
  limit?: number
  offset?: number
}): Promise<GetValidatorRedelegationListQuery> => {
  const { data } = await apolloClient.query<GetValidatorRedelegationListQuery>({
    query: GetValidatorRedelegationList,
    fetchPolicy: 'network-only',
    variables: {
      limit,
      offset,
      operator,
    },
  })

  return data
}

export const getValidatorUnbondingDelegationsList = async ({
  operator,
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
}: {
  operator: string
  limit?: number
  offset?: number
}): Promise<GetValidatorUnbondingDelegationListQuery> => {
  const { data } = await apolloClient.query<GetValidatorUnbondingDelegationListQuery>({
    query: GetValidatorUnbondingDelegationList,
    fetchPolicy: 'network-only',
    variables: {
      limit,
      offset,
      operator,
    },
  })

  return data
}

export const getValidatorCommissionAmount = async ({
  address,
}: {
  address: string
}): Promise<GetValidatorCommissionAmountQuery> => {
  const { data } = await apolloClient.query<GetValidatorCommissionAmountQuery>({
    query: GetValidatorCommissionAmount,
    fetchPolicy: 'network-only',
    variables: {
      address,
    },
  })

  return data.action_validator_commission_amount?.coins?.[0]?.amount
}

export const getValidatorDelegations = async (
  delegator: string,
  operator: string,
): Promise<DelegationResponse> => {
  let resp = {} as DelegationResponse
  try {
    resp = await getClient().query.getDelegation(delegator, operator)
  } catch (e) {
    const status = (e as ErrorWithStatusCode)?.response?.status
    if (status === 404 || status === 400 || status === 500) return resp
    throw e
  }
  return resp
}

export const getDelegationRewards = async (
  delegator: string,
  operator: string,
): Promise<Coin[]> => {
  let resp: Coin[] = []
  try {
    resp = await getClient().query.getDelegationRewards(delegator, operator)
  } catch (e) {
    const status = (e as ErrorWithStatusCode)?.response?.status
    if (status === 404 || status === 400 || status === 500) return resp
    throw e
  }
  return resp
}

export const withdrawDelegationReward = async (
  delegator: string,
  operator: string,
  amount: string,
  onSubmit: OnSubmitHandler,
) => {
  try {
    await getClient().tx.withdrawDelegatorReward(delegator, operator)
    await onSubmit({
      amount,
      address: delegator,
    })
  } catch (e) {
    ErrorHandler.process(e)
  }
}

export const withdrawValidatorCommission = async (address: string, onSubmit: OnSubmitHandler) => {
  try {
    const validatorCommissionAmount = await getValidatorCommissionAmount({
      address,
    })
    await getClient().tx.withdrawValidatorCommission(address)
    await onSubmit({
      amount: `${validatorCommissionAmount} ${CONFIG.DENOM}`,
      address,
    })
  } catch (e) {
    ErrorHandler.process(e)
  }
}

export const getGrants = async (grantee: string): Promise<GrantAuthorization[]> => {
  let resp: GrantAuthorization[] = []
  try {
    resp = await getClient().query.getGrantAuthorizationsByGrantee(grantee)
  } catch (e) {
    ErrorHandler.process(e)
  }
  return resp
}

export const filterGrantsByMessageType = (
  grants: GrantAuthorization[],
  types: MessageTypeUrls[],
): GrantAuthorization[] => {
  if (!grants.length) return []

  return grants.reduce<GrantAuthorization[]>((acc, grant) => {
    const auth = grant.authorization
    if (auth?.['@type'] !== AuthorizationTypes.GenericAuthorization) return acc
    if (types.includes(auth.msg as MessageTypeUrls)) {
      acc.push(grant)
    }

    return acc
  }, [])
}
