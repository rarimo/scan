import { Backdrop, Box, CircularProgress, Stack, useTheme } from '@mui/material'
import { BaseSyntheticEvent, ReactNode } from 'react'

export default function FormWrapper({
  id,
  onSubmit,
  isFormDisabled,
  children,
}: {
  id: string
  onSubmit: (e?: BaseSyntheticEvent) => Promise<void>
  isFormDisabled: boolean
  children: ReactNode
}) {
  const theme = useTheme()

  return (
    <Box id={id} component='form' noValidate autoComplete='off' width={'100%'} onSubmit={onSubmit}>
      <Backdrop
        sx={{
          color: theme.palette.info.main,
          zIndex: theme.zIndex.drawer + 1,
        }}
        open={isFormDisabled}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Stack spacing={3}>{children}</Stack>
    </Box>
  )
}
