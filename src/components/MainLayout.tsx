'use client'

import { Box, Stack, useTheme } from '@mui/material'
import { ReactNode } from 'react'

import { Header } from './Header/Header'
import { Navbar } from './Navbar/Navbar'

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const topPadding = `calc(var(--ui-appbar-height) + ${theme.spacing(4.5)})`

  const layoutMixin = {
    spacing: {
      xs: theme.spacing(4.5),
      xl: theme.spacing(6),
    },
    sx: {
      width: '100%',
      maxWidth: 'var(--ui-max-width)',
      margin: theme.spacing(0, 'auto'),
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      padding: {
        xs: theme.spacing(topPadding, 2.5, 2.5),
        sm: theme.spacing(topPadding, 4.5),
        lg: theme.spacing(topPadding, 0, 12.5),
      },
    },
  }

  return (
    <Box
      component='main'
      sx={{
        display: 'flex',
        flex: 1,
        bgcolor: 'var(--ui-app-background)',
      }}
    >
      <Navbar>
        <Header />
      </Navbar>
      <Stack {...layoutMixin}>
        <Stack>{children}</Stack>
      </Stack>
    </Box>
  )
}
