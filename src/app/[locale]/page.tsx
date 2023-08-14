import { Stack, Typography } from '@mui/material'
import localFont from 'next/font/local'

import { HomeLatestData, HomeStatistics } from '@/components'
import { getI18n } from '@/locales/server'

const oswald = localFont({
  display: 'swap',
  variable: '--txt-home-page-title-font',
  src: [
    {
      path: './Oswald-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
})

const TITLE_PARTS_PROPS = {
  ...oswald.style,
  component: 'span',
  fontWeight: 600,
  fontSize: '64px',
  lineHeight: 1.25,
}

export default async function Home() {
  const t = await getI18n()

  return (
    <Stack spacing={13}>
      <Typography maxWidth={700}>
        <Typography {...TITLE_PARTS_PROPS}>{t('home.title-part-1')}</Typography>
        <Typography
          {...TITLE_PARTS_PROPS}
          sx={{
            textDecoration: 'underline',
            textUnderlineOffset: '8px',
            textDecorationThickness: '3px',
            color: 'var(--col-primary-main)',
          }}
        >
          {t('home.title-part-2')}
        </Typography>
        <Typography {...TITLE_PARTS_PROPS}>{t('home.title-part-3')}</Typography>
      </Typography>
      <Stack spacing={4}>
        <HomeStatistics />
        <HomeLatestData />
      </Stack>
    </Stack>
  )
}
