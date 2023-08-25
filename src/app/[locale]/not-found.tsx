import { Stack, Typography } from '@mui/material'
import Image from 'next/image'

import Links404 from '@/components/Links404'
import { getI18n } from '@/locales/server'

export default async function NotFoundPage() {
  const t = await getI18n()

  return (
    <Stack alignItems={'center'} spacing={2}>
      <Image src={'/404.svg'} width={611} height={365} alt={'404'} />
      <Stack spacing={4}>
        <Typography fontSize={30} fontWeight={600} lineHeight={1.2}>
          {t('404.title')}
        </Typography>
        <Links404 />
      </Stack>
    </Stack>
  )
}
