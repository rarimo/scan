import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getTSSByAddress } from '@/callers'
import { getClient } from '@/client'
import { AccountTransactions, PageContainer, TSSDetails } from '@/components'
import { createMetadata } from '@/config'
import { TssFragment } from '@/graphql'
import { getServerSideProps } from '@/helpers'

const getTSS = (address: string) => {
  return getServerSideProps<TssFragment>(() => getTSSByAddress(address))
}

export function generateMetadata({ params }: { params: { address: string } }): Metadata {
  return createMetadata(`TSS ${params.address} Details`)
}

export default async function TSSPage({ params: { address } }: { params: { address: string } }) {
  const { isNotFound } = await getTSS(address)
  if (isNotFound) notFound()

  const account = await getClient().query.getAccount(address)

  return (
    <PageContainer>
      <TSSDetails address={address} />
      <AccountTransactions sender={account.base_account.pub_key!} />
    </PageContainer>
  )
}
