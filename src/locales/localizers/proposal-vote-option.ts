import { VoteOption } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeProposalVoteOption = (t: TFunction, option: unknown) => {
  return {
    [VoteOption.Unspecified]: t('proposal-vote.unspecified-lbl'),
    [VoteOption.Yes]: t('proposal-vote.yes-lbl'),
    [VoteOption.Abstain]: t('proposal-vote.abstain-lbl'),
    [VoteOption.No]: t('proposal-vote.no-lbl'),
    [VoteOption.NoWithVeto]: t('proposal-vote.no-with-veto-lbl'),
    [VoteOption.Unrecognized]: t('proposal-vote.unrecognized-lbl'),
  }[option as VoteOption]
}
