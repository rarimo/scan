import { OpStatus } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeOperationStatus = (t: TFunction, type: OpStatus) =>
  ({
    [OpStatus.Initialized]: t('operation-status.initialized'),
    [OpStatus.Approved]: t('operation-status.approved'),
    [OpStatus.NotApproved]: t('operation-status.not-approved'),
    [OpStatus.Signed]: t('operation-status.signed'),
    [OpStatus.Unrecognized]: t('operation-status.unrecognized'),
  })[type]
