'use client'

import { Search } from '@/components'
import { MEDIUM_BREAKPOINT } from '@/const'
import { useUiStore } from '@/hooks'

export default function HomeSearch() {
  const { viewportWidth } = useUiStore()
  const isSmall = MEDIUM_BREAKPOINT > viewportWidth

  return <Search size={isSmall ? 'medium' : 'default'} />
}
