import { Metadata } from 'next'

import { Networks, PageContainer } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata(`Networks`)
}

export default function NetworksPage() {
  return (
    <PageContainer>
      <Networks />
    </PageContainer>
  )
}
