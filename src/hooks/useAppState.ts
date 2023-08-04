'use client'

import { useContext } from 'react'

import { AppStateContext } from '@/contexts'

export function useAppState() {
  const context = useContext(AppStateContext)
  if (context) return context
  throw new Error('useAppState must be used within a AppStateContext')
}
