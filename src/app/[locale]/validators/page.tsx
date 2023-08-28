import { Metadata } from 'next'

import { PageContainer, Validators } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata('Validators')
}

export default function ValidatorsPage() {
  return (
    <PageContainer>
      <Validators />
    </PageContainer>
  )
}
