import { Link as MuiLink, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'

import { OVERFLOW_SX } from '@/const'
import { OracleBaseFragment } from '@/graphql'
import { createColumnMap, formatCurrencyWithDenom, generatePath } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

import { OraclesColumnIds } from './Oracles'
import OracleStatus from './OracleStatus'

export default function OraclesRow({
  oracle,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<OraclesColumnIds>[]
  oracle?: OracleBaseFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<OraclesColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={{
          ...OVERFLOW_SX,
          ...columnMap[OraclesColumnIds.Account]?.sx,
        }}
        align={columnMap[OraclesColumnIds.Account].align}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Oracle, {
              address: oracle?.account ?? '',
            })}
          >
            {oracle?.account}
          </MuiLink>,
          { width: '100%' },
        )}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          ...columnMap[OraclesColumnIds.Chain]?.sx,
        }}
      >
        {withSkeleton(oracle?.chain, columnMap[OraclesColumnIds.Chain]?.sx)}
      </TableCell>

      <TableCell
        sx={{
          ...OVERFLOW_SX,
          ...columnMap[OraclesColumnIds.Stake]?.sx,
        }}
      >
        {withSkeleton(
          formatCurrencyWithDenom(oracle?.stake),
          columnMap[OraclesColumnIds.Stake]?.sx,
        )}
      </TableCell>

      <TableCell
        sx={{
          ...columnMap[OraclesColumnIds.Status]?.sx,
        }}
        align={columnMap[OraclesColumnIds.Status]?.align}
      >
        {withSkeleton(<OracleStatus status={oracle?.status ?? ''} />, {
          height: 32,
          width: '100%',
        })}
      </TableCell>
    </TableRow>
  )
}
