import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Paper, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { useI18n } from '@/locales/client'

const ALIGN_CENTER_PROPS = {
  alignItems: 'center',
  justifyContent: 'center',
}

export default function NoData({
  title,
  errorTitle,
  subtitle,
  errorSubtitle,
  isError,
}: {
  title?: string
  errorTitle?: string
  subtitle?: string
  errorSubtitle?: string
  isError?: boolean
}) {
  const t = useI18n()
  const theme = useTheme()

  const Icon = useMemo(() => (isError ? WarningAmberRoundedIcon : ListAltRoundedIcon), [isError])

  const iconColor = useMemo(
    () => (isError ? theme.palette.error.main : theme.palette.action.active),
    [isError, theme.palette.error.main, theme.palette.action.active],
  )

  const titleColor = useMemo(
    () => (isError ? theme.palette.error.main : theme.palette.text.primary),
    [isError, theme.palette.error.main, theme.palette.text.primary],
  )

  const subtitleColor = useMemo(
    () => (isError ? theme.palette.error.main : theme.palette.text.secondary),
    [isError, theme.palette.error.main, theme.palette.text.secondary],
  )

  const _title = useMemo(() => {
    if (isError) return errorTitle || t('no-data.error-title-lbl')
    return title || t('no-data.title-lbl')
  }, [t, title, errorTitle, isError])

  const _subtitle = useMemo(() => {
    if (isError) return errorSubtitle || t('no-data.error-subtitle-lbl')
    return subtitle || t('no-data.subtitle-lbl')
  }, [t, subtitle, errorSubtitle, isError])

  return (
    <Stack
      {...ALIGN_CENTER_PROPS}
      padding={10}
      component={Paper}
      sx={{
        maxWidth: 'var(--ui-max-width)',
      }}
    >
      <Stack {...ALIGN_CENTER_PROPS} spacing={2}>
        <Paper
          sx={{
            bgcolor: 'var(--ui-paper-elevation-2)',
            width: 60,
            height: 60,
            borderRadius: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Icon
            sx={{
              color: iconColor,
            }}
          />
        </Paper>
        <Stack {...ALIGN_CENTER_PROPS} spacing={1}>
          <Typography
            variant={'subtitle1'}
            fontWeight={400}
            color={titleColor}
            textAlign={'center'}
          >
            {_title}
          </Typography>
          <Typography variant={'body2'} color={subtitleColor} textAlign={'center'}>
            {_subtitle}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
