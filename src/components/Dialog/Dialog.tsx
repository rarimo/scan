import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog as DialogBase,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from '@mui/material'
import { uniqueId } from 'lodash-es'
import { ReactNode } from 'react'

import { useI18n } from '@/locales/client'

export default function Dialog({
  children,
  onClose,
  isOpened,
  title,
  action,
}: {
  children: ReactNode
  action: ReactNode
  onClose: () => void
  isOpened: boolean
  title: string
}) {
  const t = useI18n()
  const theme = useTheme()

  const dialogTitleId = `dialog-title-${uniqueId()}`
  const dialogPadding = theme.spacing(3)

  return (
    <DialogBase
      scroll='paper'
      onClose={onClose}
      aria-labelledby={dialogTitleId}
      open={isOpened}
      sx={{
        '& > .MuiDialog-container > .MuiPaper-root': {
          p: dialogPadding,
          minWidth: { xs: '95vw', sm: '500px' },
          maxWidth: { xs: '95vw', sm: '500px' },
          backgroundColor: 'var(--ui-paper-elevation-2)',
        },
      }}
    >
      <DialogTitle
        id={dialogTitleId}
        sx={{
          p: theme.spacing(0, 0, 2),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 48,
        }}
      >
        {title}

        <IconButton onClick={onClose} aria-label={t('common.close-btn')}>
          <CloseIcon aria-hidden='true' />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: theme.spacing(3, 0) }}>{children}</DialogContent>
      <DialogActions
        sx={{
          p: theme.spacing(3, 0, 0),
          borderTop: 'var(--ui-border)',

          '& > :not(:first-of-type)': {
            ml: theme.spacing(4),
          },
        }}
      >
        {action}
      </DialogActions>
    </DialogBase>
  )
}
