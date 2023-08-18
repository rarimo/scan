import { BondStatus } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeValidatorStatus = (t: TFunction, status: BondStatus, jailed: boolean) => {
  // jailed and tombstone statuses are prioritised over their unbonding state
  if (jailed) return t('validator-status.jailed-lbl')

  return {
    [BondStatus.Bonded]: t('validator-status.active-lbl'),
    [BondStatus.Unbonding]: t('validator-status.unbonding-lbl'),
    [BondStatus.Unbonded]: t('validator-status.unbonded-lbl'),
    [BondStatus.Unrecognized]: t('validator-status.unrecognized-lbl'),
    [BondStatus.Unspecified]: t('validator-status.unspecified-lbl'),
  }[status]
}
