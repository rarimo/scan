import { TableCell, TableRow } from '@mui/material'

import { AvatarName } from '@/components/Avatar'
import { createColumnMap, formatCurrencyWithDenom } from '@/helpers'
import { useSkeleton } from '@/hooks/useSkeleton'
import { TableColumn, ValidatorDelegation } from '@/types'

import { ValidatorDelagationListColumnIds } from './ValidatorDelegationList'

export default function ValidatorDelegationListRow({
  delegation,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ValidatorDelagationListColumnIds>[]
  delegation?: ValidatorDelegation
  isLoading: boolean
}) {
  const columnMap = createColumnMap<ValidatorDelagationListColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell sx={columnMap[ValidatorDelagationListColumnIds.Address]?.sx}>
        {withSkeleton(
          <AvatarName address={delegation?.delegator_address ?? ''} abbrAddress={false} />,
          columnMap[ValidatorDelagationListColumnIds.Address]?.sx,
        )}
      </TableCell>

      <TableCell sx={columnMap[ValidatorDelagationListColumnIds.Amount]?.sx}>
        {withSkeleton(
          formatCurrencyWithDenom(delegation?.coins?.[0]?.amount),
          columnMap[ValidatorDelagationListColumnIds.Address]?.sx,
        )}
      </TableCell>
    </TableRow>
  )
}
