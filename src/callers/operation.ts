import { CONFIG } from '@/config'
import {
  getApollo,
  GetOperationByIndex,
  GetOperationByIndexQuery,
  GetOperationCount,
  GetOperationCountQuery,
  GetOperationList,
  GetOperationListQuery,
  GetOperationVoteCount,
  GetOperationVoteCountQuery,
  GetOperationVoteList,
  GetOperationVoteListQuery,
  OperationFragment,
  OperationVoteFragment,
} from '@/graphql'

export const getOperationList = async (
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
): Promise<OperationFragment[]> => {
  const { data } = await getApollo().query<GetOperationListQuery>({
    query: GetOperationList,
    fetchPolicy: 'network-only',
    variables: { limit, offset },
  })

  return data?.operation ?? []
}

export const getOperationCount = async (): Promise<number> => {
  const { data } = await getApollo().query<GetOperationCountQuery>({
    query: GetOperationCount,
    fetchPolicy: 'network-only',
  })

  return data?.operation_aggregate.aggregate?.count ?? 0
}

export const getOperationByIndex = async (index: string): Promise<GetOperationByIndexQuery> => {
  const { data } = await getApollo().query<GetOperationByIndexQuery>({
    query: GetOperationByIndex,
    fetchPolicy: 'network-only',
    variables: { index },
  })

  return data
}

export const getOperationVotes = async ({
  operation,
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
}: {
  operation: string
  limit: number
  offset: number
}): Promise<OperationVoteFragment[]> => {
  const { data } = await getApollo().query<GetOperationVoteListQuery>({
    query: GetOperationVoteList,
    fetchPolicy: 'network-only',
    variables: { operation, limit, offset },
  })

  return data?.vote ?? []
}

export const getOperationVoteCount = async (operation: string): Promise<number> => {
  const { data } = await getApollo().query<GetOperationVoteCountQuery>({
    query: GetOperationVoteCount,
    fetchPolicy: 'network-only',
    variables: { operation },
  })

  return data?.vote_aggregate?.aggregate?.count ?? 0
}
