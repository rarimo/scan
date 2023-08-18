'use client'
import { ReactNode } from 'react'

import { useLocalize } from '@/hooks'

export const YupProvider = ({ children }: { children: ReactNode }) => {
  const { init } = useLocalize()
  init()
  return <>{children}</>
}
