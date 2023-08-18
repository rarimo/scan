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
import { ChangeEvent } from 'react'

import { NoDataTableRow } from './NoDataTableRow'

const footerFont = {
  fontSize: 12,
  lineHeight: 1.66,
}

export const TableWithPagination = ({
  label,
  headCells,
  rows,
  noDataMessage,
  isLoadingError,
  isLoading,
  limit,
  offset,
  count,
  handleChangePage,
  handleChangeRowsPerPage,
}: {
  label: string
  rows: JSX.Element[]
  headCells: JSX.Element[]
  noDataMessage?: string
  isLoadingError: boolean
  isLoading: boolean
  limit: number
  offset: number
  count: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
}) => {
  const theme = useTheme()
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label={label}>
          <TableHead>
            <TableRow>{headCells}</TableRow>
          </TableHead>
          <TableBody>
            {rows}
            {!isLoading && (!rows?.length || isLoadingError) && (
              <NoDataTableRow
                message={noDataMessage}
                colSpan={headCells?.length}
                error={isLoadingError}
              />
            )}
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
}
