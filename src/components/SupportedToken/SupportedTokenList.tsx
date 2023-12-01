import { TableCell } from '@mui/material'

import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { CollectionBaseFragment } from '@/graphql'
import { useI18n } from '@/locales/client'
import { TableColumn, TableListProps } from '@/types'

import SupportedTokenListRow from './SupportedTokenListRow'

export enum CollectionColumnIds {
  Index = 'index',
  Name = 'name',
  Symbol = 'symbol',
  Chains = 'chains',
}

export default function SupportedTokenList({
  isLoading,
  isLoadingError,
  limit,
  offset,
  list,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableListProps<CollectionBaseFragment>) {
  const t = useI18n()

  const columns: readonly TableColumn<CollectionColumnIds>[] = [
    {
      id: CollectionColumnIds.Index,
      label: t('supported-token-list.index-col-lbl'),
      sx: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      id: CollectionColumnIds.Name,
      label: t('supported-token-list.name-col-lbl'),
      sx: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      id: CollectionColumnIds.Symbol,
      label: t('supported-token-list.symbol-col-lbl'),
      sx: {
        minWidth: 80,
        maxWidth: 80,
      },
    },
    {
      id: CollectionColumnIds.Chains,
      label: t('supported-token-list.chains-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 200,
        maxWidth: 200,
      },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as CollectionBaseFragment) : list).map(
    (row, idx) => (
      <SupportedTokenListRow columns={columns} row={row} isLoading={isLoading} key={idx} />
    ),
  )

  return (
    <TableWithPagination
      label={t('supported-token-list.table-lbl')}
      noDataTitle={t('supported-token-list.no-data-title')}
      noDataSubtitle={t('supported-token-list.no-data-subtitle')}
      errorTitle={t('supported-token-list.error-title')}
      errorSubtitle={t('supported-token-list.error-subtitle')}
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
