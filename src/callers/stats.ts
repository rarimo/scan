import { apolloClient } from '@/graphql'
import { GetStatistic, GetStatisticQuery } from '@/types'

export const getStatisticData = async () => {
  const { data } = await apolloClient.query<GetStatisticQuery>({
    query: GetStatistic,
    fetchPolicy: 'network-only',
  })
  return data
}
