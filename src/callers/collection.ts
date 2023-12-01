import { TokenType } from '@rarimo/client'

import { CONFIG } from '@/config'
import {
  apolloClient,
  Collection_Bool_Exp,
  CollectionBaseFragment,
  CollectionFragment,
  GetCollectionByIndex,
  GetCollectionByIndexQuery,
  GetCollectionCount,
  GetCollectionCountQuery,
  GetCollectionList,
  GetCollectionListQuery,
} from '@/graphql'

const createCollectionWhere = (tokenTypes: TokenType[]): Collection_Bool_Exp => {
  return {
    _or: tokenTypes.map(type => ({
      collection_data: { token_type: { _eq: type } },
    })),
  }
}

export const getCollectionList = async (
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
  filters: TokenType[] = [],
): Promise<CollectionBaseFragment[]> => {
  const { data } = await apolloClient.query<GetCollectionListQuery>({
    query: GetCollectionList,
    fetchPolicy: 'network-only',
    variables: { limit, offset, where: createCollectionWhere(filters) },
  })

  return data?.collection ?? []
}

export const getCollectionCount = async (filters: TokenType[] = []): Promise<number> => {
  const { data } = await apolloClient.query<GetCollectionCountQuery>({
    query: GetCollectionCount,
    fetchPolicy: 'network-only',
    variables: { where: createCollectionWhere(filters) },
  })

  return data?.collection_aggregate.aggregate?.count ?? 0
}

export const getCollectionByIndex = async (index: string): Promise<CollectionFragment> => {
  const { data } = await apolloClient.query<GetCollectionByIndexQuery>({
    query: GetCollectionByIndex,
    fetchPolicy: 'network-only',
    variables: { index },
  })

  return data.collection?.[0]
}
