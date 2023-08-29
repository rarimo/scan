import { Link as MuiLink, Stack } from '@mui/material'
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx'
import Link from 'next/link'
import { useMemo } from 'react'

import { CONFIG } from '@/config'
import { abbr, generatePath } from '@/helpers'
import { RoutePaths } from '@/types'

import Avatar from './Avatar'

export default function AvatarName({
  imageUrl,
  name,
  address,
  imageSize = 20,
  fontSize = 14,
  padding,
  abbrAddress = true,
  direction = 'row',
}: {
  imageUrl?: string
  name?: string
  address: string
  imageSize?: number
  fontSize?: number | string
  padding?: number | string
  abbrAddress?: boolean
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>
}) {
  const route = useMemo(
    () =>
      address.startsWith(CONFIG.CHAIN_ID + 'valoper')
        ? generatePath(RoutePaths.Validator, { address })
        : generatePath(RoutePaths.Account, { address }),
    [address],
  )

  const addressFormatted = useMemo(
    () => (abbrAddress ? abbr(address) : address),
    [address, abbrAddress],
  )

  return (
    <Stack
      alignItems={'center'}
      flexDirection={direction}
      justifyContent={{ xs: 'space-between', md: 'flex-start' }}
      width={{ xs: '100%', md: 'auto' }}
    >
      <Avatar name={name} imageUrl={imageUrl} imageSize={imageSize} />
      <Stack paddingLeft={padding || 1} sx={{ overflow: 'hidden' }}>
        <MuiLink
          component={Link}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontSize,
          }}
          href={route}
        >
          {name || addressFormatted}
        </MuiLink>
      </Stack>
    </Stack>
  )
}
