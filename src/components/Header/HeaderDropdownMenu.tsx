import { MenuItem, SelectChangeEvent, Stack } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import MouseOverDropdown from '@/components/MouseOverDropdown'
import { Bus } from '@/helpers'
import { RoutePaths } from '@/types'

export type HeaderBridgeMenuProps = {
  displayXs?: boolean
  onClick?: () => void
  items: { label: string; href: string }[]
}

export function HeaderDropdownMenu({ displayXs = false, onClick, items }: HeaderBridgeMenuProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [route, setRoute] = useState<RoutePaths>('' as RoutePaths)

  const availableRoutes = useMemo(() => items.map(item => item.href), [items])

  const handleChange = (event: SelectChangeEvent) => {
    if (!event.target.value) return
    setRoute(event.target.value as RoutePaths)
    router.push(event.target.value)
  }

  Bus.on(Bus.eventList.redirectToHome, () => {
    if (String(route) === '') return
    setRoute('' as RoutePaths)
  })

  useEffect(() => {
    if (!availableRoutes.includes(pathname as RoutePaths)) {
      setRoute('' as RoutePaths)
      return
    }
    setRoute((pathname ?? '') as RoutePaths)
  }, [availableRoutes, pathname])

  useEffect(() => {
    availableRoutes.forEach(route => {
      if (pathname.startsWith(route)) setRoute(route as RoutePaths)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        {items.map((item, idx) => (
          <MenuItem
            value={item.href}
            key={idx}
            disabled={!item.href}
            sx={{
              minWidth: 220,
            }}
            onClick={() => {
              onClick?.()
              if (route === item.href) router.push(item.href)
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </MouseOverDropdown>
    </Stack>
  )
}
