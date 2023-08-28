import { Metadata } from 'next'

import { PageContainer, Proposals } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata(`Proposals`)
}

export default function ProposalsPage() {
  return (
    <PageContainer>
      <Proposals />
    </PageContainer>
  )
}
