import { Account as TAccount } from '@rarimo/client'
import { Metadata } from 'next'

import { getClient } from '@/client'
import { Account, AccountTransactions, PageContainer } from '@/components'
import { craftPageTitle, METADATA } from '@/config'
import { getServerSideProps } from '@/helpers'

const getAccount = async (address: string) => {
  const client = await getClient()
  return getServerSideProps<TAccount>(() => client.query.getAccount(address))
}

export function generateMetadata({ params }: { params: { address: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Account ${params.address} Details`),
  }
}

export default async function AccountPage({
  params: { address },
}: {
  params: { address: string }
}) {
  const account = await getAccount(address)

  return (
    <PageContainer>
      <Account address={address} />
      {Boolean(account?.base_account?.pub_key) && (
        <AccountTransactions sender={account.base_account.pub_key!} />
      )}
    </PageContainer>
  )
}
