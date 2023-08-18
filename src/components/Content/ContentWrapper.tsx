import { Box, SxProps } from '@mui/material'
import { ReactNode } from 'react'

export const ContentWrapper = ({
  children,
  sx,
}: {
  children: ReactNode
  sx?: SxProps
} & JSX.IntrinsicAttributes) => {
  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        border: 'var(--ui-border)',
        ...(sx ? sx : {}),
      }}
    >
      {children}
    </Box>
  )
}
