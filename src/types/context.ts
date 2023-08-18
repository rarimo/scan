import { useUiStore, useWeb3Store } from '@/hooks'

export type TAppStateContext = ReturnType<typeof useUiStore> &
  ReturnType<typeof useWeb3Store> & {
    isMobileNavbarOpened: boolean
    setIsMobileNavbarOpened: (isMobileNavbarOpened: boolean) => void
    isSearchOpened: boolean
    setIsSearchOpened: (isSearchOpened: boolean) => void
    toggleMobileNavbar: () => void
  }
