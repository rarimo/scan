'use client'

import { Box, useTheme } from '@mui/material'
import LogoSVG from '@public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

import { CONFIG } from '@/config'
import { RoutePaths } from '@/enums'
import { useAppState } from '@/hooks'

export const Logo = ({ isInsideNavbar = false }: { isInsideNavbar?: boolean }) => {
  const theme = useTheme()
  const { toggleMobileNavbar } = useAppState()

  return (
    <Box
      component={Link}
      href={RoutePaths.Main}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: theme.spacing(-1),
      }}
      onClick={isInsideNavbar ? toggleMobileNavbar : () => {}}
    >
      <Image
        src={LogoSVG}
        alt={CONFIG.APP_NAME}
        height={42}
        width={140}
        color={theme.palette.text.primary}
      />
    </Box>
  )
}
