import { Metadata } from 'next'

import { Oracles, PageContainer } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata('Oracles')
}

export default function OraclesPage() {
  return (
    <PageContainer>
      <Oracles />
    </PageContainer>
  )
}
