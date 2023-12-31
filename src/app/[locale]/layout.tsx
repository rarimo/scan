import '@/styles/index.scss'

import localFont from 'next/font/local'
import { ReactNode } from 'react'

import { MainLayout, StatusMessage } from '@/components'
import {
  ApolloProvider,
  AppStateProvider,
  I18nProvider,
  ThemeProvider,
  ViewportProvider,
  YupProvider,
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
                <YupProvider>
                  <ApolloProvider>
                    <MainLayout>{children}</MainLayout>
                    <StatusMessage />
                  </ApolloProvider>
                </YupProvider>
              </I18nProvider>
            </ViewportProvider>
          </ThemeProvider>
        </AppStateProvider>
      </body>
    </html>
  )
}
