import { Chip, Link as MuiLink, Skeleton, TableRow } from '@mui/material'
import { TableCell } from '@mui/material'
import { NetworkType } from '@rarimo/client'
import Link from 'next/link'
import { useMemo } from 'react'

import { NetworkFragment } from '@/graphql'
import { createColumnMap, generatePath } from '@/helpers'
import { useLocalize, useSkeleton } from '@/hooks'
import { RoutePaths, TableColumn } from '@/types'

import NetworkParameters from './NetworkParameters'
import { NetworkColumnIds } from './Networks'

export default function NetworksRow({
  row,
  columns,
  isLoading,
}: {
  columns: readonly TableColumn<NetworkColumnIds>[]
  row?: NetworkFragment
  isLoading: boolean
}) {
  const { localizeNetworkType } = useLocalize()

  const columnMap = createColumnMap<NetworkColumnIds>(columns)
  const withSkeleton = useSkeleton(isLoading)

  const networkType = useMemo(
    () => localizeNetworkType(row?.type as NetworkType),
    [localizeNetworkType, row?.type],
  )

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={columnMap[NetworkColumnIds.Name]?.sx}
        align={columnMap[NetworkColumnIds.Name].align}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Network, {
              name: `${row?.name}`,
            })}
          >
            {withSkeleton(row?.name, { width: '100%' })}
          </MuiLink>
        )}
      </TableCell>

      <TableCell
        sx={columnMap[NetworkColumnIds.Type]?.sx}
        align={columnMap[NetworkColumnIds.Type].align}
      >
        {withSkeleton(<Chip label={networkType} />, {
          width: '100%',
          height: 32,
        })}
      </TableCell>

      <TableCell
        sx={columnMap[NetworkColumnIds.Parameters]?.sx}
        align={columnMap[NetworkColumnIds.Parameters].align}
      >
        {withSkeleton(
          <NetworkParameters
            params={row?.params}
            sx={{
              justifyContent: 'flex-end',
            }}
          />,
          {
            width: '100%',
            height: 32,
          },
        )}
      </TableCell>
    </TableRow>
  )
}
