import { MenuItem, SelectChangeEvent, Stack } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import MouseOverDropdown from '@/components/MouseOverDropdown'
import { Bus } from '@/helpers'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

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

export default function HeaderBlockchainMenu({ displayXs = false }: { displayXs?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const t = useI18n()
  const [route, setRoute] = useState<AvailableRoutes>('' as AvailableRoutes)

  const handleChange = (event: SelectChangeEvent) => {
    if (!event.target.value) return
    setRoute(event.target.value as AvailableRoutes)
    router.push(event.target.value)
  }

  const itemList = [
    { label: t('header-blockchain-menu.menu-lbl'), href: '' },
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
          xs: displayXs ? 'flex' : 'none',
          md: 'flex',
        },
      }}
    >
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
