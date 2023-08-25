import { PublicKey } from '@rarimo/client'

import { CONFIG } from '@/config'
import {
  apolloClient,
  GetLatestTxAndBlocks,
  GetLatestTxAndBlocksQuery,
  GetTransactionByHash,
  GetTransactionByHashQuery,
  GetTransactionCount,
  GetTransactionCountQuery,
  GetTransactionList,
  GetTransactionListByBlock,
  GetTransactionListByBlockQuery,
  GetTransactionListQuery,
  TransactionFragment,
  TransactionListFragment,
} from '@/graphql'

const createWhereFilter = (sender: PublicKey | null, operator?: string) => {
  const exp = { signer_infos: {}, block: {} }

  if (sender) {
    exp.signer_infos = {
      _cast: {
        String: {
          _regex: sender?.key,
        },
      },
    }
  }

  if (operator) {
    exp.block = {
      validator: { validator_info: { operator_address: { _eq: operator } } },
    }
  }

  return exp
}

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

export const getTransactionsList = async ({
  limit = CONFIG.PAGE_LIMIT,
  offset = 0,
  operator,
  sender,
}: {
  limit?: number
  offset?: number
  sender?: PublicKey | null
  operator?: string
}): Promise<TransactionListFragment[]> => {
  const { data } = await apolloClient.query<GetTransactionListQuery>({
    query: GetTransactionList,
    fetchPolicy: 'network-only',
    variables: {
      limit,
      offset,
      where: createWhereFilter(sender ?? null, operator),
    },
  })
  return data?.transaction ?? []
}

export const getTransactionsListByBlock = async (
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
  blockHeight?: number | bigint,
): Promise<TransactionListFragment[]> => {
  const { data } = await apolloClient.query<GetTransactionListByBlockQuery>({
    query: GetTransactionListByBlock,
    fetchPolicy: 'network-only',
    variables: {
      limit,
      offset,
      blockHeight,
    },
  })
  return data?.transaction ?? []
}

export const getTransactionCount = async (args?: {
  sender?: PublicKey | null
  operator?: string
}): Promise<number> => {
  const { sender, operator } = args ?? {}
  const { data } = await apolloClient.query<GetTransactionCountQuery>({
    query: GetTransactionCount,
    fetchPolicy: 'network-only',
    variables: { where: createWhereFilter(sender || null, operator) },
  })

  return data?.transaction_aggregate.aggregate?.count ?? 0
}

export const getTransactionByHash = async (hash: string): Promise<TransactionFragment> => {
  const { data } = await apolloClient.query<GetTransactionByHashQuery>({
    query: GetTransactionByHash,
    fetchPolicy: 'network-only',
    variables: { hash: hash },
  })

  return data?.transaction[0]
}
