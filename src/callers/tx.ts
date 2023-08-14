import { apolloClient } from '@/graphql'
import { GetLatestTxAndBlocks, GetLatestTxAndBlocksQuery } from '@/types'

export const getLatestTxAndBlocks = async (
  limit = 5,
  offset = 0,
): Promise<GetLatestTxAndBlocksQuery> => {
  const { data } = await apolloClient.query<GetLatestTxAndBlocksQuery>({
    query: GetLatestTxAndBlocks,
    fetchPolicy: 'network-only',
    variables: { limit, offset },
  })
  return data ?? {}
}
