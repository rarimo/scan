import { CONFIG } from '@/config'
import {
  apolloClient,
  ConfirmationBaseFragment,
  ConfirmationFragment,
  GetConfirmationByRoot,
  GetConfirmationByRootQuery,
  GetConfirmationCount,
  GetConfirmationCountQuery,
  GetConfirmationList,
  GetConfirmationListQuery,
  GetConfirmationOperationList,
  GetConfirmationOperationListQuery,
  GetConfirmationOperationVoteCount,
  GetConfirmationOperationVoteCountQuery,
  GetConfirmationOperationVoteList,
  GetConfirmationOperationVoteListQuery,
  Operation_Bool_Exp,
  OperationFragment,
  OperationVoteFragment,
  Vote_Bool_Exp,
} from '@/graphql'

const buildOperationWhere = (indexes: string[]): Operation_Bool_Exp => {
  const where: Operation_Bool_Exp = {}
  if (!indexes.length) return where
  where._or = indexes.map(index => ({ index: { _eq: index } }))
  return where
}

const buildVoteWhere = (indexes: string[]): Vote_Bool_Exp => {
  const where: Vote_Bool_Exp = {}
  if (!indexes.length) return where
  where._or = indexes.map(index => ({ operation: { _eq: index } }))
  return where
}

export const getConfirmationList = async (
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
): Promise<ConfirmationBaseFragment[]> => {
  const { data } = await apolloClient.query<GetConfirmationListQuery>({
    query: GetConfirmationList,
    fetchPolicy: 'network-only',
    variables: { limit, offset },
  })

  return data?.confirmation ?? []
}

export const getConfirmationCount = async (): Promise<number> => {
  const { data } = await apolloClient.query<GetConfirmationCountQuery>({
    query: GetConfirmationCount,
    fetchPolicy: 'network-only',
  })

  return data?.confirmation_aggregate.aggregate?.count ?? 0
}

export const getConfirmationByRoot = async (root: string): Promise<ConfirmationFragment> => {
  const { data } = await apolloClient.query<GetConfirmationByRootQuery>({
    query: GetConfirmationByRoot,
    fetchPolicy: 'network-only',
    variables: { root },
  })

  return data?.confirmation?.[0]
}

export const getConfirmationOperationList = async ({
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
  indexes,
}: {
  limit: number
  offset: number
  indexes: string[]
}): Promise<OperationFragment[]> => {
  const { data } = await apolloClient.query<GetConfirmationOperationListQuery>({
    query: GetConfirmationOperationList,
    fetchPolicy: 'network-only',
    variables: { limit, offset, where: buildOperationWhere(indexes) },
  })

  return data?.operation ?? []
}

export const getConfirmationOperationVotes = async ({
  indexes,
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
}: {
  indexes: string[]
  limit: number
  offset: number
}): Promise<OperationVoteFragment[]> => {
  const { data } = await apolloClient.query<GetConfirmationOperationVoteListQuery>({
    query: GetConfirmationOperationVoteList,
    fetchPolicy: 'network-only',
    variables: { where: buildVoteWhere(indexes), limit, offset },
  })

  return data?.vote ?? []
}

export const getConfirmationOperationVoteCount = async (operations: string[]): Promise<number> => {
  const { data } = await apolloClient.query<GetConfirmationOperationVoteCountQuery>({
    query: GetConfirmationOperationVoteCount,
    fetchPolicy: 'network-only',
    variables: { where: buildVoteWhere(operations) },
  })

  return data?.vote_aggregate?.aggregate?.count ?? 0
}
