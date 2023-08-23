import { Chip } from '@mui/material'
import { ProposalStatus as ProposalStatusEnum, proposalStatusFromJSON } from '@rarimo/client'

import { useLocalize } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function ProposalStatus({ status }: { status?: string | number }) {
  const t = useI18n()
  const { localizeProposalStatus } = useLocalize()

  const getProposalStatusColor = (status?: string | number) => {
    if (!status) return 'default'

    switch (proposalStatusFromJSON(status)) {
      case ProposalStatusEnum.DepositPeriod:
      case ProposalStatusEnum.VotingPeriod:
      case ProposalStatusEnum.Unspecified:
      case ProposalStatusEnum.Unrecognized:
        return 'secondary'
      case ProposalStatusEnum.Passed:
        return 'primary'
      case ProposalStatusEnum.Rejected:
        return 'default'
      case ProposalStatusEnum.Failed:
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Chip
      label={localizeProposalStatus(status) ?? t('proposal-status.unrecognized-lbl')}
      color={getProposalStatusColor(status) ?? 'primary'}
      variant={'outlined'}
    />
  )
}
