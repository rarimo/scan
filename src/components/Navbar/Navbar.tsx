'use client'

import { Box, Divider, Drawer, IconButton, Stack, Toolbar, useTheme } from '@mui/material'
import { Cancel } from 'iconoir-react'
import { ReactNode } from 'react'

import { isWindow } from '@/helpers'
import { useAppState } from '@/hooks'
import { useI18n } from '@/locales/client'

import { Logo } from '../Logo'
import { NavbarMenuList } from './NavbarMenuList'

const container = isWindow() ? () => window.document.body : undefined

export const Navbar = ({ children }: { children: ReactNode }) => {
  const t = useI18n()
  const { toggleMobileNavbar, isMobileNavbarOpened } = useAppState()
  const theme = useTheme()

  const menuToolbar = (
    <Toolbar
      sx={{
        p: theme.spacing(4.5),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '.Navbar:hover > .MuiDrawer-root .MuiPaper-root > .Navbar__menuList > & > .Navbar__sideToggleButton':
          {
            opacity: 1,
          },
      }}
    >
      <Box component='div' width={27} />

      <Logo isInsideNavbar={true} />

      <IconButton
        size='small'
        aria-label={t('common.close-btn')}
        edge='start'
        onClick={toggleMobileNavbar}
        sx={{
          display: { sm: 'none' },
        }}
      >
        <Cancel aria-hidden='true' />
      </IconButton>
    </Toolbar>
  )

  const menuList = (
    <Stack className='Navbar__menuList' sx={{ height: 'calc(100 * var(--vh))' }}>
      {menuToolbar}
      <Divider
        aria-hidden='true'
        sx={{
          transition: theme.transitions.create('opacity'),
        }}
      />
      <NavbarMenuList />
    </Stack>
  )

  return (
    <Box component='nav' className='Navbar'>
      {children}
      <Drawer
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
