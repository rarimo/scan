import { Metadata } from 'next'

import { Confirmations, PageContainer } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata(`Confirmations`)
}

export default function ConfirmationsPage() {
  return (
    <PageContainer>
      <Confirmations />
    </PageContainer>
  )
}
