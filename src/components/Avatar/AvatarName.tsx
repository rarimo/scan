import { Link as MuiLink, Stack } from '@mui/material'
import Link from 'next/link'
import { useMemo } from 'react'

import { CONFIG } from '@/config'
import { RoutePaths } from '@/enums'
import { abbr, generatePath } from '@/helpers'

import { Avatar } from './Avatar'

export const AvatarName = ({
  imageUrl,
  name,
  address,
  imageSize = 20,
  fontSize = 14,
  padding,
  abbrAddress = true,
}: {
  imageUrl?: string
  name?: string
  address: string
  imageSize?: number
  fontSize?: number | string
  padding?: number | string
  abbrAddress?: boolean
}) => {
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
    <Stack flexDirection={'row'} alignItems={'center'}>
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
