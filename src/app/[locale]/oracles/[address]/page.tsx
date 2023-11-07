import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getOracleByAddress } from '@/callers'
import { getClient } from '@/client'
import { AccountTransactions, Oracle, PageContainer } from '@/components'
import { createMetadata } from '@/config'
import { OracleFragment } from '@/graphql'
import { getServerSideProps } from '@/helpers'

const getOracle = async (address: string) => {
  return getServerSideProps<OracleFragment>(() => {
    return getOracleByAddress(address)
  })
}

export function generateMetadata({ params }: { params: { address: string } }): Metadata {
  return createMetadata(`Oracle ${params.address} Details`)
}

export default async function ProposalPage({
  params: { address },
}: {
  params: { address: string }
}) {
  const { isNotFound } = await getOracle(address)
  if (isNotFound) notFound()

  const account = await getClient().query.getAccount(address)

  return (
    <PageContainer>
      <Oracle address={address} />
      <AccountTransactions sender={account.base_account.pub_key!} />
    </PageContainer>
  )
}
