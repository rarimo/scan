'use client'

import { useEffect, useRef } from 'react'

import { isWindow } from '@/helpers'

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!isWindow()) return
    savedCallback.current()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWindow()])

  // @ts-ignore
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
