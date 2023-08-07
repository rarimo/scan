'use client'

import { debounce } from 'lodash-es'
import { ReactNode, useEffect } from 'react'

import { useAppState } from '@/hooks'

export const ViewportProvider = ({ children }: { children: ReactNode }) => {
  const { setViewportWidth } = useAppState()

  const setViewportSizes = () => {
    assignVhCssVariable()
    setViewportWidth(window.innerWidth)
  }

  const assignVhCssVariable = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  const setViewportSizesDebounced = debounce(setViewportSizes, 300)

  useEffect(
    () => {
      assignVhCssVariable()
      window.addEventListener('resize', setViewportSizesDebounced)

      return () => window.removeEventListener('resize', setViewportSizesDebounced)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return <>{children}</>
}
