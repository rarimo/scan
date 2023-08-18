import { SxProps, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { ReactNode } from 'react'

import { NoDataTableRow } from './NoDataTableRow'

export const OverviewTable = ({
  rows,
  children,
  label,
  noDataMessage,
  isEmpty,
  isLoadingError,
  sx,
}: {
  label?: string
  noDataMessage?: string
  isEmpty?: boolean
  isLoadingError?: boolean
  rows?: { head: string | ReactNode; body: string | ReactNode }[]
  children?: ReactNode
  sx?: SxProps
}) => {
  const content =
    children ||
    (!isEmpty && isLoadingError ? (
      <NoDataTableRow message={noDataMessage} colSpan={2} error={isLoadingError} />
    ) : (
      <>
        {rows?.map(({ head, body }, index) => (
          <TableRow key={index}>
            <TableCell
              sx={{
                width: { xs: 300, sm: 300 },
                minWidth: { xs: 300, sm: 'auto' },
                color: theme => theme.palette.text.secondary,
              }}
              component='th'
              scope='row'
              variant='head'
            >
              {head}
            </TableCell>
            <TableCell>{body}</TableCell>
          </TableRow>
        ))}
      </>
    ))

  return (
    <TableContainer>
      <Table aria-label={label}>
        <TableBody
          sx={
            sx || {
              '& > tr:last-child td, & > tr:last-child th': {
                border: 0,
              },
            }
          }
        >
          {content}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
