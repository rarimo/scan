import { apolloClient, GetStatistic, GetStatisticQuery } from '@/graphql'

export const getStatisticData = async () => {
  const { data } = await apolloClient.query<GetStatisticQuery>({
    query: GetStatistic,
    fetchPolicy: 'network-only',
  })
  return data
}
