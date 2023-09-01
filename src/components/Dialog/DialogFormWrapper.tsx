import { Button } from '@mui/material'
import { ReactNode } from 'react'

import Dialog from '@/components/Dialog/Dialog'
import { useI18n } from '@/locales/client'

export default function DialogFormWrapper({
  children,
  formId,
  title,
  isDisabled,
  isDialogOpened,
  closeDialog,
  actionBtnText,
}: {
  formId: string
  title: string
  isDisabled: boolean
  isDialogOpened: boolean
  closeDialog: () => void
  children: ReactNode
  actionBtnText?: string
}) {
  const t = useI18n()

  return (
    <Dialog
      action={[
        <Button
          variant='text'
          size='medium'
          onClick={closeDialog}
          key='cancel'
          disabled={isDisabled}
        >
          {t('common.cancel-btn')}
        </Button>,
        <Button type='submit' size='medium' form={formId} key='submit' disabled={isDisabled}>
          {actionBtnText || t('common.create-btn')}
        </Button>,
      ]}
      onClose={closeDialog}
      isOpened={isDialogOpened}
      title={title}
    >
      {children}
    </Dialog>
  )
}
