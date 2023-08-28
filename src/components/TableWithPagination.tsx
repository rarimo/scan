import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from '@mui/material'
import { ChangeEvent, ReactNode } from 'react'

import NoData from '@/components/NoData'
import { TABLE_LIST_BODY_ROW_HEIGHT, TABLE_LIST_HEAD_ROW_HEIGHT } from '@/const'

const footerFont = {
  fontSize: 12,
  lineHeight: 1.66,
}

export default function TableWithPagination({
  label,
  headCells,
  rows,
  noDataTitle,
  noDataSubtitle,
  errorTitle,
  errorSubtitle,
  isMinHeighted = true,
  isLoadingError,
  isLoading,
  limit,
  offset,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
}: {
  label: string
  rows: ReactNode[]
  headCells: ReactNode[]
  noDataTitle?: string
  noDataSubtitle?: string
  errorTitle?: string
  errorSubtitle?: string
  isMinHeighted?: boolean
  isLoadingError: boolean
  isLoading: boolean
  limit: number
  offset: number
  count: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
}) {
  const theme = useTheme()

  const table = (
    <>
      <TableContainer
        sx={{
          ...(isMinHeighted && {
            minHeight: `calc(${TABLE_LIST_HEAD_ROW_HEIGHT}px + ${
              TABLE_LIST_BODY_ROW_HEIGHT * limit
            }px)`,
          }),
        }}
      >
        <Table stickyHeader aria-label={label}>
          <TableHead>
            <TableRow
              sx={{
                '& > .MuiTableCell-root': {
                  height: TABLE_LIST_HEAD_ROW_HEIGHT,
                },
              }}
            >
              {headCells}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& > .MuiTableRow-root > .MuiTableCell-root': {
                height: TABLE_LIST_BODY_ROW_HEIGHT,
              },
            }}
          >
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        SelectProps={{
          IconComponent: ArrowDropDownIcon,
        }}
        sx={{
          '& > .MuiToolbar-root': {
            ...(limit !== rows.length && isMinHeighted && { borderTop: 'var(--ui-border)' }),
            minHeight: 44,
            height: 44,
            '& > .MuiTablePagination-selectLabel': {
              ...footerFont,
              color: theme.palette.text.secondary,
            },
            '& > .MuiTablePagination-displayedRows': {
              ...footerFont,
            },
            '& > .MuiInputBase-root': {
              ...footerFont,
              pl: 0,
              mr: 3,

              '& > .MuiSvgIcon-root': {
                top: 4,
              },
            },
            '& > .MuiTablePagination-actions': {
              ml: 3.25,
              mr: 0,
            },
          },
        }}
        rowsPerPage={limit}
        page={offset / limit}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        count={count}
      />
    </>
  )

  return !isLoading && (!rows?.length || isLoadingError) ? (
    <NoData
      isError={isLoadingError}
      title={noDataTitle}
      subtitle={noDataSubtitle}
      errorTitle={errorTitle}
      errorSubtitle={errorSubtitle}
    />
  ) : (
    table
  )
}
