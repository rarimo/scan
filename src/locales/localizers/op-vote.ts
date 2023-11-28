import { OpVoteType } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeOperationVote = (t: TFunction, type: OpVoteType) =>
  ({
    [OpVoteType.Yes]: t('operation-vote-type.yes'),
    [OpVoteType.No]: t('operation-vote-type.no'),
    [OpVoteType.Unrecognized]: t('operation-vote-type.unrecognized'),
  })[type]
