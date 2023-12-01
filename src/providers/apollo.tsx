'use client'

import { ApolloProvider as Provider } from '@apollo/client'
import { ReactNode } from 'react'

import { getApollo } from '@/graphql'

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return <Provider client={getApollo()}>{children}</Provider>
}
