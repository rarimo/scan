import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getBlockByHeight } from '@/callers'
import { BlockDetails, PageContainer } from '@/components'
import { craftPageTitle, METADATA } from '@/config'
import { BlockFragment } from '@/graphql'
import { ensureNotFoundNumber, getServerSideProps } from '@/helpers'

const getBlock = (height: string) => {
  return getServerSideProps<BlockFragment>(() => {
    ensureNotFoundNumber(height)
    return getBlockByHeight(Number(height))
  })
}

export function generateMetadata({ params }: { params: { height: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Block ${params.height} Details`),
  }
}

export default async function BlockPage({ params: { height } }: { params: { height: string } }) {
  const { isNotFound } = await getBlock(height)
  if (isNotFound) notFound()

  return (
    <PageContainer>
      <BlockDetails height={height} />
    </PageContainer>
  )
}
