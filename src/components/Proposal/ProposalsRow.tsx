import { Chip, Link as MuiLink, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components/Avatar'
import { ProposalsColumnIds } from '@/components/Proposal/Proposals'
import ProposalStatus from '@/components/Proposal/ProposalStatus'
import { OVERFLOW_SX } from '@/const'
import { ProposalBaseFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useProposalMetadata, useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

export default function ProposalsRow({
  proposal,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ProposalsColumnIds>[]
  proposal?: ProposalBaseFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<ProposalsColumnIds>(columns)

  const { metadata } = useProposalMetadata(proposal)

  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={{
          ...OVERFLOW_SX,
          maxWidth: columnMap[ProposalsColumnIds.Id]?.maxWidth,
          minWidth: columnMap[ProposalsColumnIds.Id]?.minWidth,
        }}
        align={columnMap[ProposalsColumnIds.Id].align}
      >
        {withSkeleton(`#${proposal?.id}`, { width: '50px' })}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          maxWidth: columnMap[ProposalsColumnIds.Title]?.maxWidth,
          minWidth: columnMap[ProposalsColumnIds.Title]?.minWidth,
        }}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Proposal, { id: `${proposal?.id}` })}
          >
            {metadata?.title}
          </MuiLink>,
          { width: '260px' },
        )}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          minWidth: columnMap[ProposalsColumnIds.Type]?.minWidth,
          maxWidth: columnMap[ProposalsColumnIds.Type]?.maxWidth,
        }}
      >
        {withSkeleton(<Chip label={metadata?.type} />, { height: 32, width: '100%' })}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          minWidth: columnMap[ProposalsColumnIds.Proposer]?.minWidth,
          maxWidth: columnMap[ProposalsColumnIds.Proposer]?.maxWidth,
        }}
      >
        {withSkeleton(
          <AvatarName address={proposal?.proposer_address ?? ''} abbrAddress={false} />,
          {
            height: 22,
            width: '430px',
          },
        )}
      </TableCell>

      <TableCell
        sx={{
          minWidth: columnMap[ProposalsColumnIds.Status]?.minWidth,
          maxWidth: columnMap[ProposalsColumnIds.Status]?.maxWidth,
        }}
        align={columnMap[ProposalsColumnIds.Status]?.align}
      >
        {withSkeleton(<ProposalStatus status={proposal?.status ?? ''} />, {
          height: 32,
          width: '100%',
        })}
      </TableCell>
    </TableRow>
  )
}
