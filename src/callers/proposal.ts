import { CONFIG } from '@/config'
import { VoteStates } from '@/enums'
import {
  getApollo,
  GetProposalBase,
  GetProposalBaseQuery,
  GetProposalById,
  GetProposalByIdQuery,
  GetProposalCount,
  GetProposalCountQuery,
  GetProposalDepositsById,
  GetProposalDepositsByIdQuery,
  GetProposalDepositsCountById,
  GetProposalDepositsCountByIdQuery,
  GetProposalVotesById,
  GetProposalVotesByIdQuery,
  GetProposalVotesCountById,
  GetProposalVotesCountByIdQuery,
  ProposalBaseFragment,
  ProposalDepositFragment,
  ProposalFragment,
  ProposalVoteFragment,
} from '@/graphql'

type UserVoteType = {
  vote: {
    options: {
      option: VoteStates
    }[]
  }
}

export const getProposalList = async (
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
): Promise<ProposalBaseFragment[]> => {
  const { data } = await getApollo().query<GetProposalBaseQuery>({
    query: GetProposalBase,
    fetchPolicy: 'network-only',
    variables: { limit, offset },
  })

  return data?.proposal ?? []
}

export const getProposalCount = async (): Promise<number> => {
  const { data } = await getApollo().query<GetProposalCountQuery>({
    query: GetProposalCount,
    fetchPolicy: 'network-only',
  })

  return data?.proposal_aggregate.aggregate?.count ?? 0
}

export const getProposalByID = async (id: string): Promise<ProposalFragment> => {
  const { data } = await getApollo().query<GetProposalByIdQuery>({
    query: GetProposalById,
    fetchPolicy: 'network-only',
    variables: { id: Number(id) },
  })

  return data?.proposal[0]
}

export const getProposalDepositsListByID = async (
  id: string,
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
): Promise<ProposalDepositFragment[]> => {
  const { data } = await getApollo().query<GetProposalDepositsByIdQuery>({
    query: GetProposalDepositsById,
    fetchPolicy: 'network-only',
    variables: { id: Number(id), limit, offset },
  })

  return data?.proposal?.[0].proposal_deposits ?? []
}

export const getProposalDepositsCountByID = async (id: string): Promise<number> => {
  const { data } = await getApollo().query<GetProposalDepositsCountByIdQuery>({
    query: GetProposalDepositsCountById,
    fetchPolicy: 'network-only',
    variables: { id: Number(id) },
  })

  return data?.proposal?.[0]?.proposal_deposits_aggregate.aggregate?.count ?? 0
}

export const getProposalVotesListByID = async (
  id: string,
  limit: number = CONFIG.PAGE_LIMIT,
  offset = 0,
): Promise<ProposalVoteFragment[]> => {
  const { data } = await getApollo().query<GetProposalVotesByIdQuery>({
    query: GetProposalVotesById,
    fetchPolicy: 'network-only',
    variables: { id: Number(id), limit, offset },
  })

  return data?.proposal?.[0].proposal_votes ?? []
}

export const getProposalVotesCountByID = async (id: string): Promise<number> => {
  const { data } = await getApollo().query<GetProposalVotesCountByIdQuery>({
    query: GetProposalVotesCountById,
    fetchPolicy: 'network-only',
    variables: { id: Number(id) },
  })

  return data?.proposal?.[0]?.proposal_votes_aggregate.aggregate?.count ?? 0
}

export const getUserVoteTypeFromProposal = async (
  proposalId: string | number,
  address: string,
): Promise<VoteStates> => {
  const response = await fetch(
    `${CONFIG.CHAIN_API_URL}/cosmos/gov/v1beta1/proposals/${proposalId}/votes/${address}`,
  )

  const { vote }: UserVoteType = await response.json()

  return vote.options[0].option
}
