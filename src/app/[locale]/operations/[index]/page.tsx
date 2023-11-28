import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getOperationByIndex } from '@/callers'
import { Operation, OperationVotes, PageContainer } from '@/components'
import { createMetadata } from '@/config'
import { GetOperationByIndexQuery } from '@/graphql'
import { getServerSideProps } from '@/helpers'

const getOperation = (index: string) => {
  return getServerSideProps<GetOperationByIndexQuery>(() => getOperationByIndex(index))
}

export function generateMetadata({ params }: { params: { index: string } }): Metadata {
  return createMetadata(`Operation ${params.index} Details`)
}

export default async function OperationPage({ params: { index } }: { params: { index: string } }) {
  const { isNotFound } = await getOperation(index)
  if (isNotFound) notFound()

  return (
    <PageContainer>
      <Operation index={index} />
      <OperationVotes index={index} />
    </PageContainer>
  )
}
