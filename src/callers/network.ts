import { CONFIG } from '@/config'
import {
  apolloClient,
  GetNetworkByName,
  GetNetworkByNameQuery,
  GetNetworkCount,
  GetNetworkCountQuery,
  GetNetworkList,
  GetNetworkListQuery,
  NetworkFragment,
} from '@/graphql'

export const getNetworkList = async (
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
): Promise<NetworkFragment[]> => {
  const { data } = await apolloClient.query<GetNetworkListQuery>({
    query: GetNetworkList,
    fetchPolicy: 'network-only',
    variables: { limit, offset },
  })

  return data?.network ?? []
}

export const getNetworkCount = async (): Promise<number> => {
  const { data } = await apolloClient.query<GetNetworkCountQuery>({
    query: GetNetworkCount,
    fetchPolicy: 'network-only',
  })

  return data?.network_aggregate.aggregate?.count ?? 0
}

export const getNetworkByName = async (name: string): Promise<NetworkFragment> => {
  const { data } = await apolloClient.query<GetNetworkByNameQuery>({
    query: GetNetworkByName,
    fetchPolicy: 'network-only',
    variables: { name },
  })

  return data?.network?.[0]
}
