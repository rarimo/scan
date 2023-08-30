import { Box, Stack, Typography } from '@mui/material'

import Links404 from '@/components/Links404'
import { getI18n } from '@/locales/server'

export default async function NotFoundPage() {
  const t = await getI18n()

  return (
    <Stack alignItems={'center'} spacing={2}>
      <Box
        component={'img'}
        src={'/404.svg'}
        width={{ xs: 300, md: 611 }}
        height={{ xs: 215, md: 365 }}
        alt={'404'}
      />
      <Stack spacing={4}>
        <Typography fontSize={30} fontWeight={600} lineHeight={1.2}>
          {t('404.title')}
        </Typography>
        <Links404 />
      </Stack>
    </Stack>
  )
}
