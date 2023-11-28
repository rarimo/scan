import { OpType } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeOperationType = (t: TFunction, type: OpType) =>
  ({
    [OpType.Transfer]: t('operation-type.transfer-lbl'),
    [OpType.ChangeParties]: t('operation-type.change-parties-lbl'),
    [OpType.FeeTokenManagement]: t('operation-type.fee-token-management-lbl'),
    [OpType.ContractUpgrade]: t('operation-type.contract-upgrade-lbl'),
    [OpType.IdentityDefaultTransfer]: t('operation-type.identity-default-transfer-lbl'),
    [OpType.IdentityAggregatedTransfer]: t('operation-type.identity-aggregated-transfer-lbl'),
    [OpType.IdentityGistTransfer]: t('operation-type.identity-gist-transfer-lbl'),
    [OpType.IdentityStateTransfer]: t('operation-type.identity-state-transfer-lbl'),
    [OpType.Unrecognized]: t('operation-type.unrecognized-lbl'),
  })[type]
