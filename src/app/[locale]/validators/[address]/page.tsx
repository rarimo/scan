import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getValidatorByAddress } from '@/callers'
import { PageContainer, Validator } from '@/components'
import { craftPageTitle, METADATA } from '@/config'
import { GetValidatorByAddressQuery } from '@/graphql'
import { getServerSideProps, throwNotFound } from '@/helpers'

const getValidator = (address: string) => {
  return getServerSideProps<GetValidatorByAddressQuery>(async () => {
    const validator = await getValidatorByAddress(address)
    if (!validator.validator?.[0]) throwNotFound()
    return validator
  })
}

export function generateMetadata({ params }: { params: { address: string } }): Metadata {
  return {
    ...METADATA,
    title: craftPageTitle(`Validator ${params.address} Details`),
  }
}

export default async function ValidatorPage({ params }: { params: { address: string } }) {
  const { isNotFound } = await getValidator(params.address)
  if (isNotFound) notFound()

  return (
    <PageContainer>
      <Validator operator={params.address} />
    </PageContainer>
  )
}
