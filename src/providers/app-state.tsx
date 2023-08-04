'use client'

import { ReactNode, useMemo, useState } from 'react'

import { AppStateContext } from '@/contexts'
import { useUiStore, useWeb3Store } from '@/hooks'

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const { viewportWidth, themeMode, setViewportWidth, setThemeMode } = useUiStore()
  const { isConnected, isValidator, address, setIsConnected, setValidator, setAddress } =
    useWeb3Store()

  const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(false)

  const toggleMobileNavbar = useMemo(
    () => () => {
      setIsMobileNavbarOpened(!isMobileNavbarOpened)
    },
    [isMobileNavbarOpened, setIsMobileNavbarOpened],
  )

  const memorizedContext = useMemo(
    () => ({
      viewportWidth,
      themeMode,
      isConnected,
      isValidator,
      address,
      isMobileNavbarOpened,
      setIsConnected,
      setValidator,
      setAddress,
      setViewportWidth,
      setThemeMode,
      setIsMobileNavbarOpened,
      toggleMobileNavbar,
    }),
    [
      viewportWidth,
      themeMode,
      isConnected,
      isValidator,
      address,
      isMobileNavbarOpened,
      setIsConnected,
      setValidator,
      setAddress,
      setViewportWidth,
      setThemeMode,
      setIsMobileNavbarOpened,
      toggleMobileNavbar,
    ],
  )

  return <AppStateContext.Provider value={memorizedContext}>{children}</AppStateContext.Provider>
}
