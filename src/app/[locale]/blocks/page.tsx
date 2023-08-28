import { Metadata } from 'next'

import { Blocks, PageContainer } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata(`Blocks`)
}

export default function BlocksPage() {
  return (
    <PageContainer>
      <Blocks />
    </PageContainer>
  )
}
