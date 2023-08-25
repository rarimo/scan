import { Link } from '@mui/material'
import { BondStatus } from '@rarimo/client'
import { useMemo } from 'react'

import { getValidatorByAddress } from '@/callers'
import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import OverviewTable from '@/components/OverviewTable'
import TableHeadCellWithTip from '@/components/TableHeadCellWithTip'
import ValidatorCondition from '@/components/Validator/ValidatorCondition'
import ValidatorConditionTableHead from '@/components/Validator/ValidatorConditionTableHead'
import ValidatorStatus from '@/components/Validator/ValidatorStatus'
import ValidatorVotingPower from '@/components/Validator/ValidatorVotingPower'
import {
  TABLE_LARGE_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { GetValidatorByAddressQuery } from '@/graphql'
import { formatToPercent } from '@/helpers'
import { useLoading, useSkeleton, useValidatorStats } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function ValidatorDetails({
  operator,
}: {
  operator: string
  reload: () => Promise<void>
}) {
  const t = useI18n()

  const { data, isLoading, isLoadingError, isEmpty } = useLoading<GetValidatorByAddressQuery>(
    {} as GetValidatorByAddressQuery,
    () => getValidatorByAddress(operator),
  )

  const validator = useMemo(() => data?.validator?.[0], [data])

  const { condition, comission } = useValidatorStats({
    missedBlocksCounter: validator?.validator_signing_infos?.[0]?.missed_blocks_counter,
    signedBlocksWindow: data?.slashing_params?.[0]?.params?.signedBlocksWindow,
    commission: validator?.validator_commissions?.[0]?.commission ?? 0,
  })

  const withSkeleton = useSkeleton(isLoading)

  const rows = [
    ...(validator?.validator_descriptions?.[0]?.moniker
      ? [
          {
            head: t('validator-details.validator-name-lbl'),
            body: withSkeleton(validator?.validator_descriptions?.[0]?.moniker),
          },
        ]
      : []),
    ...(validator?.validator_descriptions?.[0]?.website
      ? [
          {
            head: t('validator-details.website-lbl'),
            body: withSkeleton(
              <Link
                sx={{ fontSize: 'inherit' }}
                href={validator?.validator_descriptions?.[0]?.website}
                rel={'noopener'}
                target={'_blank'}
              >
                {validator?.validator_descriptions?.[0]?.website}
              </Link>,
            ),
          },
        ]
      : []),
    {
      head: t('validator-details.validator-operator-address-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={validator?.validator_info?.operator_address}>
          {validator?.validator_info?.operator_address}
        </CopyToClipboardWrapper>,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('validator-details.validator-address-lbl'),
      body: withSkeleton(
        <AvatarName
          address={validator?.validator_info?.account?.address ?? ''}
          abbrAddress={false}
        />,
        TABLE_TYPE_BOX_SKELETON_SX,
      ),
    },
    {
      head: t('validator-details.status-lbl'),
      body: withSkeleton(
        <ValidatorStatus
          status={(validator?.validator_statuses?.[0]?.status as BondStatus) ?? ''}
          jailed={validator?.validator_statuses?.[0]?.jailed ?? false}
        />,
        TABLE_TYPE_BOX_SKELETON_SX,
      ),
    },
    {
      head: t('validator-details.validator-consensus-address-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={validator?.consensus_address}>
          {validator?.consensus_address}
        </CopyToClipboardWrapper>,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    {
      head: t('validator-details.validator-consensus-pubkey-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={validator?.consensus_pubkey}>
          {validator?.consensus_pubkey}
        </CopyToClipboardWrapper>,
        {
          minWidth: 710,
        },
      ),
    },
    {
      head: t('validator-details.commission-lbl'),
      body: withSkeleton(formatToPercent(comission), TABLE_SMALL_TEXT_SKELETON_SX),
    },
    {
      head: t('validator-details.missed-blocks-lbl'),
      body: withSkeleton(
        validator?.validator_signing_infos?.[0]?.missed_blocks_counter ?? 0,
        TABLE_SMALL_TEXT_SKELETON_SX,
      ),
    },
    {
      head: <ValidatorConditionTableHead label={t('validator-details.condition-lbl')} />,
      body: withSkeleton(
        <ValidatorCondition condition={condition} />,
        TABLE_SMALL_TEXT_SKELETON_SX,
      ),
    },
    {
      head: (
        <TableHeadCellWithTip
          label={t('validator-details.voting-power-lbl')}
          align={'flex-start'}
          message={t('validator-details.voting-power-col-tip-lbl')}
        />
      ),
      body: withSkeleton(
        <ValidatorVotingPower
          votingPower={validator?.validator_voting_powers?.[0]?.voting_power}
          bondedTokens={data?.staking_pool?.[0]?.bonded_tokens}
          maxWidth={300}
        />,
        {
          maxWidth: 300,
          height: 32,
        },
      ),
    },
  ]

  return (
    <ContentSection withBackButton title={t('validator-details.title')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('validator-details.table-lbl')}
            noDataMessage={t('validator-details.no-data-message')}
            isEmpty={isEmpty}
            isLoadingError={isLoadingError}
            rows={rows}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
