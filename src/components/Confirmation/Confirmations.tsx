'use client'

import { TableCell } from '@mui/material'

import { getConfirmationCount, getConfirmationList } from '@/callers'
import TableWithPagination from '@/components/TableWithPagination'
import { OVERFLOW_SX } from '@/const'
import { ConfirmationBaseFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TableColumn } from '@/types'

import { ContentBox, ContentSection, ContentWrapper } from '../Content'
import ConfirmationRow from './ConfirmationRow'

export enum ConfirmationColumnIds {
  Root = 'root',
  Creator = 'creator',
  Tx = 'tx',
  Block = 'block',
  Age = 'age',
}

export default function Confirmations() {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: count,
    isLoading: isLoadingCount,
    isLoadingError: isLoadingCountError,
  } = useLoading<number>(0, getConfirmationCount)

  const { data, isLoading, isLoadingError } = useLoading<ConfirmationBaseFragment[]>(
    [],
    () => getConfirmationList(limit, offset),
    {
      loadArgs: [limit, offset],
    },
  )

  const columns: readonly TableColumn<ConfirmationColumnIds>[] = [
    {
      id: ConfirmationColumnIds.Root,
      label: t('confirmations.root-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: ConfirmationColumnIds.Creator,
      label: t('confirmations.creator-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: ConfirmationColumnIds.Tx,
      label: t('confirmations.tx-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 100,
        maxWidth: 200,
      },
    },
    {
      id: ConfirmationColumnIds.Block,
      label: t('confirmations.block-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 120,
        maxWidth: 150,
      },
    },
    {
      id: ConfirmationColumnIds.Age,
      label: t('confirmations.age-col-lbl'),
      sx: {
        ...OVERFLOW_SX,
        minWidth: 120,
        maxWidth: 150,
      },
      align: 'right',
    },
  ]

  const headCells = columns.map(column => (
    <TableCell key={column.id} align={column.align} sx={column.sx}>
      {column.label}
    </TableCell>
  ))

  const rows = (isLoading ? new Array(limit).fill({} as ConfirmationBaseFragment) : data).map(
    (row, idx) => <ConfirmationRow columns={columns} row={row} isLoading={isLoading} key={idx} />,
  )

  return (
    <ContentSection withBackButton title={t('confirmations.table-lbl')}>
      <ContentBox>
        <ContentWrapper>
          <TableWithPagination
            label={t('confirmations.table-lbl')}
            noDataTitle={t('confirmations.no-data-title')}
            noDataSubtitle={t('confirmations.no-data-subtitle')}
            errorTitle={t('confirmations.error-title')}
            errorSubtitle={t('confirmations.error-subtitle')}
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
