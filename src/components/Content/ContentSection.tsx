'use-client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import { useI18n } from '@/locales/client'

export default function ContentSection({
  title,
  action,
  children,
  withBackButton = false,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  withBackButton?: boolean
}) {
  const t = useI18n()
  const theme = useTheme()
  const router = useRouter()

  return (
    <Stack component='section' spacing={theme.spacing(withBackButton ? 8 : 3)}>
      {(title || action) && (
        <Stack direction='row' alignItems='center' flex={1}>
          {withBackButton && (
            <IconButton
              onClick={router.back}
              sx={{
                width: theme.spacing(5),
                height: theme.spacing(5),
                mr: theme.spacing(6),
              }}
              aria-label={t('common.back-btn')}
            >
              <ArrowBackIcon aria-hidden='true' />
            </IconButton>
          )}

          <Stack
            className='Section__header'
            direction='row'
            alignItems='center'
            flex={1}
            justifyContent='space-between'
            height='56px'
          >
            {title && (
              <Typography variant='h4' sx={{ fontSize: 30 }}>
                {title}
              </Typography>
            )}
            {action}
          </Stack>
        </Stack>
      )}

      {children}
    </Stack>
  )
}
