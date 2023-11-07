import { PartyStatus } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeTSSStatus = (t: TFunction, status: PartyStatus) =>
  ({
    [PartyStatus.Active]: t('tss-status.active-lbl'),
    [PartyStatus.Frozen]: t('tss-status.frozen-lbl'),
    [PartyStatus.Slashed]: t('tss-status.slashed-lbl'),
    [PartyStatus.Inactive]: t('tss-status.inactive-lbl'),
    [PartyStatus.Unrecognized]: t('tss-status.unrecognized-lbl'),
  })[status]
