import { Stack } from '@mui/material'
import { ReactNode } from 'react'

export const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      className='App__page'
      spacing={{
        md: 9.5,
      }}
    >
      {children}
    </Stack>
  )
}
