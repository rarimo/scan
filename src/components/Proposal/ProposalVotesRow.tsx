import { time } from '@distributedlab/tools'
import { Link as MuiLink, Skeleton, TableRow } from '@mui/material'
import { TableCell } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components/Avatar'
import ProposalVoteOption from '@/components/Proposal/ProposalVoteOption'
import { ProposalVotesColumnIds } from '@/components/Proposal/ProposalVotes'
import { ProposalVoteFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

export default function ProposalVotesRow({
  vote,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ProposalVotesColumnIds>[]
  vote?: ProposalVoteFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<ProposalVotesColumnIds>(columns)

  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={columnMap[ProposalVotesColumnIds.Voter]?.sx}
        align={columnMap[ProposalVotesColumnIds.Voter].align}
      >
        {withSkeleton(<AvatarName address={vote?.voter_address ?? ''} abbrAddress={false} />, {
          height: 22,
          width: '100%',
        })}
      </TableCell>

      <TableCell
        sx={columnMap[ProposalVotesColumnIds.Tx]?.sx}
        align={columnMap[ProposalVotesColumnIds.Tx].align}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Transaction, {
              hash: `${vote?.block?.transactions[0]?.hash}`,
            })}
          >
            {withSkeleton(vote?.block?.transactions[0]?.hash, { width: '100%' })}
          </MuiLink>
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ProposalVotesColumnIds.Block]?.sx}
        align={columnMap[ProposalVotesColumnIds.Block].align}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Block, {
              height: `${vote?.height}` ?? '',
            })}
          >
            {vote?.height}
          </MuiLink>,
          { width: '100%' },
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ProposalVotesColumnIds.Date]?.sx}
        align={columnMap[ProposalVotesColumnIds.Date].align}
      >
        {withSkeleton(time(vote?.block?.timestamp, { utc: true }).fromNow, { width: '100%' })}
      </TableCell>
      <TableCell
        sx={columnMap[ProposalVotesColumnIds.Option]?.sx}
        align={columnMap[ProposalVotesColumnIds.Option].align}
      >
        {withSkeleton(<ProposalVoteOption vote={vote?.option ?? ''} />, {
          width: '100%',
          height: 32,
        })}
      </TableCell>
    </TableRow>
  )
}
