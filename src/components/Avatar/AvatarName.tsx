import { Link as MuiLink, Stack } from '@mui/material'
import Link from 'next/link'
import { useMemo } from 'react'

import { CONFIG } from '@/config'
import { RoutePaths } from '@/enums'
import { generatePath } from '@/helpers'

import { Avatar } from './Avatar'

type AvatarNameProps = {
  imageUrl?: string
  name?: string
  address: string
  imageSize?: number
  fontSize?: number | string
  padding?: number | string
}

export const AvatarName = ({
  imageUrl,
  name,
  address,
  imageSize,
  fontSize,
  padding,
}: AvatarNameProps) => {
  const route = useMemo(
    () =>
      address.startsWith(CONFIG.CHAIN_ID + 'valoper')
        ? generatePath(RoutePaths.Validator, { address })
        : generatePath(RoutePaths.Account, { address }),
    [address],
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
            fontSize: fontSize || '0.875rem',
          }}
          href={route}
        >
          {name || address}
        </MuiLink>
      </Stack>
    </Stack>
  )
}
