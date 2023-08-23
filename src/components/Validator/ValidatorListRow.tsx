import { Skeleton, SxProps, TableCell, TableRow } from '@mui/material'
import { BondStatus } from '@rarimo/client'
import { ReactNode } from 'react'

import { AvatarName } from '@/components/Avatar'
import ValidatorCondition from '@/components/Validator/ValidatorCondition'
import ValidatorStatus from '@/components/Validator/ValidatorStatus'
import ValidatorVotingPower from '@/components/Validator/ValidatorVotingPower'
import { ValidatorListColumnIds } from '@/enums'
import { SlashingParamsFragment, ValidatorBaseFragment } from '@/graphql'
import { createColumnMap, formatToPercent } from '@/helpers'
import { useValidatorStats } from '@/hooks'
import { TableColumn } from '@/types'

export default function ValidatorListRow({
  validator,
  columns,
  slashingParams,
  bondedTokens,
  isLoading,
}: {
  columns: readonly TableColumn<ValidatorListColumnIds>[]
  validator?: ValidatorBaseFragment
  slashingParams?: SlashingParamsFragment
  bondedTokens?: string
  isLoading: boolean
}) {
  const columnMap = createColumnMap<ValidatorListColumnIds>(columns)

  const { condition, comission } = useValidatorStats({
    missedBlocksCounter: validator?.validator_signing_infos?.[0]?.missed_blocks_counter,
    signedBlocksWindow: slashingParams?.params?.signed_blocks_window,
    commission: validator?.validator_commissions?.[0]?.commission ?? 0,
  })

  const withSkeleton = (children: ReactNode, sx = {} as SxProps) =>
    isLoading ? (
      <Skeleton
        sx={{
          width: '100%',
          ...sx,
        }}
      />
    ) : (
      children
    )

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell
        sx={columnMap[ValidatorListColumnIds.Validator]?.sx}
        align={columnMap[ValidatorListColumnIds.Validator].align}
      >
        {withSkeleton(
          <AvatarName
            address={validator?.validator_info?.operator_address ?? ''}
            name={validator?.validator_descriptions?.[0]?.moniker ?? ''}
            imageUrl={validator?.validator_descriptions?.[0]?.avatar_url ?? ''}
            abbrAddress={false}
          />,
          columnMap[ValidatorListColumnIds.Validator]?.sx,
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ValidatorListColumnIds.VotingPower]?.sx}
        align={columnMap[ValidatorListColumnIds.VotingPower].align}
      >
        {withSkeleton(
          <ValidatorVotingPower
            votingPower={validator?.validator_voting_powers?.[0]?.voting_power}
            bondedTokens={bondedTokens}
          />,
          columnMap[ValidatorListColumnIds.VotingPower]?.sx,
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ValidatorListColumnIds.Commission]?.sx}
        align={columnMap[ValidatorListColumnIds.Commission].align}
      >
        {withSkeleton(formatToPercent(comission), columnMap[ValidatorListColumnIds.Commission]?.sx)}
      </TableCell>

      <TableCell
        sx={columnMap[ValidatorListColumnIds.Condition]?.sx}
        align={columnMap[ValidatorListColumnIds.Condition].align}
      >
        {withSkeleton(
          <ValidatorCondition condition={condition} />,
          columnMap[ValidatorListColumnIds.Condition]?.sx,
        )}
      </TableCell>

      <TableCell
        sx={columnMap[ValidatorListColumnIds.Status]?.sx}
        align={columnMap[ValidatorListColumnIds.Status].align}
      >
        {withSkeleton(
          <ValidatorStatus
            status={(validator?.validator_statuses?.[0]?.status as BondStatus) ?? ''}
            jailed={validator?.validator_statuses?.[0]?.jailed ?? false}
          />,
          {
            ...(columnMap[ValidatorListColumnIds.Status]?.sx || {}),
            height: 32,
            width: 70,
            minWidth: 70,
            maxWidth: 70,
            ml: 'auto',
          },
        )}
      </TableCell>
    </TableRow>
  )
}
