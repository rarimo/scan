import { Metadata } from 'next'

import { Blocks, PageContainer } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export const metadata: Metadata = {
  ...METADATA,
  title: craftPageTitle('Blocks'),
}

export default function BlocksPage() {
  return (
    <PageContainer>
      <Blocks />
    </PageContainer>
  )
}
