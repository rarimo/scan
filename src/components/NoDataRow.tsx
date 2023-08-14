'use client'

import ReportIcon from '@mui/icons-material/Report'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { AlertColor, Stack, Typography, useTheme } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'

import { useI18n } from '@/locales/client'

interface INoDataTableRowProps {
  message?: string
  error?: boolean
}

export const NoDataRow = ({ message, error }: INoDataTableRowProps) => {
  const t = useI18n()
  const theme = useTheme()

  const msg = error ? t('common.loading-error-msg') : message

  const color = (
    error ? theme.palette.error.main : theme.palette.primary.main
  ) as OverridableStringUnion<AlertColor>

  const iconProps = {
    color,
    width: '1.35rem',
    height: '1.35rem',
    'aria-hidden': true,
    style: { minWidth: '1.35rem', minHeight: '1.35rem' },
  }
  const icon = error ? <ReportIcon {...iconProps} /> : <WarningAmberIcon {...iconProps} />

  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      spacing={theme.spacing(1)}
      direction={'row'}
    >
      {icon}
      <Typography
        color={color}
        variant={'body1'}
        sx={{ fontWeight: theme.typography.fontWeightMedium }}
      >
        {msg}
      </Typography>
    </Stack>
  )
}
