import { Metadata } from 'next'

import { PageContainer, Validators } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export const metadata: Metadata = {
  ...METADATA,
  title: craftPageTitle('Validators'),
}

export default function ValidatorsPage() {
  return (
    <PageContainer>
      <Validators />
    </PageContainer>
  )
}
