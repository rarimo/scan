import { Metadata } from 'next'

import { PageContainer, Transactions } from '@/components'
import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata('Transactions')
}

export default function TransactionsPage() {
  return (
    <PageContainer>
      <Transactions />
    </PageContainer>
  )
}
