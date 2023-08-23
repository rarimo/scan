import { CONFIG } from '@/config'
import {
  apolloClient,
  BlockFragment,
  BlockListFragment,
  GetBlockByHeight,
  GetBlockByHeightQuery,
  GetBlockCount,
  GetBlockCountQuery,
  GetBlockList,
  GetBlockListQuery,
} from '@/graphql'

const createWhereFilter = (operator?: string) => {
  const exp = { validator: {} }

  if (operator) {
    exp.validator = { validator_info: { operator_address: { _eq: operator } } }
  }

  return exp
}

export const getBlocksList = async ({
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
  operator,
}: {
  operator?: string
  limit?: number
  offset?: number
}): Promise<BlockListFragment[]> => {
  const { data } = await apolloClient.query<GetBlockListQuery>({
    query: GetBlockList,
    fetchPolicy: 'network-only',
    variables: { limit, offset, where: createWhereFilter(operator) },
  })
  return data?.block ?? []
}

export const getBlockCount = async (args?: { operator?: string }): Promise<number> => {
  const { data } = await apolloClient.query<GetBlockCountQuery>({
    query: GetBlockCount,
    fetchPolicy: 'network-only',
    variables: { where: createWhereFilter(args?.operator) },
  })

  return data?.block_aggregate.aggregate?.count ?? 0
}

export const getBlockByHeight = async (height: number): Promise<BlockFragment> => {
  const { data } = await apolloClient.query<GetBlockByHeightQuery>({
    query: GetBlockByHeight,
    fetchPolicy: 'network-only',
    variables: { height: height },
  })

  return data?.block[0] ?? []
}
