'use client'

import CloseIcon from '@mui/icons-material/Close'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { ReactNode, useContext, useMemo } from 'react'

import HeaderBlockchainMenu from '@/components/Header/HeaderBlockchainMenu'
import Logo from '@/components/Logo'
import NavbarActionsList from '@/components/Navbar/NavbarActionsList'
import NavbarLinks from '@/components/Navbar/NavbarLinks'
import { ColorModeContext } from '@/contexts'
import { isWindow } from '@/helpers'
import { useAppState } from '@/hooks'
import { useI18n } from '@/locales/client'
import { ThemeMode } from '@/types'

const container = isWindow() ? () => window.document.body : undefined

const iconProps = {
  width: 24,
  height: 24,
  'aria-hidden': true,
}

const NAVBAR_HEADER_CONTENT_HEIGHT = 40

export default function Navbar({ children }: { children: ReactNode }) {
  const t = useI18n()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const isPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const { toggleMobileNavbar, isMobileNavbarOpened, themeMode } = useAppState()

  const mode = useMemo(() => {
    if (themeMode) return themeMode
    if (isPrefersDarkMode) return ThemeMode.Dark
    return ThemeMode.Light
  }, [themeMode, isPrefersDarkMode])

  const isDarkMode = useMemo(() => mode === ThemeMode.Dark, [mode])

  const menuToolbar = (
    <Toolbar
      sx={{
        p: {
          xs: 'var(--ui-navbar-padding-xs)',
          sm: 'var(--ui-navbar-padding-sm)',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '.Navbar:hover > .MuiDrawer-root .MuiPaper-root > .Navbar__menuList > & > .Navbar__sideToggleButton':
          {
            opacity: 1,
          },
      }}
    >
      <Logo isInsideNavbar={true} />

      <Stack spacing={0.5} direction={'row'}>
        <IconButton
          size='small'
          onClick={colorMode.toggleColorMode}
          sx={{
            color: theme.palette.action.active,
            width: NAVBAR_HEADER_CONTENT_HEIGHT,
            height: NAVBAR_HEADER_CONTENT_HEIGHT,
            p: { xs: 0, sm: '5px' },
            display: { md: 'none' },
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
          aria-label={t('common.close-btn')}
          onClick={toggleMobileNavbar}
          sx={{
            color: theme.palette.action.active,
            width: NAVBAR_HEADER_CONTENT_HEIGHT,
            height: NAVBAR_HEADER_CONTENT_HEIGHT,
            p: { xs: 0, sm: '5px' },
            display: { md: 'none' },
          }}
        >
          <CloseIcon {...iconProps} />
        </IconButton>
      </Stack>
    </Toolbar>
  )

  const divider = (
    <Divider
      aria-hidden='true'
      sx={{
        m: theme.spacing(3, 0),
        transition: theme.transitions.create('opacity'),
      }}
    />
  )

  const menuList = (
    <Stack
      className='Navbar__menuList'
      sx={{
        p: {
          xs: '0 var(--ui-content-side-padding-xs) var(--ui-content-side-padding-xs)',
          sm: '0 var(--ui-content-side-padding-sm) var(--ui-content-side-padding-sm)',
        },
      }}
    >
      {menuToolbar}
      <HeaderBlockchainMenu displayXs={true} />
      {divider}
      <NavbarActionsList />
      {divider}
      <NavbarLinks />
    </Stack>
  )

  return (
    <Box component='nav' className='Navbar'>
      {children}
      <Drawer
        anchor={'top'}
        container={container}
        variant='temporary'
        open={isMobileNavbarOpened}
        onClose={toggleMobileNavbar}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {menuList}
      </Drawer>
    </Box>
  )
}
