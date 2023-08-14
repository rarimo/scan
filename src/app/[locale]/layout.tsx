import '@/styles/index.scss'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

import { MainLayout, StatusMessage } from '@/components'
import { craftPageTitle, METADATA } from '@/config'
import {
  ApolloProvider,
  AppStateProvider,
  I18nProvider,
  ThemeProvider,
  ViewportProvider,
} from '@/providers'

const inter = localFont({
  display: 'swap',
  src: [
    {
      path: './Inter-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Inter-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  ...METADATA,
  title: craftPageTitle('Home'),
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale} className={inter.className}>
      <body>
        <AppStateProvider>
          <ThemeProvider options={{ key: 'mui' }}>
            <ViewportProvider>
              <I18nProvider locale={params.locale}>
                <ApolloProvider>
                  <MainLayout>{children}</MainLayout>
                  <StatusMessage />
                </ApolloProvider>
              </I18nProvider>
            </ViewportProvider>
          </ThemeProvider>
        </AppStateProvider>
      </body>
    </html>
  )
}
