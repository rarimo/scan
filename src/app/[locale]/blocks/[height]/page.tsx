import { Metadata } from 'next'

import { BlockDetails, PageContainer } from '@/components'
import { craftPageTitle, METADATA } from '@/config'

export function generateMetadata({ params }: { params: { height: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Block ${params.height} Details`),
  }
}

export default function BlockPage({ params: { height } }: { params: { height: string } }) {
  return (
    <PageContainer>
      <BlockDetails height={height} />
    </PageContainer>
  )
}
