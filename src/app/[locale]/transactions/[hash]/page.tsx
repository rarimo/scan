import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getTransactionByHash } from '@/callers'
import { PageContainer, Transaction } from '@/components'
import { craftPageTitle, METADATA } from '@/config'
import { TransactionFragment } from '@/graphql'
import { getServerSideProps } from '@/helpers'

const getTx = (hash: string) => {
  return getServerSideProps<TransactionFragment>(() => getTransactionByHash(hash))
}

export function generateMetadata({ params }: { params: { hash: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Transaction ${params.hash} Details`),
  }
}

export default async function TransactionPage({ params: { hash } }: { params: { hash: string } }) {
  const { isNotFound } = await getTx(hash)
  if (isNotFound) notFound()

  return (
    <PageContainer>
      <Transaction hash={hash} />
    </PageContainer>
  )
}
