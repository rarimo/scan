import { Link as MuiLink, Stack } from '@mui/material'
import Link from 'next/link'
import { useMemo } from 'react'

import { CONFIG } from '@/config'
import { OVERFLOW_SX } from '@/const'
import { abbr, generatePath } from '@/helpers'
import { FlexboxDirection, FlexboxJustifyContent, RoutePaths } from '@/types'

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
  justifyContent = 'flex-start',
}: {
  imageUrl?: string
  name?: string
  address: string
  imageSize?: number
  fontSize?: number | string
  padding?: number | string
  abbrAddress?: boolean
  direction?: FlexboxDirection
  justifyContent?: FlexboxJustifyContent
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
      justifyContent={justifyContent}
      width={{ xs: '100%', md: 'auto' }}
    >
      <Avatar name={name} imageUrl={imageUrl} imageSize={imageSize} />
      <Stack paddingLeft={padding || 1} sx={{ overflow: 'hidden' }}>
        <MuiLink
          component={Link}
          sx={{
            ...OVERFLOW_SX,
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
