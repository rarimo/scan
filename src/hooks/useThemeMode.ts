'use client'

import { createTheme, useMediaQuery } from '@mui/material'
import { useEffect, useMemo } from 'react'

import { ThemeMode } from '@/enums'
import { useAppState } from '@/hooks'
import { COMPONENTS, PALETTE, typographyTheme } from '@/theme'

const THEME_CLASSES = {
  [ThemeMode.Light]: 'App__light',
  [ThemeMode.Dark]: 'App__dark',
}

export const useThemeMode = () => {
  const { themeMode, setThemeMode, isInitialised } = useAppState()
  const isPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const mode = useMemo(() => {
    if (themeMode) return themeMode
    if (isPrefersDarkMode) return ThemeMode.Dark
    return ThemeMode.Light
  }, [themeMode, isPrefersDarkMode])

  const isDarkThemeMode = useMemo(() => mode === ThemeMode.Dark, [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        document.body.classList.remove(THEME_CLASSES[themeMode as ThemeMode])
        const newMode = themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
        setThemeMode(newMode)
        document.body.classList.add(THEME_CLASSES[newMode])
      },
    }),
    [setThemeMode, themeMode],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...PALETTE[themeMode],
        },
        typography: typographyTheme,
        components: COMPONENTS,
        shape: {
          borderRadius: 0,
        },
      }),
    [mode, themeMode],
  )

  useEffect(() => {
    if (!isInitialised) return
    document.body.classList.add(
      THEME_CLASSES[themeMode as ThemeMode] ||
        THEME_CLASSES[isPrefersDarkMode ? ThemeMode.Dark : ThemeMode.Light],
    )
    if (themeMode) return
    setThemeMode(mode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialised])

  return { colorMode, theme, isDarkThemeMode }
}
