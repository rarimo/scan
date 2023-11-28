import { Chip } from '@mui/material'
import { OracleStatus as OracleStatusEnum, oracleStatusFromJSON } from '@rarimo/client'

import { useLocalize } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function OracleStatus({ status }: { status?: string | number }) {
  const t = useI18n()
  const { localizeOracleStatus } = useLocalize()

  const getTSSStatusColor = (status?: string | number) => {
    switch (oracleStatusFromJSON(status!)) {
      case OracleStatusEnum.Inactive:
      case OracleStatusEnum.Freezed:
        return 'secondary'
      case OracleStatusEnum.Active:
        return 'primary'
      case OracleStatusEnum.Slashed:
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Chip
      label={
        localizeOracleStatus(oracleStatusFromJSON(status!)) ?? t('oracle-status.unrecognized-lbl')
      }
      color={getTSSStatusColor(status) ?? 'primary'}
      variant={'outlined'}
    />
  )
}
