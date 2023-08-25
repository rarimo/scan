import { TableCell } from '@mui/material'

import TableWithPagination from '@/components/TableWithPagination'
import ValidatorDelegationListRow from '@/components/Validator/ValidatorDelegationListRow'
import { OVERFLOW_SX } from '@/const'
import { GetValidatorDelegationListQuery, ValidatorBaseFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps, ValidatorDelegation } from '@/types'

export enum ValidatorDelagationListColumnIds {
  Address = 'address',
  Amount = 'amount',
}

export default function ValidatorDelegationList({
  data,
  limit,
  offset,
  isLoading,
  isLoadingError,
  handleChangePage,
  handleChangeRowsPerPage,
}: Omit<TableListProps<ValidatorBaseFragment>, 'count' | 'list'> & {
  data: GetValidatorDelegationListQuery
}) {
  const t = useI18n()

  const columns: readonly TableColumn<ValidatorDelagationListColumnIds>[] = [
    {
      id: ValidatorDelagationListColumnIds.Address,
      label: t('validator-delegation-list.address-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 350,
        maxWidth: 350,
      },
    },
    {
      id: ValidatorDelagationListColumnIds.Amount,
      label: t('validator-delegation-list.amount-col-lbl'),
      sx: {
        minWidth: 220,
        maxWidth: 220,
      },
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (
    isLoading
      ? new Array(limit).fill({} as ValidatorDelegation)
      : data?.action_validator_delegations?.delegations ?? []
  )?.map((row, idx) => (
    <ValidatorDelegationListRow
      columns={columns}
      delegation={row}
      isLoading={isLoading}
      key={idx}
    />
  ))

  return (
    <TableWithPagination
      isMinHeighted={false}
      label={t('validator-delegation-list.table-lbl')}
      noDataMessage={t('validator-delegation-list.no-data-msg')}
      isLoadingError={isLoadingError}
      isLoading={isLoading}
      limit={limit}
      offset={offset}
      count={data?.action_validator_delegations?.pagination?.total ?? 0}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      headCells={headCells}
      rows={rows}
    />
  )
}
