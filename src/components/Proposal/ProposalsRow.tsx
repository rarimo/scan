import { Chip, Link as MuiLink, Skeleton, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AvatarName } from '@/components/Avatar'
import { ProposalsColumnIds } from '@/components/Proposal/Proposals'
import ProposalStatus from '@/components/Proposal/ProposalStatus'
import { OVERFLOW_SX } from '@/const'
import { RoutePaths } from '@/enums'
import { ProposalBaseFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useProposalMetadata } from '@/hooks'
import { TableColumn } from '@/types'

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

  const withSkeleton = (children: ReactNode, height?: number, width = '100%', ml?: string) =>
    isLoading ? (
      <Skeleton width={width} {...(height && { height })} sx={{ ...(ml && { ml }) }} />
    ) : (
      children
    )

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
        {withSkeleton(`#${proposal?.id}`, 0, '50px')}
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
          0,
          '260px',
        )}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          minWidth: columnMap[ProposalsColumnIds.Type]?.minWidth,
          maxWidth: columnMap[ProposalsColumnIds.Type]?.maxWidth,
        }}
      >
        {withSkeleton(<Chip label={metadata?.type} />, 32)}
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
          22,
          '430px',
        )}
      </TableCell>

      <TableCell
        sx={{
          minWidth: columnMap[ProposalsColumnIds.Status]?.minWidth,
          maxWidth: columnMap[ProposalsColumnIds.Status]?.maxWidth,
        }}
        align={columnMap[ProposalsColumnIds.Status]?.align}
      >
        {withSkeleton(<ProposalStatus status={proposal?.status ?? ''} />, 32)}
      </TableCell>
    </TableRow>
  )
}
