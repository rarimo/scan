import { Metadata } from 'next'

import { Operations, PageContainer } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata(`Operations`)
}

export default function OperationsPage() {
  return (
    <PageContainer>
      <Operations />
    </PageContainer>
  )
}
