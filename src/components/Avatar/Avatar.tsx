'use client'

import { Avatar as MuiAvatar, Box, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

import LogoSmall from '@/components/LogoSmall'

const getSx = (imageSize?: number | string) => ({
  width: imageSize,
  height: imageSize,
  minWidth: imageSize,
  minHeight: imageSize,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
  },
})

export default function Avatar({
  imageUrl,
  name,
  imageSize = 28,
}: {
  name?: string
  imageUrl?: string
  imageSize?: number
}) {
  const theme = useTheme()
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setError(false)
  }, [name, imageUrl])

  const handleError = () => {
    setError(true)
  }

  const sx = getSx(imageSize)

  const imgAvatar = <Box component={'img'} onError={handleError} sx={sx} src={imageUrl} />
  const nameAvatar = (
    <MuiAvatar
      sx={{
        ...sx,
        fontSize: 10,
        color: theme.palette.text.primary,
        bgcolor: 'var(--col-divider)',
        fontWeight: 500,
      }}
    >
      {name?.[0]?.toUpperCase()}
    </MuiAvatar>
  )
  const defaultAvatar = (
    <Box sx={{ ...sx, p: 0.5, bgcolor: 'var(--col-divider)', color: theme.palette.text.secondary }}>
      <LogoSmall />
    </Box>
  )

  if (imageUrl && !error) return imgAvatar
  if (name) return nameAvatar
  return defaultAvatar
}
