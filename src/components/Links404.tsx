'use client'

import { Box, Link as MuiLink, Stack, useTheme } from '@mui/material'
import Link from 'next/link'

import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

const RECTANGLE_SIZE = 4

export default function Links404() {
  const theme = useTheme()
  const t = useI18n()

  const linkSx = {
    color: theme.palette.text.secondary,
    transitionProperty: 'color',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  }

  const rectangle = (
    <Box
      sx={{
        borderRadius: '100%',
        width: RECTANGLE_SIZE,
        height: RECTANGLE_SIZE,
        background: 'var(--col-text-focus)',
      }}
    />
  )

  return (
    <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}>
      <MuiLink sx={linkSx} component={Link} href={RoutePaths.Main}>
        {t('404.homepage-link')}
      </MuiLink>
      {rectangle}
      <MuiLink sx={linkSx} component={Link} href={RoutePaths.Transactions}>
        {t('404.transaction-link')}
      </MuiLink>
      {rectangle}
      <MuiLink sx={linkSx} component={Link} href={RoutePaths.Blocks}>
        {t('404.block-link')}
      </MuiLink>
    </Stack>
  )
}
