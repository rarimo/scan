import { Chip } from '@mui/material'
import { BondStatus } from '@rarimo/client'

import { useLocalize } from '@/hooks'

export default function ValidatorStatus({
  status,
  jailed,
}: {
  status?: BondStatus
  jailed: boolean
}) {
  const { localizeValidatorStatus } = useLocalize()

  const getValidatorStatusColor = (status: BondStatus, jailed: boolean) => {
    // jailed status is prioritized over their unbonding state
    if (jailed) {
      return 'error'
    }

    switch (status) {
      case BondStatus.Bonded:
        return 'success'
      case BondStatus.Unbonding:
      case BondStatus.Unbonded:
        return 'warning'
      default:
        return 'info'
    }
  }

  return (
    <Chip
      label={localizeValidatorStatus(status ?? BondStatus.Unspecified, jailed) ?? ''}
      color={getValidatorStatusColor(status ?? BondStatus.Unspecified, jailed) ?? 'primary'}
      variant={'outlined'}
    />
  )
}
