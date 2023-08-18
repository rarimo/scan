import { MenuItem, SelectChangeEvent, Stack, Typography, useTheme } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { MouseOverDropdown } from '@/components/MouseOverDropdown'
import { RoutePaths } from '@/enums'
import { Bus } from '@/helpers'
import { useI18n } from '@/locales/client'

type AvailableRoutes =
  | RoutePaths.Validators
  | RoutePaths.Proposals
  | RoutePaths.Transactions
  | RoutePaths.Blocks

const AVAILABLE_ROUTES: AvailableRoutes[] = [
  RoutePaths.Validators,
  RoutePaths.Proposals,
  RoutePaths.Transactions,
  RoutePaths.Blocks,
]

export const HeaderBlockchainMenu = () => {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const t = useI18n()
  const [route, setRoute] = useState<AvailableRoutes>('' as AvailableRoutes)

  const handleChange = (event: SelectChangeEvent) => {
    if (!event.target.value) return
    setRoute(event.target.value as AvailableRoutes)
    router.push(event.target.value)
  }

  const itemList = [
    { label: 'SELECT', href: '' },
    { label: t('header-blockchain-menu.validators-lbl'), href: RoutePaths.Validators },
    { label: t('header-blockchain-menu.proposals-lbl'), href: RoutePaths.Proposals },
    { label: t('header-blockchain-menu.transactions-lbl'), href: RoutePaths.Transactions },
    { label: t('header-blockchain-menu.blocks-lbl'), href: RoutePaths.Blocks },
  ]

  Bus.on(Bus.eventList.redirectToHome, () => {
    if (String(route) === '') return
    setRoute('' as AvailableRoutes)
  })

  useEffect(() => {
    if (![...AVAILABLE_ROUTES, ''].includes(pathname as AvailableRoutes)) return
    setRoute((pathname ?? '') as AvailableRoutes)
  }, [pathname])

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={2}
      sx={{
        display: {
          xs: 'none',
          md: 'flex',
        },
      }}
    >
      <Typography variant={'subtitle2'} color={theme.palette.text.secondary}>
        {t('header-blockchain-menu.menu-lbl')}
      </Typography>
      <MouseOverDropdown variant={'text'} value={route} handleChange={handleChange}>
        {itemList.map((item, idx) => (
          <MenuItem value={item.href} key={idx} disabled={!item.href}>
            {item.label}
          </MenuItem>
        ))}
      </MouseOverDropdown>
    </Stack>
  )
}
