'use client'

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import Menu from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { AppBar, Box, Button, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useMemo, useState } from 'react'

import HeaderBlockchainMenu from '@/components/Header/HeaderBlockchainMenu'
import HeaderNetworkSwitcher from '@/components/Header/HeaderNetworkSwitcher'
import Logo from '@/components/Logo'
import { ColorModeContext } from '@/contexts'
import { abbr } from '@/helpers'
import { useAppState, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'
import { RoutePaths, ThemeMode } from '@/types'

const iconProps = {
  width: 24,
  height: 24,
  'aria-hidden': true,
}

const HEADER_CONTENT_HEIGHT = 40

export default function Header() {
  const t = useI18n()
  const theme = useTheme()
  const pathname = usePathname()
  const colorMode = useContext(ColorModeContext)
  const [isOnTopPositioned, setIsOnTopPositioned] = useState(true)
  const isPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { themeMode, setIsSearchOpened } = useAppState()

  const { connect, disconnect, isConnected, isConnecting, address } = useWeb3()
  const { isMobileNavbarOpened, toggleMobileNavbar } = useAppState()

  const mode = useMemo(() => {
    if (themeMode) return themeMode
    if (isPrefersDarkMode) return ThemeMode.Dark
    return ThemeMode.Light
  }, [themeMode, isPrefersDarkMode])

  const isDarkMode = useMemo(() => mode === ThemeMode.Dark, [mode])

  const setTopPositioned = () => {
    setIsOnTopPositioned(window.scrollY === 0)
  }

  useEffect(() => {
    setIsOnTopPositioned(window.scrollY === 0)

    window.addEventListener('wheel', setTopPositioned)

    return () => {
      window.removeEventListener('wheel', setTopPositioned)
    }
  }, [])

  const isHomePage = useMemo(() => pathname === RoutePaths.Main || pathname === '', [pathname])

  const searchButton = isHomePage ? (
    <></>
  ) : (
    <IconButton sx={{ p: 0.5, width: 32, height: 32 }} onClick={() => setIsSearchOpened(true)}>
      <SearchIcon />
    </IconButton>
  )

  return (
    <AppBar
      position='fixed'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        boxShadow: 'none',
        bgcolor: isOnTopPositioned ? 'transparent' : 'var(--col-bg-primary)',
        backgroundImage: 'none',
        color: theme.palette.secondary.main,
        transitionProperty: 'background-color,padding',
        transitionDuration: '0.3s',
        transitionTimingFunction: isOnTopPositioned ? 'ease-out' : 'ease-in',
        p: {
          xs: isOnTopPositioned
            ? 'var(--ui-header-padding-xs)'
            : 'var(--ui-header-padding-overlay-xs)',
          sm: isOnTopPositioned
            ? 'var(--ui-header-padding-sm)'
            : 'var(--ui-header-padding-overlay-sm)',
          lg: isOnTopPositioned
            ? 'var(--ui-header-padding-lg)'
            : 'var(--ui-header-padding-overlay-lg)',
        },
      }}
    >
      <IconButton
        size='small'
        color='inherit'
        aria-label={String(isMobileNavbarOpened ? t('common.close-btn') : t('common.open-btn'))}
        edge='start'
        onClick={toggleMobileNavbar}
        sx={{
          color: theme.palette.text.primary,
          display: { md: 'none' },
          width: HEADER_CONTENT_HEIGHT,
          height: HEADER_CONTENT_HEIGHT,
        }}
      >
        <Menu {...iconProps} />
      </IconButton>

      <Stack
        flexDirection='row'
        alignItems='center'
        sx={{
          maxWidth: 'var(--ui-max-width)',
          m: '0 auto',
          width: '100%',
          flex: '1',
          maxHeight: HEADER_CONTENT_HEIGHT,
        }}
      >
        <Box
          component='div'
          width={24}
          aria-hidden='true'
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        />

        <Logo sx={{ width: { xs: '100%', md: 'auto' } }} />

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          flex={1}
          sx={{ ml: { xs: 0, md: 6 } }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={6}>
            <HeaderBlockchainMenu />
            {searchButton}
          </Stack>

          <Stack spacing={{ xs: 0, md: 2 }} direction={'row'} sx={{ ml: { xs: 'auto', md: 0 } }}>
            <Button
              sx={{
                minWidth: 170,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'row',
              }}
              onClick={isConnected ? disconnect : connect}
              disabled={isConnecting}
            >
              {isConnected ? abbr(address, 7, 6) : t('common.connect-wallet-btn')}
              {isConnected && (
                <LogoutOutlinedIcon
                  aria-hidden='true'
                  style={{ marginLeft: 8, marginTop: '1px', width: 20, height: 20 }}
                />
              )}
            </Button>

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <HeaderNetworkSwitcher />
            </Box>

            <IconButton
              size='small'
              color='inherit'
              onClick={colorMode.toggleColorMode}
              sx={{
                color: theme.palette.action.active,
                width: HEADER_CONTENT_HEIGHT,
                height: HEADER_CONTENT_HEIGHT,
              }}
            >
              {isDarkMode ? (
                <LightModeOutlinedIcon {...iconProps} />
              ) : (
                <DarkModeOutlinedIcon {...iconProps} />
              )}
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </AppBar>
  )
}
