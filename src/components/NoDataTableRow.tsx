'use client'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { AlertColor, Stack, TableCell, TableRow, Typography, useTheme } from '@mui/material'

import { useI18n } from '@/locales/client'

export const NoDataTableRow = ({
  colSpan,
  message,
  error,
}: {
  colSpan: number
  message?: string
  error?: boolean
}) => {
  const t = useI18n()
  const theme = useTheme()

  const msg = error ? t('common.loading-error-msg') : message

  const color = (error ? theme.palette.error.main : theme.palette.primary.main) as AlertColor

  const iconProps = {
    color,
    width: '1.35rem',
    height: '1.35rem',
    'aria-hidden': true,
    style: { minWidth: '1.35rem', minHeight: '1.35rem' },
  }
  const icon = error ? <ErrorOutlineIcon {...iconProps} /> : <WarningAmberIcon {...iconProps} />

  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
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
      </TableCell>
    </TableRow>
  )
}
