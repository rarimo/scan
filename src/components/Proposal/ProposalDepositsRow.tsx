import { BN, time } from '@distributedlab/tools'
import { Link as MuiLink, Skeleton, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AvatarName } from '@/components'
import { CONFIG } from '@/config'
import { RoutePaths } from '@/enums'
import { ProposalDepositFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { TableColumn } from '@/types'

import { ProposalDepositsColumnIds } from './ProposalDeposits'

export default function ProposalDepositsRow({
  deposit,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ProposalDepositsColumnIds>[]
  deposit?: ProposalDepositFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<ProposalDepositsColumnIds>(columns)

  const withSkeleton = (children: ReactNode, height?: number, width = '100%', ml?: string) =>
    isLoading ? (
      <Skeleton width={width} {...(height && { height })} sx={{ ...(ml && { ml }) }} />
    ) : (
      children
    )

  const depositAmount = `${BN.fromBigInt(
    deposit?.amount?.[0]?.amount ?? '0',
    CONFIG.DECIMALS,
  ).format({
    decimals: 2,
  })} ${CONFIG.DENOM.toUpperCase()}`

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={columnMap[ProposalDepositsColumnIds.Depositor]?.sx}
        align={columnMap[ProposalDepositsColumnIds.Depositor].align}
      >
        {withSkeleton(
          <AvatarName address={deposit?.depositor_address ?? ''} abbrAddress={false} />,
          22,
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ProposalDepositsColumnIds.Tx]?.sx}
        align={columnMap[ProposalDepositsColumnIds.Tx].align}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Transaction, {
              hash: `${deposit?.block?.transactions[0].hash}`,
            })}
          >
            {deposit?.block?.transactions[0].hash}
          </MuiLink>,
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ProposalDepositsColumnIds.Block]?.sx}
        align={columnMap[ProposalDepositsColumnIds.Block].align}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Block, {
              height: `${deposit?.block?.height}` ?? '',
            })}
          >
            {deposit?.block?.height}
          </MuiLink>,
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ProposalDepositsColumnIds.Date]?.sx}
        align={columnMap[ProposalDepositsColumnIds.Date].align}
      >
        {withSkeleton(time(deposit?.block?.timestamp, { utc: true }).fromNow)}
      </TableCell>
      <TableCell
        sx={columnMap[ProposalDepositsColumnIds.Amount]?.sx}
        align={columnMap[ProposalDepositsColumnIds.Amount].align}
      >
        {withSkeleton(depositAmount)}
      </TableCell>
    </TableRow>
  )
}
