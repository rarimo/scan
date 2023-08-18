import { Metadata } from 'next'

import { PageContainer, Transactions } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export const metadata: Metadata = {
  ...METADATA,
  title: craftPageTitle('Transactions'),
}

export default function TransactionsPage() {
  return (
    <PageContainer>
      <Transactions />
    </PageContainer>
  )
}
