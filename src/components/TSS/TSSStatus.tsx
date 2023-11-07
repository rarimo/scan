import { Chip } from '@mui/material'
import { PartyStatus as PartyStatusEnum, partyStatusFromJSON } from '@rarimo/client'

import { useLocalize } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function TSSStatus({ status }: { status?: string | number }) {
  const t = useI18n()
  const { localizeTSSStatus } = useLocalize()

  const getTSSStatusColor = (status?: string | number) => {
    switch (partyStatusFromJSON(status!)) {
      case PartyStatusEnum.Inactive:
      case PartyStatusEnum.Frozen:
        return 'secondary'
      case PartyStatusEnum.Active:
        return 'primary'
      case PartyStatusEnum.Slashed:
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Chip
      label={localizeTSSStatus(partyStatusFromJSON(status!)) ?? t('tss-status.unrecognized-lbl')}
      color={getTSSStatusColor(status) ?? 'primary'}
      variant={'outlined'}
    />
  )
}
