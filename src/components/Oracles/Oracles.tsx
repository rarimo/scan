'use client'

import { TableCell } from '@mui/material'

import { getOracleCount, getOracleList } from '@/callers'
import TableWithPagination from '@/components/TableWithPagination'
import { OracleBaseFragment } from '@/graphql'
import { useLoading, useTablePagination } from '@/hooks'
import { useI18n } from '@/locales/client'
import { TableColumn } from '@/types'

import { ContentBox, ContentSection, ContentWrapper } from '../Content'
import OraclesRow from './OraclesRow'

export enum OraclesColumnIds {
  Account = 'account',
  Chain = 'chain',
  Stake = 'stake',
  Status = 'status',
}

export default function Oracles() {
  const t = useI18n()

  const { limit, offset, handleChangePage, handleChangeRowsPerPage } = useTablePagination()

  const {
    data: count,
    isLoading: isLoadingOracleCount,
    isLoadingError: isLoadingOracleCountError,
  } = useLoading<number>(0, getOracleCount)

  const { data, isLoading, isLoadingError } = useLoading<OracleBaseFragment[]>(
    [],
    () => getOracleList(limit, offset),
    {
      loadArgs: [limit, offset],
    },
  )

  const columns: readonly TableColumn<OraclesColumnIds>[] = [
    {
      id: OraclesColumnIds.Account,
      label: t('oracles.account-col-lbl'),
      sx: {
        minWidth: 260,
        maxWidth: 260,
      },
    },
    {
      id: OraclesColumnIds.Chain,
      label: t('oracles.chain-col-lbl'),
      sx: {
        minWidth: 150,
        maxWidth: 150,
      },
    },
    {
      id: OraclesColumnIds.Stake,
      label: t('oracles.stake-col-lbl'),
      sx: {
        minWidth: 200,
        maxWidth: 200,
      },
    },
    {
      id: OraclesColumnIds.Status,
      label: t('oracles.status-col-lbl'),
      sx: {
        minWidth: 150,
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

  const rows = (isLoading ? new Array(limit).fill({} as OracleBaseFragment) : data).map(
    (row, idx) => <OraclesRow columns={columns} oracle={row} isLoading={isLoading} key={idx} />,
  )

  return (
    <ContentSection withBackButton title={t('oracles.table-lbl')}>
      <ContentBox>
        <ContentWrapper>
          <TableWithPagination
            label={t('oracles.table-lbl')}
            noDataTitle={t('oracles.no-data-title')}
            noDataSubtitle={t('oracles.no-data-subtitle')}
            errorTitle={t('oracles.error-title')}
            errorSubtitle={t('oracles.error-subtitle')}
            isLoadingError={isLoadingError || isLoadingOracleCountError}
            isLoading={isLoading || isLoadingOracleCount}
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
