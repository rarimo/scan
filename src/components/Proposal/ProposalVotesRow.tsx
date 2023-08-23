import { time } from '@distributedlab/tools'
import { Link as MuiLink, Skeleton, TableRow } from '@mui/material'
import { TableCell } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AvatarName } from '@/components/Avatar'
import ProposalVoteOption from '@/components/Proposal/ProposalVoteOption'
import { ProposalVotesColumnIds } from '@/components/Proposal/ProposalVotes'
import { RoutePaths } from '@/enums'
import { ProposalVoteFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { TableColumn } from '@/types'

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

  const withSkeleton = (children: ReactNode, height?: number, width = '100%', ml?: string) =>
    isLoading ? (
      <Skeleton width={width} {...(height && { height })} sx={{ ...(ml && { ml }) }} />
    ) : (
      children
    )

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={columnMap[ProposalVotesColumnIds.Voter]?.sx}
        align={columnMap[ProposalVotesColumnIds.Voter].align}
      >
        {withSkeleton(<AvatarName address={vote?.voter_address ?? ''} abbrAddress={false} />, 22)}
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
            {withSkeleton(vote?.block?.transactions[0]?.hash)}
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
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ProposalVotesColumnIds.Date]?.sx}
        align={columnMap[ProposalVotesColumnIds.Date].align}
      >
        {withSkeleton(time(vote?.block?.timestamp, { utc: true }).fromNow)}
      </TableCell>
      <TableCell
        sx={columnMap[ProposalVotesColumnIds.Option]?.sx}
        align={columnMap[ProposalVotesColumnIds.Option].align}
      >
        {withSkeleton(<ProposalVoteOption vote={vote?.option ?? ''} />, 32)}
      </TableCell>
    </TableRow>
  )
}
