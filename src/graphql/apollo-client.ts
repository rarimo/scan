import { ApolloClient, InMemoryCache } from '@apollo/client'

import { CONFIG } from '@/config'

const apolloClient = new ApolloClient({
  uri: CONFIG.GRAPHQL_URL,
  cache: new InMemoryCache(),
})

const apolloServer = new ApolloClient({
  uri: CONFIG.IS_DEV_EDITION ? CONFIG.GRAPHQL_DOCKER_URL : CONFIG.GRAPHQL_URL,
  cache: new InMemoryCache(),
})

export const getApollo = () => {
  return typeof window === 'undefined' ? apolloServer : apolloClient
}
