'use client'
import { useEffect } from 'react'

import { Bus } from '@/helpers'

export default function HomeRedirectEmitter() {
  useEffect(() => {
    Bus.emit(Bus.eventList.redirectToHome)
  }, [])
  return <></>
}
