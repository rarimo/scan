import { Metadata } from 'next'

import { BlocksSection, PageContainer } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export const metadata: Metadata = {
  ...METADATA,
  title: craftPageTitle('Blocks'),
}

export default function Blocks() {
  return (
    <PageContainer>
      <BlocksSection />
    </PageContainer>
  )
}
