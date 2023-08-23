'use client'

import { Chip } from '@mui/material'

import { useI18n } from '@/locales/client'

export default function TransactionStatus({ status }: { status?: boolean }) {
  const t = useI18n()

  return (
    <Chip
      color={status ? 'success' : 'error'}
      label={status ? t('transactions-list.successful') : t('transactions-list.unsuccessful')}
      variant={'outlined'}
    />
  )
}
