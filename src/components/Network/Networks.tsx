'use client'

import { TableCell } from '@mui/material'

import { getNetworkCount, getNetworkList } from '@/callers'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { NetworkFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TableColumn } from '@/types'

import NetworksRow from './NetworksRow'

export enum NetworkColumnIds {
  Name = 'name',
  Type = 'type',
  Parameters = 'parameters',
}

export default function Networks() {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: count,
    isLoading: isLoadingCount,
    isLoadingError: isLoadingCountError,
  } = useLoading<number>(0, getNetworkCount)

  const { data, isLoading, isLoadingError } = useLoading<NetworkFragment[]>(
    [],
    () => getNetworkList(limit, offset),
    {
      loadArgs: [limit, offset],
    },
  )

  const columns: readonly TableColumn<NetworkColumnIds>[] = [
    {
      id: NetworkColumnIds.Name,
      label: t('networks.name-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      id: NetworkColumnIds.Type,
      label: t('networks.type-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      id: NetworkColumnIds.Parameters,
      label: t('networks.params-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 220,
        maxWidth: 220,
      },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as NetworkFragment) : data).map((row, idx) => (
    <NetworksRow columns={columns} row={row} isLoading={isLoading} key={idx} />
  ))

  return (
    <ContentSection title={t('networks.table-lbl')}>
      <ContentBox>
        <ContentWrapper>
          <TableWithPagination
            label={t('networks.table-lbl')}
            noDataTitle={t('networks.no-data-title')}
            noDataSubtitle={t('networks.no-data-subtitle')}
            errorTitle={t('networks.error-title')}
            errorSubtitle={t('networks.error-subtitle')}
            isLoadingError={isLoadingError || isLoadingCountError}
            isLoading={isLoading || isLoadingCount}
            limit={limit}
            offset={offset}
            count={count}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            headCells={headCells}
            rows={rows}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
