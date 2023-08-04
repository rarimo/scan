'use client'

import { ThemeProvider as MaterialThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'

import { ColorModeContext } from '@/contexts'
import { useThemeMode } from '@/hooks'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme, colorMode } = useThemeMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MaterialThemeProvider>
    </ColorModeContext.Provider>
  )
}
