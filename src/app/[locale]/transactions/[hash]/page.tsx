import { Metadata } from 'next'

import { PageContainer, Transaction } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export function generateMetadata({ params }: { params: { hash: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Transaction ${params.hash} Details`),
  }
}

export default function TransactionPage({ params: { hash } }: { params: { hash: string } }) {
  return (
    <PageContainer>
      <Transaction hash={hash} />
    </PageContainer>
  )
}
