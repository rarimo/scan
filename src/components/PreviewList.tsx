import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Link as MuiLink, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { RoutePaths } from '@/types'

export default function PreviewList({
  title,
  children,
  actions,
}: {
  title: string
  isError: boolean
  actions: { label: string; link: RoutePaths }
  isLoading: boolean
  children: ReactNode
}) {
  const theme = useTheme()

  const link = (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <MuiLink
        component={Link}
        href={actions.link}
        sx={{
          color: theme.palette.primary.main,
          textTransform: 'uppercase',
          textDecoration: 'none',
          fontSize: 13,
          lineHeight: 1.7,
          fontWeight: 700,
        }}
      >
        {actions.label}
      </MuiLink>
      <ChevronRightIcon
        aria-hidden='true'
        width={18}
        height={18}
        sx={{
          color: theme.palette.primary.main,
        }}
      />
    </Stack>
  )

  return (
    <Stack
      sx={{
        border: 'var(--ui-border)',
        padding: theme.spacing(2, 3, 0),
      }}
      spacing={2}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography component={'h3'} variant={'subtitle1'}>
          {title}
        </Typography>
        {link}
      </Stack>
      {Boolean(children) && <Stack sx={{ borderTop: 'var(--ui-border)' }}>{children}</Stack>}
      <Stack
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{
          borderTop: 'var(--ui-border)',
          display: {
            xs: 'flex',
            md: 'none',
          },
          p: theme.spacing(2, 0),
        }}
      >
        {link}
      </Stack>
    </Stack>
  )
}
