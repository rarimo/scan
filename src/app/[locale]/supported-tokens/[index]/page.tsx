import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCollectionByIndex } from '@/callers'
import { PageContainer, SupportedToken } from '@/components'
import { createMetadata } from '@/config'
import { CollectionFragment } from '@/graphql'
import { getServerSideProps } from '@/helpers'

const getCollection = (index: string) => {
  return getServerSideProps<CollectionFragment>(() => getCollectionByIndex(index))
}

export function generateMetadata({ params }: { params: { index: string } }): Metadata {
  return createMetadata(`Supported Token ${params.index} Details`)
}

export default async function SupportedTokenPage({
  params: { index },
}: {
  params: { index: string }
}) {
  const { isNotFound } = await getCollection(index)
  if (isNotFound) notFound()

  return (
    <PageContainer>
      <SupportedToken index={index} />
    </PageContainer>
  )
}
