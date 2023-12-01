import { CONFIG } from '@/config'
import {
  getApollo,
  GetOracleBase,
  GetOracleBaseQuery,
  GetOracleByAddress,
  GetOracleByAddressQuery,
  GetOracleCount,
  GetOracleCountQuery,
  GetRarimocoreParams,
  GetRarimocoreParamsQuery,
  GetTssByAddress,
  GetTssByAddressQuery,
  GetTssCount,
  GetTssCountQuery,
  GetTssList,
  GetTssListQuery,
  OracleBaseFragment,
  OracleFragment,
  TssFragment,
  TssListFragment,
} from '@/graphql'

export const getRarimocoreParams = async () => {
  const { data } = await getApollo().query<GetRarimocoreParamsQuery>({
    query: GetRarimocoreParams,
    fetchPolicy: 'network-only',
  })
  return data
}

export const getTSSList = async (
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
): Promise<TssListFragment[]> => {
  const { data } = await getApollo().query<GetTssListQuery>({
    query: GetTssList,
    fetchPolicy: 'network-only',
    variables: { limit, offset },
  })

  return data?.parties ?? []
}

export const getTSSCount = async (): Promise<number> => {
  const { data } = await getApollo().query<GetTssCountQuery>({
    query: GetTssCount,
    fetchPolicy: 'network-only',
  })

  return data?.parties_aggregate.aggregate?.count ?? 0
}

export const getTSSByAddress = async (address: string): Promise<TssFragment> => {
  const { data } = await getApollo().query<GetTssByAddressQuery>({
    query: GetTssByAddress,
    fetchPolicy: 'network-only',
    variables: { address },
  })

  return data?.parties?.[0] as TssFragment
}

export const getOracleList = async (
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
): Promise<OracleBaseFragment[]> => {
  const { data } = await getApollo().query<GetOracleBaseQuery>({
    query: GetOracleBase,
    fetchPolicy: 'network-only',
    variables: { limit, offset },
  })

  return data?.oracle ?? []
}

export const getOracleCount = async (): Promise<number> => {
  const { data } = await getApollo().query<GetOracleCountQuery>({
    query: GetOracleCount,
    fetchPolicy: 'network-only',
  })

  return data?.oracle_aggregate.aggregate?.count ?? 0
}

export const getOracleByAddress = async (address: string): Promise<OracleFragment> => {
  const { data } = await getApollo().query<GetOracleByAddressQuery>({
    query: GetOracleByAddress,
    fetchPolicy: 'network-only',
    variables: { address },
  })

  return data?.oracle?.[0] as OracleFragment
}
