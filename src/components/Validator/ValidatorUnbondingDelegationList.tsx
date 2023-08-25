import { TableCell } from '@mui/material'

import TableWithPagination from '@/components/TableWithPagination'
import ValidatorUnbondingDelegationListRow from '@/components/Validator/ValidatorUnbondingDelegationsListRow'
import { OVERFLOW_SX } from '@/const'
import { GetValidatorUnbondingDelegationListQuery, ValidatorBaseFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps, ValidatorUnbondingDelegation } from '@/types'

export enum ValidatorUnbondingDelegationListColumnIds {
  Address = 'address',
  Amount = 'amount',
  Date = 'date',
}

export default function ValidatorUnbondingDelegationList({
  data,
  limit,
  offset,
  isLoading,
  isLoadingError,
  handleChangePage,
  handleChangeRowsPerPage,
}: Omit<TableListProps<ValidatorBaseFragment>, 'count' | 'list'> & {
  data: GetValidatorUnbondingDelegationListQuery
}) {
  const t = useI18n()

  const columns: readonly TableColumn<ValidatorUnbondingDelegationListColumnIds>[] = [
    {
      id: ValidatorUnbondingDelegationListColumnIds.Address,
      label: t('validator-unbonding-delegation-list.address-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 300,
        maxWidth: 300,
      },
    },
    {
      id: ValidatorUnbondingDelegationListColumnIds.Amount,
      label: t('validator-unbonding-delegation-list.amount-col-lbl'),
      sx: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      id: ValidatorUnbondingDelegationListColumnIds.Date,
      label: t('validator-unbonding-delegation-list.age-col-lbl'),
      minWidth: 130,
      maxWidth: 130,
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (
    isLoading
      ? new Array(limit).fill({} as ValidatorUnbondingDelegation)
      : data?.action_validator_unbonding_delegations?.unbonding_delegations ?? []
  )?.map((row, idx) => (
    <ValidatorUnbondingDelegationListRow
      columns={columns}
      delegation={row}
      isLoading={isLoading}
      key={idx}
    />
  ))

  return (
    <TableWithPagination
      isMinHeighted={false}
      label={t('validator-unbonding-delegation-list.table-lbl')}
      noDataMessage={t('validator-unbonding-delegation-list.no-data-msg')}
      isLoadingError={isLoadingError}
      isLoading={isLoading}
      limit={limit}
      offset={offset}
      count={data?.action_validator_unbonding_delegations?.pagination?.total ?? 0}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      headCells={headCells}
      rows={rows}
    />
  )
}
