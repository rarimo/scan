import { time } from '@distributedlab/tools'
import { TableCell, TableRow } from '@mui/material'

import { AvatarName } from '@/components'
import { createColumnMap, formatCurrencyWithDenom } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { TableColumn, ValidatorUnbondingDelegation } from '@/types'

import { ValidatorUnbondingDelegationListColumnIds } from './ValidatorUnbondingDelegationList'

export default function ValidatorUnbondingDelegationListRow({
  delegation,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ValidatorUnbondingDelegationListColumnIds>[]
  delegation?: ValidatorUnbondingDelegation
  isLoading: boolean
}) {
  const columnMap = createColumnMap<ValidatorUnbondingDelegationListColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell sx={columnMap[ValidatorUnbondingDelegationListColumnIds.Address]?.sx}>
        {withSkeleton(
          <AvatarName address={delegation?.delegator_address ?? ''} abbrAddress={false} />,
          columnMap[ValidatorUnbondingDelegationListColumnIds.Address]?.sx,
        )}
      </TableCell>

      <TableCell sx={columnMap[ValidatorUnbondingDelegationListColumnIds.Amount]?.sx}>
        {withSkeleton(
          formatCurrencyWithDenom(delegation?.entries?.[0]?.balance),
          columnMap[ValidatorUnbondingDelegationListColumnIds.Amount]?.sx,
        )}
      </TableCell>

      <TableCell sx={columnMap[ValidatorUnbondingDelegationListColumnIds.Date]?.sx}>
        {withSkeleton(
          time(delegation?.entries?.[0]?.completion_time, { utc: true }).fromNow,
          columnMap[ValidatorUnbondingDelegationListColumnIds.Date]?.sx,
        )}
      </TableCell>
    </TableRow>
  )
}
