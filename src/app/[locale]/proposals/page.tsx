import { Metadata } from 'next'

import { PageContainer, Proposals } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export const metadata: Metadata = {
  ...METADATA,
  title: craftPageTitle('Proposals'),
}

export default function ProposalsPage() {
  return (
    <PageContainer>
      <Proposals />
    </PageContainer>
  )
}
