import { Metadata } from 'next'

import { PageContainer, SupportedTokens } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata(`Supported Tokens`)
}

export default function SupportedTokensPage() {
  return (
    <PageContainer>
      <SupportedTokens />
    </PageContainer>
  )
}
