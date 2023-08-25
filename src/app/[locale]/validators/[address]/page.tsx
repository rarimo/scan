import { Metadata } from 'next'

import { PageContainer, Validator } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export function generateMetadata({ params }: { params: { address: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Validator ${params.address} Details`),
  }
}

export default function ValidatorPage({ params }: { params: { address: string } }) {
  return (
    <PageContainer>
      <Validator operator={params.address} />
    </PageContainer>
  )
}
