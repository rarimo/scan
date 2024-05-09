import { BN, time } from '@distributedlab/tools'
import { Link as MuiLink, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components'
import { CONFIG } from '@/config'
import { ProposalDepositFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

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

  const withSkeleton = useSkeleton(isLoading)

  const depositAmount = `${BN.fromBigInt(
    deposit?.amount?.[0]?.amount ?? '0',
    CONFIG.DECIMALS,
  ).format({
    decimals: 2,
  })} ${CONFIG.DENOM.toUpperCase()}`

  console.log(deposit)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={columnMap[ProposalDepositsColumnIds.Depositor]?.sx}
        align={columnMap[ProposalDepositsColumnIds.Depositor].align}
      >
        {withSkeleton(
          <AvatarName address={deposit?.depositor_address ?? ''} abbrAddress={false} />,
          {
            width: '100%',
            height: 22,
          },
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
              hash: `${deposit?.block?.transactions?.[0]?.hash}`,
            })}
          >
            {deposit?.block?.transactions?.[0]?.hash}
          </MuiLink>,
          {
            width: '100%',
          },
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
          {
            width: '100%',
          },
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ProposalDepositsColumnIds.Date]?.sx}
        align={columnMap[ProposalDepositsColumnIds.Date].align}
      >
        {withSkeleton(time(deposit?.block?.timestamp, { utc: true }).fromNow, {
          width: '100%',
        })}
      </TableCell>
      <TableCell
        sx={columnMap[ProposalDepositsColumnIds.Amount]?.sx}
        align={columnMap[ProposalDepositsColumnIds.Amount].align}
      >
        {withSkeleton(depositAmount, {
          width: '100%',
        })}
      </TableCell>
    </TableRow>
  )
}
