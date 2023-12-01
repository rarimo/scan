import { SxProps, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { ReactNode } from 'react'

import NoDataTableRow from '@/components/NoDataTableRow'
import { TABLE_OVERVIEW_CELL_HEIGHT } from '@/const'

const HEADING_WIDTH = 380

const CELL_SX = {
  height: { xs: 'auto', md: TABLE_OVERVIEW_CELL_HEIGHT },
  display: {
    xs: 'flex',
    md: 'table-cell',
  },
  '&:first-child': {
    padding: {
      xs: '16px 16px 8px',
      md: 2,
    },
    alignItems: {
      xs: 'flex-end',
      md: 'unset',
    },
  },
  '&:last-child': {
    padding: {
      xs: '0 16px 16px',
      md: 2,
    },
    alignItems: {
      xs: 'flex-start',
      md: 'unset',
    },
  },
}

export default function OverviewTable({
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
}) {
  const content =
    children ||
    (!isEmpty && isLoadingError ? (
      <NoDataTableRow message={noDataMessage} colSpan={2} error={isLoadingError} />
    ) : (
      <>
        {rows?.map(({ head, body }, index) => (
          <TableRow
            sx={{
              display: {
                xs: 'flex',
                md: 'table-row',
              },
              flexDirection: {
                xs: 'column',
                md: 'unset',
              },
              '& > .MuiTableCell-root:first-child': {
                borderBottom: {
                  xs: 'none',
                  md: 'var(--ui-border)',
                },
              },
            }}
            key={index}
          >
            <TableCell
              sx={{
                ...CELL_SX,
                minWidth: HEADING_WIDTH,
                color: theme => theme.palette.text.secondary,
                textTransform: 'unset',
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.42,
                whiteSpace: 'nowrap',
              }}
              component='th'
              scope='row'
              variant='head'
            >
              {head}
            </TableCell>
            <TableCell sx={{ ...CELL_SX }}>{body}</TableCell>
          </TableRow>
        ))}
      </>
    ))

  return (
    <TableContainer
      sx={{
        maxWidth: 'var(--ui-max-width)',
        overflowY: 'hidden',
      }}
    >
      <Table aria-label={label}>
        <TableBody
          sx={
            sx || {
              '& > tr:last-child td, & > tr:last-child th': {
                borderBottom: 'none!important',
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
