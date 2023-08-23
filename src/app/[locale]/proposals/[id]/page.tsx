import { Metadata } from 'next'

import { PageContainer, Proposal, ProposalDeposits, ProposalVotes } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Proposal #${params.id} Details`),
  }
}

export default function ProposalPage({ params: { id } }: { params: { id: string } }) {
  return (
    <PageContainer>
      <Proposal id={id} />
      <ProposalDeposits id={id} />
      <ProposalVotes id={id} />
    </PageContainer>
  )
}
