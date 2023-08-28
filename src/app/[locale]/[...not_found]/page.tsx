import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { createMetadata } from '@/config'

export function generateMetadata(): Metadata {
  return createMetadata('404')
}

export default function NotFoundCatchAll() {
  notFound()
  return null
}
