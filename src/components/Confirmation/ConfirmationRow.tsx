import { time } from '@distributedlab/tools'
import { Link as MuiLink, Skeleton, TableRow } from '@mui/material'
import { TableCell } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components/Avatar'
import { ConfirmationBaseFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

import { ConfirmationColumnIds } from './Confirmations'

export default function ConfirmationRow({
  row,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<ConfirmationColumnIds>[]
  row?: ConfirmationBaseFragment
  isLoading: boolean
}) {
  const columnMap = createColumnMap<ConfirmationColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={columnMap[ConfirmationColumnIds.Root]?.sx}
        align={columnMap[ConfirmationColumnIds.Root].align}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Confirmation, {
              root: row?.root ?? '',
            })}
          >
            {withSkeleton(row?.root, { width: '100%' })}
          </MuiLink>
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ConfirmationColumnIds.Creator]?.sx}
        align={columnMap[ConfirmationColumnIds.Creator].align}
      >
        {withSkeleton(<AvatarName address={row?.creator ?? ''} abbrAddress={false} />, {
          height: 22,
          width: '100%',
        })}
      </TableCell>

      <TableCell
        sx={columnMap[ConfirmationColumnIds.Tx]?.sx}
        align={columnMap[ConfirmationColumnIds.Tx].align}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Transaction, {
              hash: `${row?.tx}`,
            })}
          >
            {withSkeleton(row?.tx, { width: '100%' })}
          </MuiLink>
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ConfirmationColumnIds.Block]?.sx}
        align={columnMap[ConfirmationColumnIds.Block].align}
      >
        {withSkeleton(
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Block, {
              height: `${row?.height}` ?? '',
            })}
          >
            {row?.height}
          </MuiLink>,
          { width: '100%' },
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ConfirmationColumnIds.Age]?.sx}
        align={columnMap[ConfirmationColumnIds.Age].align}
      >
        {withSkeleton(time(row?.block?.timestamp, { utc: true }).fromNow, {
          width: '100%',
        })}
      </TableCell>
    </TableRow>
  )
}
