import '@/styles/index.scss'

import { isString } from 'lodash-es'
import localFont from 'next/font/local'
import { ReactNode, useMemo } from 'react'

import { MainLayout, StatusMessage } from '@/components'
import {
  ApolloProvider,
  AppStateProvider,
  I18nProvider,
  ThemeProvider,
  ViewportProvider,
  YupProvider,
} from '@/providers'
import { Locale } from '@/types'

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

const AVAILABLE_LOCALES = Object.values(Locale).filter(i => isString(i) && !Number.isNaN(Number(i)))
const DEFAULT_LOCALE = Locale.English

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const locale = useMemo(() => {
    if (!params.locale || !AVAILABLE_LOCALES.includes(params.locale as Locale)) {
      return DEFAULT_LOCALE
    }
    return params.locale as Locale
  }, [params.locale])

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <AppStateProvider>
          <ThemeProvider options={{ key: 'mui' }}>
            <ViewportProvider>
              <I18nProvider locale={locale}>
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
