import { Chip } from '@mui/material'
import { VoteOption, voteOptionFromJSON } from '@rarimo/client'
import { useMemo } from 'react'

import { useLocalize } from '@/hooks'

export default function ProposalVoteOption({ vote }: { vote?: string | number }) {
  const { localizeProposalVoteOption } = useLocalize()

  const voteOptionEnum = useMemo(() => {
    if (!vote) return
    return voteOptionFromJSON(vote)
  }, [vote])

  const getProposalVoteColor = () => {
    switch (voteOptionEnum) {
      case VoteOption.Abstain:
        return 'secondary'
      case VoteOption.Yes:
        return 'success'
      case VoteOption.No:
      case VoteOption.NoWithVeto:
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Chip
      label={localizeProposalVoteOption(voteOptionEnum) ?? ''}
      color={getProposalVoteColor() ?? 'primary'}
      variant={'outlined'}
    />
  )
}
