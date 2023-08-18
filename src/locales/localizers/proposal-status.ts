import { ProposalStatus, proposalStatusFromJSON } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeProposalStatus = (t: TFunction, status: unknown): string => {
  return {
    [ProposalStatus.Unspecified]: t('proposal-status.unspecified-lbl'),
    [ProposalStatus.DepositPeriod]: t('proposal-status.deposit-period-lbl'),
    [ProposalStatus.VotingPeriod]: t('proposal-status.voting-period-lbl'),
    [ProposalStatus.Passed]: t('proposal-status.passed-lbl'),
    [ProposalStatus.Rejected]: t('proposal-status.rejected-lbl'),
    [ProposalStatus.Failed]: t('proposal-status.failed-lbl'),
    [ProposalStatus.Unrecognized]: t('proposal-status.unrecognized-lbl'),
  }[proposalStatusFromJSON(String(status))]
}
