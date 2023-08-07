'use client'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider as MaterialThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useServerInsertedHTML } from 'next/navigation'
import { ReactNode, useState } from 'react'

import { ColorModeContext } from '@/contexts'
import { useAppState, useThemeMode } from '@/hooks'

export const ThemeProvider = ({
  children,
  options,
}: {
  children: ReactNode
  options: { key: string }
}) => {
  const { isInitialised } = useAppState()
  const { theme, colorMode } = useThemeMode()

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return isInitialised ? (
    <CacheProvider value={cache}>
      <ColorModeContext.Provider value={colorMode}>
        <MaterialThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MaterialThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  ) : (
    <div />
  )
}
