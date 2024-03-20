import { PublicKey } from '@rarimo/client'

import { CONFIG } from '@/config'
import {
  getApollo,
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

 const escapedString = sender?.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
 const regex = new RegExp(escapedString!).toString()
  
  // Remove the first and last character of the regex string to remove the / at the start and end
  const regexString = regex.substring(1, regex.length - 1)

  if (sender) {
    exp.signer_infos = {
      _cast: {
        String: {
          _regex: regexString,
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
  const { data } = await getApollo().query<GetLatestTxAndBlocksQuery>({
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
  const { data } = await getApollo().query<GetTransactionListQuery>({
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
  const { data } = await getApollo().query<GetTransactionListByBlockQuery>({
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
  const { data } = await getApollo().query<GetTransactionCountQuery>({
    query: GetTransactionCount,
    fetchPolicy: 'network-only',
    variables: { where: createWhereFilter(sender || null, operator) },
  })

  return data?.transaction_aggregate.aggregate?.count ?? 0
}

export const getTransactionByHash = async (hash: string): Promise<TransactionFragment> => {
  const { data } = await getApollo().query<GetTransactionByHashQuery>({
    query: GetTransactionByHash,
    fetchPolicy: 'network-only',
    variables: { hash: hash },
  })

  return data?.transaction[0]
}
