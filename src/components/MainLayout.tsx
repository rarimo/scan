'use client'

import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, Box, IconButton, Stack, useTheme } from '@mui/material'
import React, { ReactNode, useMemo } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import Navbar from '@/components/Navbar/Navbar'
import Search from '@/components/Search'
import { useAppState } from '@/hooks'
import { ThemeMode } from '@/types'

export default function MainLayout({ children }: { children: ReactNode }) {
  const theme = useTheme()
  const isDarkMode = useMemo(() => theme.palette.mode === 'dark', [theme.palette.mode])
  const { isSearchOpened, setIsSearchOpened, themeMode } = useAppState()

  const closeSearch = () => {
    setIsSearchOpened(false)
  }

  const layoutMixin = {
    spacing: {
      xs: theme.spacing(4.5),
      xl: theme.spacing(6),
    },
    sx: {
      width: '100%',
      margin: theme.spacing(0, 'auto'),
      alignItems: 'center',
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      padding: {
        xs: 'var(--ui-content-padding-xs)',
        sm: 'var(--ui-content-padding-sm)',
        lg: 'var(--ui-content-padding-lg)',
      },
    },
  }

  const isLightTheme = themeMode === ThemeMode.Light

  return (
    <>
      <Box
        component='div'
        className='App'
        sx={{
          display: 'flex',
          flex: 1,
          bgcolor: 'var(--ui-app-background)',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            minHeight: 661,
            height: 661,
            width: '100%',
            background: 'var(--ui-app-home-gradient-2)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: 'var(--ui-app-home-gradient)',
            }}
          />
        </Box>
        <img
          src={isDarkMode ? '/squares.png' : '/squares-2.png'}
          alt=''
          width={'100%'}
          height={650}
          style={{ position: 'absolute', objectFit: 'cover', pointerEvents: 'none', zIndex: '-1' }}
        />
        <Navbar>
          <Header />
        </Navbar>
        <Stack {...layoutMixin}>
          <Stack
            sx={{
              width: '100%',
              maxWidth: 'var(--ui-max-width)',
              zIndex: 2,
            }}
          >
            {children}
          </Stack>
        </Stack>
        <Footer />
      </Box>
      <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1, p: 3 }} open={isSearchOpened}>
        <IconButton
          sx={{
            zIndex: -1,
            position: 'absolute',
            top: 40,
            right: 40,
            ...(isLightTheme && { color: theme.palette.primary.contrastText }),
          }}
          onClick={closeSearch}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ maxWidth: 700, width: '100%' }}>
          <Search size={'big'} onRedirect={closeSearch} />
        </Box>
      </Backdrop>
    </>
  )
}
