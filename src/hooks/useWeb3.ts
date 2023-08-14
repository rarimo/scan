'use client'

import { useEffect, useState } from 'react'

import { client, initClient } from '@/client'
import { apolloClient } from '@/graphql'
import { ErrorHandler, isWindow } from '@/helpers'
import { useAppState } from '@/hooks/useAppState'
import { GetAccountValidatorInfos, GetAccountValidatorInfosQuery } from '@/types'

export const useWeb3 = () => {
  const {
    isConnected,
    isValidator,
    address,
    setIsConnected,
    setAddress,
    setIsValidator,
    isInitialised,
  } = useAppState()
  const [isConnecting, setIsConnecting] = useState(false)

  const state = {
    isConnected,
    isValidator,
    address,
  }

  const getIsValidator = async (address: string) => {
    const { data } = await apolloClient.query<GetAccountValidatorInfosQuery>({
      query: GetAccountValidatorInfos,
      fetchPolicy: 'network-only',
      variables: { address },
    })

    return Boolean(data?.account?.[0]?.validator_infos?.length)
  }

  const connect = async () => {
    setIsConnecting(true)
    try {
      await initClient()
      await client.connect()

      setIsConnected(true)
      setAddress(client.wallet.address)
      setIsValidator(await getIsValidator(client.wallet.address))

      await new Promise(resolve => {
        if (state.address && state.isConnected) resolve(true)
      })
    } catch (e) {
      setIsConnected(false)
      ErrorHandler.process(e)
    }
    setIsConnecting(false)
  }

  const disconnect = () => {
    client.disconnect()
    setIsValidator(false)
    setAddress('')
    setIsConnected(false)
    setIsConnecting(false)
  }

  const handleWalletConnection = async () => {
    if (state.isConnected) return
    await connect()
  }

  useEffect(() => {
    if (!isWindow()) return
    async function init() {
      await initClient()
      if (isInitialised && isConnected) await connect()
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWindow(), isInitialised, isConnected])

  return { connect, disconnect, handleWalletConnection, ...state, isConnecting }
}
