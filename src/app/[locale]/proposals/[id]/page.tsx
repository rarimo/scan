import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProposalByID } from '@/callers'
import { PageContainer, Proposal, ProposalDeposits, ProposalVotes } from '@/components'
import { craftPageTitle, METADATA } from '@/config'
import { ProposalFragment } from '@/graphql'
import { ensureNotFoundNumber, getServerSideProps } from '@/helpers'

const getProposal = async (id: string) => {
  return getServerSideProps<ProposalFragment>(() => {
    ensureNotFoundNumber(id)
    return getProposalByID(id)
  })
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Proposal #${params.id} Details`),
  }
}

export default async function ProposalPage({ params: { id } }: { params: { id: string } }) {
  const { isNotFound } = await getProposal(id)
  if (isNotFound) notFound()

  return (
    <PageContainer>
      <Proposal id={id} />
      <ProposalDeposits id={id} />
      <ProposalVotes id={id} />
    </PageContainer>
  )
}
