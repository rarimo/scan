'use client'

import { useEffect, useState } from 'react'

import { isWindow } from '@/helpers'
import { Web3Storage } from '@/storages'

export const useWeb3Store = () => {
  const [storage, setStorage] = useState<Web3Storage | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isValidator, setIsValidator] = useState(false)
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (!isWindow()) return

    const _storage = Web3Storage.getInstance(() => window.localStorage)
    setStorage(_storage)

    const restored = _storage.getStorage({ isConnected, isValidator, address })

    setIsConnected(restored.isConnected)
    setIsValidator(restored.isValidator)
    setAddress(restored.address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!storage) return
    storage.save({ isConnected, isValidator, address })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isValidator, address, storage])

  return {
    isConnected,
    isValidator,
    address,
    setIsConnected,
    setIsValidator,
    setAddress,
  }
}
