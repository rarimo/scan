import { time } from '@distributedlab/tools'
import { TableCell, TableRow } from '@mui/material'

import { AvatarName } from '@/components'
import { createColumnMap, formatCurrencyWithDenom } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { TableColumn, ValidatorRedelegation } from '@/types'

import { ValidatorRedelegationListColumnIds } from './ValidatorRedelegationList'

export default function ValidatorRedelegationListRow({
  delegation,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ValidatorRedelegationListColumnIds>[]
  delegation?: ValidatorRedelegation
  isLoading: boolean
}) {
  const withSkeleton = useSkeleton(isLoading)
  const columnMap = createColumnMap<ValidatorRedelegationListColumnIds>(columns)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell sx={columnMap[ValidatorRedelegationListColumnIds.Address]?.sx}>
        {withSkeleton(
          <AvatarName address={delegation?.delegator_address ?? ''} abbrAddress={false} />,
          columnMap[ValidatorRedelegationListColumnIds.Address]?.sx,
        )}
      </TableCell>

      <TableCell sx={columnMap[ValidatorRedelegationListColumnIds.To]?.sx}>
        {withSkeleton(
          <AvatarName address={delegation?.validator_dst_address ?? ''} abbrAddress={false} />,
          columnMap[ValidatorRedelegationListColumnIds.To]?.sx,
        )}
      </TableCell>

      <TableCell sx={columnMap[ValidatorRedelegationListColumnIds.Amount]?.sx}>
        {withSkeleton(
          formatCurrencyWithDenom(delegation?.entries?.[0]?.balance),
          columnMap[ValidatorRedelegationListColumnIds.Amount]?.sx,
        )}
      </TableCell>

      <TableCell sx={columnMap[ValidatorRedelegationListColumnIds.Date]?.sx}>
        {withSkeleton(
          time(delegation?.entries?.[0]?.completion_time, { utc: true }).fromNow,
          columnMap[ValidatorRedelegationListColumnIds.Date]?.sx,
        )}
      </TableCell>
    </TableRow>
  )
}
