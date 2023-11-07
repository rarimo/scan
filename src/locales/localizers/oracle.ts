import { OracleStatus } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeOracleStatus = (t: TFunction, status: OracleStatus) =>
  ({
    [OracleStatus.Active]: t('oracle-status.active-lbl'),
    [OracleStatus.Freezed]: t('oracle-status.freezed-lbl'),
    [OracleStatus.Slashed]: t('oracle-status.slashed-lbl'),
    [OracleStatus.Inactive]: t('oracle-status.inactive-lbl'),
    [OracleStatus.Unrecognized]: t('oracle-status.unrecognized-lbl'),
  })[status]
