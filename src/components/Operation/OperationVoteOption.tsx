import { Chip } from '@mui/material'
import { OpVoteType, opVoteTypeFromJSON } from '@rarimo/client'
import { useMemo } from 'react'

import { useLocalize } from '@/hooks'

export default function OperationVoteOption({ vote }: { vote?: string | number }) {
  const { localizeOperationVote } = useLocalize()

  const voteOptionEnum = useMemo(() => opVoteTypeFromJSON(vote!), [vote])

  const getColor = () => {
    switch (voteOptionEnum) {
      case OpVoteType.Yes:
        return 'success'
      case OpVoteType.No:
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Chip
      label={localizeOperationVote(voteOptionEnum as OpVoteType)}
      color={getColor() ?? 'primary'}
      variant={'outlined'}
    />
  )
}
