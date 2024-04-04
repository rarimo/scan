'use client'

import { useEffect, useState } from 'react'

import { isWindow } from '@/helpers'
import { Web3Storage } from '@/storages'

export const useWeb3Store = () => {
  const [storage, setStorage] = useState<Web3Storage | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isValidator, setIsValidator] = useState(false)
  const [isStaker, setIsStaker] = useState(false)
  const [address, setAddress] = useState('')
  const [isInitialised, setIsInitialised] = useState(false)

  useEffect(() => {
    if (!isWindow()) return

    const _storage = Web3Storage.getInstance(() => window.localStorage)
    setStorage(_storage)

    const restored = _storage.getStorage({ isConnected, isValidator, address, isStaker })

    setIsConnected(restored.isConnected)
    setIsValidator(restored.isValidator)
    setIsStaker(isStaker)
    setAddress(restored.address)
    setIsInitialised(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWindow()])

  useEffect(() => {
    if (!storage) return
    storage.save({ isConnected, isValidator, address, isStaker })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isValidator, address, storage, isStaker])

  return {
    isConnected,
    isStaker,
    isValidator,
    isInitialised,
    address,
    setIsConnected,
    setIsValidator,
    setIsStaker,
    setAddress,
  }
}
