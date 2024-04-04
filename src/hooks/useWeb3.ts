'use client'

import { useEffect, useState } from 'react'

import { getClient } from '@/client'
import {
  GetAccountDelegations,
  GetAccountDelegationsQuery,
  GetAccountValidatorInfos,
  GetAccountValidatorInfosQuery,
  getApollo,
} from '@/graphql'
import { ErrorHandler, isWindow } from '@/helpers'
import { useAppState } from '@/hooks'

export const useWeb3 = () => {
  const {
    isConnected,
    isValidator,
    isStaker,
    address,
    setIsConnected,
    setAddress,
    setIsValidator,
    setIsStaker,
    isInitialised,
  } = useAppState()
  const [isConnecting, setIsConnecting] = useState(false)

  const state = {
    isConnected,
    isValidator,
    address,
    isStaker,
  }

  const getIsStaker = async (address: string) => {
    const { data } = await getApollo().query<GetAccountDelegationsQuery>({
      query: GetAccountDelegations,
      fetchPolicy: 'network-only',
      variables: { address },
    })

    return Boolean(data.action_delegation?.pagination.total)
  }

  const getIsValidator = async (address: string) => {
    const { data } = await getApollo().query<GetAccountValidatorInfosQuery>({
      query: GetAccountValidatorInfos,
      fetchPolicy: 'network-only',
      variables: { address },
    })

    await getIsStaker(address)
    return Boolean(data?.account?.[0]?.validator_infos?.length)
  }

  const connect = async () => {
    setIsConnecting(true)
    try {
      const client = getClient()
      await client.connect()

      setIsConnected(true)
      setAddress(client.wallet.address)
      setIsValidator(await getIsValidator(client.wallet.address))
      setIsStaker(await getIsStaker(client.wallet.address))

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
    getClient().disconnect()
    setIsStaker(false)
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
      if (isInitialised && isConnected) await connect()
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWindow(), isInitialised, isConnected])

  return { connect, disconnect, handleWalletConnection, ...state, isConnecting }
}
