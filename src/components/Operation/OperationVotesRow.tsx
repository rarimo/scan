import { time } from '@distributedlab/tools'
import { Link as MuiLink, Skeleton, TableRow } from '@mui/material'
import { TableCell } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components/Avatar'
import { OperationVoteFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

import { OperationVotesColumnIds } from './OperationVoteList'
import OperationVoteOption from './OperationVoteOption'

export default function OperationVotesRow({
  vote,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<OperationVotesColumnIds>[]
  vote?: OperationVoteFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<OperationVotesColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={columnMap[OperationVotesColumnIds.Voter]?.sx}
        align={columnMap[OperationVotesColumnIds.Voter].align}
      >
        {withSkeleton(<AvatarName address={vote?.validator ?? ''} abbrAddress={false} />, {
          height: 22,
          width: '100%',
        })}
      </TableCell>

      <TableCell
        sx={columnMap[OperationVotesColumnIds.Tx]?.sx}
        align={columnMap[OperationVotesColumnIds.Tx].align}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Transaction, {
              hash: `${vote?.tx}`,
            })}
          >
            {withSkeleton(vote?.tx, { width: '100%' })}
          </MuiLink>
        )}
      </TableCell>

      <TableCell
        sx={columnMap[OperationVotesColumnIds.Block]?.sx}
        align={columnMap[OperationVotesColumnIds.Block].align}
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
        sx={columnMap[OperationVotesColumnIds.Age]?.sx}
        align={columnMap[OperationVotesColumnIds.Age].align}
      >
        {withSkeleton(time(vote?.block?.timestamp, { utc: true }).fromNow, { width: '100%' })}
      </TableCell>
      <TableCell
        sx={columnMap[OperationVotesColumnIds.Option]?.sx}
        align={columnMap[OperationVotesColumnIds.Option].align}
      >
        {withSkeleton(<OperationVoteOption vote={vote?.vote ?? ''} />, {
          width: '100%',
          height: 32,
        })}
      </TableCell>
    </TableRow>
  )
}
