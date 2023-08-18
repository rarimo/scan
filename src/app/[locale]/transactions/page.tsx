import { Metadata } from 'next'

import { PageContainer, TransactionsSection } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export const metadata: Metadata = {
  ...METADATA,
  title: craftPageTitle('Transactions'),
}

export default function Transactions() {
  return (
    <PageContainer>
      <TransactionsSection />
    </PageContainer>
  )
}
