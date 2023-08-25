import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { craftPageTitle, METADATA } from '@/config'

export const metadata: Metadata = {
  ...METADATA,
  title: craftPageTitle('404'),
}

export default function NotFoundCatchAll() {
  notFound()
  return null
}
