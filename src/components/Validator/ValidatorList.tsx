import { TableCell, TableSortLabel } from '@mui/material'

import TableHeadCellWithTip from '@/components/TableHeadCellWithTip'
import TableWithPagination from '@/components/TableWithPagination'
import ValidatorConditionTableHead from '@/components/Validator/ValidatorConditionTableHead'
import ValidatorListRow from '@/components/Validator/ValidatorListRow'
import { OVERFLOW_SX } from '@/const'
import { ValidatorListColumnIds } from '@/enums'
import { SlashingParamsFragment, StakingPoolFragment, ValidatorBaseFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { SortOrder, TableColumn, TableListProps, ValidatorListSortBy } from '@/types'

export default function ValidatorList({
  limit,
  offset,
  order,
  orderBy,
  list,
  slashingParams,
  stakingPool,
  count,
  isLoading,
  isLoadingError,
  setSort,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableListProps<ValidatorBaseFragment> & {
  slashingParams?: SlashingParamsFragment
  stakingPool?: StakingPoolFragment
  order?: SortOrder
  orderBy?: ValidatorListSortBy
  setSort: (orderBy: ValidatorListSortBy) => void
}) {
  const t = useI18n()

  const columns: readonly TableColumn<ValidatorListColumnIds>[] = [
    {
      id: ValidatorListColumnIds.Validator,
      label: t('validator-list.validator-col-lbl'),
      sx: { ...OVERFLOW_SX, minWidth: 365, maxWidth: 365 },
    },
    {
      id: ValidatorListColumnIds.VotingPower,
      label: t('validator-list.voting-power-col-lbl'),
      sx: { minWidth: 400, maxWidth: 400 },
    },
    {
      id: ValidatorListColumnIds.Commission,
      label: t('validator-list.commission-col-lbl'),
      sx: { minWidth: 320, maxWidth: 320 },
    },
    {
      id: ValidatorListColumnIds.Condition,
      label: t('validator-list.condition-col-lbl'),
      sx: { minWidth: 40, maxWidth: 40 },
    },
    {
      id: ValidatorListColumnIds.Status,
      label: t('validator-list.status-col-lbl'),
      sx: { minWidth: 100, maxWidth: 100 },
      align: 'right',
    },
  ]

  const getColumnHeadContent = (column: TableColumn<ValidatorListColumnIds>) => {
    if (column.id === ValidatorListColumnIds.Condition) {
      return <ValidatorConditionTableHead label={column.label} />
    }

    if (column.id === ValidatorListColumnIds.VotingPower) {
      return (
        <TableSortLabel
          active={orderBy === ValidatorListColumnIds.VotingPower}
          direction={orderBy === ValidatorListColumnIds.VotingPower ? order : 'asc'}
          onClick={() => {
            setSort(ValidatorListColumnIds.VotingPower)
          }}
        >
          <TableHeadCellWithTip
            label={column.label}
            align={'flex-start'}
            message={t('validator-list.voting-power-col-tip-lbl')}
          />
        </TableSortLabel>
      )
    }

    if (column.id === ValidatorListColumnIds.Commission) {
      return (
        <TableSortLabel
          active={orderBy === ValidatorListColumnIds.Commission}
          direction={orderBy === ValidatorListColumnIds.Commission ? order : 'asc'}
          onClick={() => {
            setSort(ValidatorListColumnIds.Commission)
          }}
        >
          {column.label}
        </TableSortLabel>
      )
    }

    return column.label
  }

  const rows = (isLoading ? new Array(limit).fill({} as ValidatorBaseFragment) : list)?.map(
    (row, idx) => (
      <ValidatorListRow
        columns={columns}
        validator={row}
        slashingParams={slashingParams}
        bondedTokens={stakingPool?.bonded_tokens}
        isLoading={isLoading}
        key={idx}
      />
    ),
  )

  const headCells = columns?.map(column => (
    <TableCell
      key={column.id}
      align={column.align}
      sx={column.sx}
      sortDirection={orderBy === column.id ? order : false}
    >
      {getColumnHeadContent(column)}
    </TableCell>
  ))

  return (
    <TableWithPagination
      label={t('validator-list.table-lbl')}
      noDataMessage={t('validator-list.no-data-msg')}
      isLoadingError={isLoadingError}
      isLoading={isLoading}
      limit={limit}
      offset={offset}
      count={count}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      headCells={headCells}
      rows={rows}
    />
  )
}
