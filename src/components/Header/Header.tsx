'use client'

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import Menu from '@mui/icons-material/Menu'
import { AppBar, Box, Button, IconButton, Stack, useMediaQuery, useTheme } from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'

import HeaderBlockchainMenu from '@/components/Header/HeaderBlockchainMenu'
import HeaderNetworkSwitcher from '@/components/Header/HeaderNetworkSwitcher'
import Logo from '@/components/Logo'
import Search from '@/components/Search'
import { ColorModeContext } from '@/contexts'
import { abbr } from '@/helpers'
import { useAppState, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'
import { ThemeMode } from '@/types'

const iconProps = {
  width: 24,
  height: 24,
  'aria-hidden': true,
}

const HEADER_CONTENT_HEIGHT = 40

export default function Header() {
  const t = useI18n()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const [isOnTopPositioned, setIsOnTopPositioned] = useState(true)
  const isPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const { themeMode } = useAppState()

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
        <Logo />

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          flex={1}
          sx={{ ml: { xs: 0, md: 6 } }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={6}>
            <HeaderBlockchainMenu />
          </Stack>

          <Stack
            spacing={{ xs: 0, md: 2 }}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            flex={1}
            sx={{
              ml: { xs: 'auto', md: 0 },
            }}
          >
            <Box
              flex={1}
              justifyContent={'flex-end'}
              sx={{
                pr: 2,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <Search size={'small'} />
            </Box>
            <Button
              sx={{
                minWidth: 190,
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
              onClick={colorMode.toggleColorMode}
              sx={{
                color: theme.palette.action.active,
                width: HEADER_CONTENT_HEIGHT,
                height: HEADER_CONTENT_HEIGHT,
                p: { xs: 0, sm: '5px' },
              }}
            >
              {isDarkMode ? (
                <LightModeOutlinedIcon {...iconProps} />
              ) : (
                <DarkModeOutlinedIcon {...iconProps} />
              )}
            </IconButton>
            <IconButton
              size='small'
              aria-label={String(
                isMobileNavbarOpened ? t('common.close-btn') : t('common.open-btn'),
              )}
              edge='start'
              onClick={toggleMobileNavbar}
              sx={{
                color: theme.palette.action.active,
                display: { md: 'none' },
                ml: 0.5,
                p: 0,
                width: HEADER_CONTENT_HEIGHT,
                height: HEADER_CONTENT_HEIGHT,
              }}
            >
              <Menu {...iconProps} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </AppBar>
  )
}
