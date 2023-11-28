import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getConfirmationByRoot } from '@/callers'
import {
  Confirmation,
  ConfirmationOperations,
  ConfirmationOperationVotes,
  PageContainer,
} from '@/components'
import { createMetadata } from '@/config'
import { ConfirmationFragment } from '@/graphql'
import { getServerSideProps } from '@/helpers'

const getConfirmation = (root: string) => {
  return getServerSideProps<ConfirmationFragment>(() => getConfirmationByRoot(root))
}

export function generateMetadata({ params }: { params: { root: string } }): Metadata {
  return createMetadata(`Confirmation ${params.root} Details`)
}

export default async function ConfirmationPage({ params: { root } }: { params: { root: string } }) {
  const { isNotFound, indexes } = await getConfirmation(root)
  if (isNotFound) notFound()

  return (
    <PageContainer>
      <Confirmation root={root} />
      <ConfirmationOperations indexes={indexes} />
      <ConfirmationOperationVotes indexes={indexes} />
    </PageContainer>
  )
}
