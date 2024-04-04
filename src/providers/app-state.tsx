'use client'

import { ReactNode, useMemo, useState } from 'react'

import { AppStateContext } from '@/contexts'
import { useSearchParams, useUiStore, useWeb3Store } from '@/hooks'

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const { setQueryParams } = useSearchParams()

  const {
    isInitialised: isUiInitialised,
    viewportWidth,
    themeMode,
    setViewportWidth,
    setThemeMode,
  } = useUiStore()
  const {
    isInitialised: isWeb3Initialised,
    isConnected,
    isValidator,
    isStaker,
    address,
    setIsConnected,
    setIsValidator,
    setIsStaker,
    setAddress,
  } = useWeb3Store()

  const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(false)
  const [isSearchOpened, setIsSearchOpened] = useState(false)

  const isInitialised = useMemo(
    () => isUiInitialised && isWeb3Initialised,
    [isUiInitialised, isWeb3Initialised],
  )

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
      isStaker,
      address,
      isMobileNavbarOpened,
      isInitialised,
      isSearchOpened,
      setIsConnected,
      setIsValidator,
      setIsStaker,
      setAddress,
      setViewportWidth,
      setThemeMode,
      setIsMobileNavbarOpened,
      toggleMobileNavbar,
      setIsSearchOpened,
      setQueryParams,
    }),
    [
      viewportWidth,
      themeMode,
      isConnected,
      isValidator,
      isStaker,
      address,
      isMobileNavbarOpened,
      isInitialised,
      isSearchOpened,
      setIsConnected,
      setIsValidator,
      setIsStaker,
      setAddress,
      setViewportWidth,
      setThemeMode,
      setIsMobileNavbarOpened,
      setIsSearchOpened,
      setQueryParams,
      toggleMobileNavbar,
    ],
  )

  return <AppStateContext.Provider value={memorizedContext}>{children}</AppStateContext.Provider>
}
