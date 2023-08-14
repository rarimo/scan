'use-client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

import { useI18n } from '@/locales/client'

export const ContentSection = ({
  title,
  action,
  children,
  withBackButton = false,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  withBackButton?: boolean
}) => {
  const t = useI18n()
  const theme = useTheme()
  const router = useRouter()

  return (
    <Stack component='section' spacing={theme.spacing(3)}>
      {(title || action) && (
        <Stack direction='row' alignItems='center' flex={1}>
          {withBackButton && (
            <IconButton
              onClick={router.back}
              sx={{
                width: theme.spacing(3.5),
                height: theme.spacing(3.5),
                mr: theme.spacing(2),
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
            {title && <Typography variant='h4'>{title}</Typography>}
            {action}
          </Stack>
        </Stack>
      )}

      {children}
    </Stack>
  )
}
