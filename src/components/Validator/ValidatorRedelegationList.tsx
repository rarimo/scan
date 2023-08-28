import { TableCell } from '@mui/material'

import TableWithPagination from '@/components/TableWithPagination'
import ValidatorRedelegationListRow from '@/components/Validator/ValidatorRedelegationListRow'
import { OVERFLOW_SX } from '@/const'
import { GetValidatorRedelegationListQuery, ValidatorBaseFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps, ValidatorRedelegation } from '@/types'

export enum ValidatorRedelegationListColumnIds {
  Address = 'address',
  To = 'to',
  Amount = 'amount',
  Date = 'date',
}

export default function ValidatorRedelegationList({
  data,
  limit,
  offset,
  isLoading,
  isLoadingError,
  handleChangePage,
  handleChangeRowsPerPage,
}: Omit<TableListProps<ValidatorBaseFragment>, 'count' | 'list'> & {
  data: GetValidatorRedelegationListQuery
}) {
  const t = useI18n()

  const columns: readonly TableColumn<ValidatorRedelegationListColumnIds>[] = [
    {
      id: ValidatorRedelegationListColumnIds.Address,
      label: t('validator-redelegation-list.address-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 250,
        maxWidth: 250,
      },
    },
    {
      id: ValidatorRedelegationListColumnIds.To,
      label: t('validator-redelegation-list.to-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 250,
        maxWidth: 250,
      },
    },
    {
      id: ValidatorRedelegationListColumnIds.Amount,
      label: t('validator-redelegation-list.amount-col-lbl'),
      sx: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      id: ValidatorRedelegationListColumnIds.Date,
      label: t('validator-redelegation-list.age-col-lbl'),
      minWidth: 120,
      maxWidth: 120,
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (
    isLoading
      ? new Array(limit).fill({} as ValidatorRedelegation)
      : data?.action_validator_redelegations_from?.redelegations ?? []
  )?.map((row, idx) => (
    <ValidatorRedelegationListRow
      columns={columns}
      delegation={row}
      isLoading={isLoading}
      key={idx}
    />
  ))

  return (
    <TableWithPagination
      isMinHeighted={false}
      label={t('validator-redelegation-list.table-lbl')}
      noDataTitle={t('validator-redelegation-list.no-data-title')}
      noDataSubtitle={t('validator-redelegation-list.no-data-subtitle')}
      errorTitle={t('validator-redelegation-list.error-title')}
      errorSubtitle={t('validator-redelegation-list.error-subtitle')}
      isLoadingError={isLoadingError}
      isLoading={isLoading}
      limit={limit}
      offset={offset}
      count={data?.action_validator_redelegations_from?.pagination?.total ?? 0}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      headCells={headCells}
      rows={rows}
    />
  )
}
