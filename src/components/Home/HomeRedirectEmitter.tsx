'use client'
import { useEffect } from 'react'

import { Bus } from '@/helpers'

export const HomeRedirectEmitter = () => {
  useEffect(() => {
    Bus.emit(Bus.eventList.redirectToHome)
  }, [])
  return <></>
}
