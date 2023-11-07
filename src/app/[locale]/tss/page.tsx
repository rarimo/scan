import { Metadata } from 'next'

import { PageContainer, TSSs } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata('TSS')
}

export default function TSSPage() {
  return (
    <PageContainer>
      <TSSs />
    </PageContainer>
  )
}
