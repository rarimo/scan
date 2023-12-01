import { getApollo, GetStatistic, GetStatisticQuery } from '@/graphql'

export const getStatisticData = async () => {
  const { data } = await getApollo().query<GetStatisticQuery>({
    query: GetStatistic,
    fetchPolicy: 'network-only',
  })
  return data
}
