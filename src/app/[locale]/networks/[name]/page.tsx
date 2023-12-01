import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getNetworkByName } from '@/callers'
import { Network, PageContainer } from '@/components'
import { createMetadata } from '@/config'
import { NetworkFragment } from '@/graphql'
import { getServerSideProps } from '@/helpers'

const getNetwork = (name: string) => {
  return getServerSideProps<NetworkFragment>(() => getNetworkByName(name))
}

export function generateMetadata({ params }: { params: { name: string } }): Metadata {
  return createMetadata(`Network ${params.name} Details`)
}

export default async function NetworkPage({ params: { name } }: { params: { name: string } }) {
  const { isNotFound } = await getNetwork(name)
  if (isNotFound) notFound()

  return (
    <PageContainer>
      <Network name={name} />
    </PageContainer>
  )
}
