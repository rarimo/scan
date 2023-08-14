import { Paper, Stack, SxProps, useTheme } from '@mui/material'
import { ReactNode } from 'react'

export const ContentBox = ({
  children,
  sx,
}: {
  children: ReactNode
  sx?: SxProps
} & JSX.IntrinsicAttributes) => {
  const theme = useTheme()

  return (
    <Stack
      component={Paper}
      spacing={theme.spacing(4)}
      sx={{
        maxWidth: 'var(--ui-max-width)',
        ...(sx ? sx : {}),
      }}
    >
      {children}
    </Stack>
  )
}
