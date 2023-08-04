'use client'

import { useEffect, useState } from 'react'

import { ThemeMode } from '@/enums'
import { isWindow } from '@/helpers'
import { UiStorage } from '@/storages'

export const useUiStore = () => {
  const [storage, setStorage] = useState<UiStorage | null>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [themeMode, setThemeMode] = useState<ThemeMode>('' as ThemeMode)

  useEffect(() => {
    if (!isWindow()) return

    const _storage = UiStorage.getInstance(() => window.localStorage)
    setStorage(_storage)

    const restored = _storage.getStorage({
      themeMode,
      viewportWidth: window.innerWidth,
    })

    setThemeMode(restored.themeMode ?? ('' as ThemeMode))
    setViewportWidth(restored.viewportWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!storage) return
    storage.save({ themeMode, viewportWidth })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeMode, viewportWidth, storage])

  return {
    viewportWidth,
    themeMode,
    setViewportWidth,
    setThemeMode,
  }
}
