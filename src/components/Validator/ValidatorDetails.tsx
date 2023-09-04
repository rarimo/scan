import { Link } from '@mui/material'
import { BondStatus, DelegateTypes } from '@rarimo/client'

import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import { DialogFormWrapper } from '@/components/Dialog'
import DelegateForm from '@/components/Forms/DelegateForm'
import OverviewTable from '@/components/OverviewTable'
import TableHeadCellWithTip from '@/components/TableHeadCellWithTip'
import ValidatorCondition from '@/components/Validator/ValidatorCondition'
import ValidatorConditionTableHead from '@/components/Validator/ValidatorConditionTableHead'
import ValidatorDetailsActions from '@/components/Validator/ValidatorDetailsActions'
import ValidatorStatus from '@/components/Validator/ValidatorStatus'
import ValidatorVotingPower from '@/components/Validator/ValidatorVotingPower'
import {
  TABLE_LARGE_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { formatToPercent } from '@/helpers'
import { useSkeleton, useValidatorDetails } from '@/hooks'
import { useI18n } from '@/locales/client'

const DELEGATE_FORM_ID = 'delegate-form'

export default function ValidatorDetails({
  operator,
  reload,
}: {
  operator: string
  reload: () => Promise<void>
}) {
  const t = useI18n()

  const {
    data,
    address,
    validator,
    isEmpty,
    isLoading,
    isLoadingError,
    isConnected,
    delegateType,
    accountDelegations,
    isDelegationLoading,
    isDelegationLoadingError,
    isDelegationEmpty,
    reloadDelegation,
    accountReward,
    isRewardLoading,
    isRewardLoadingError,
    isRewardEmpty,
    reloadReward,
    setDelegateType,
    closeDialog,
    openDialog,
    setIsDisabled,
    onSubmit,
    isDisabled,
    isDialogOpened,
    condition,
    comission,
  } = useValidatorDetails(operator, reload)

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

  const action = (
    <ValidatorDetailsActions
      address={address}
      validator={validator}
      accountReward={accountReward}
      isEmpty={isEmpty}
      isDisabled={isDisabled}
      isConnected={isConnected}
      isDelegationEmpty={isDelegationEmpty}
      isRewardEmpty={isRewardEmpty}
      isDelegationLoading={isDelegationLoading}
      isDelegationLoadingError={isDelegationLoadingError}
      isRewardLoading={isRewardLoading}
      isRewardLoadingError={isRewardLoadingError}
      reloadReward={reloadReward}
      onSubmit={onSubmit}
      openDialog={openDialog}
      setDelegateType={setDelegateType}
    />
  )

  return (
    <ContentSection withBackButton title={t('validator-details.title')} action={action}>
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
        <DialogFormWrapper
          formId={DELEGATE_FORM_ID}
          isDisabled={isDisabled}
          isDialogOpened={isDialogOpened}
          closeDialog={closeDialog}
          actionBtnText={t('common.submit-btn')}
          title={
            delegateType === DelegateTypes.Delegate
              ? t('validator-details.dialog-heading-delegate')
              : t('validator-details.dialog-heading-undelegate')
          }
        >
          <DelegateForm
            id={DELEGATE_FORM_ID}
            operator={validator?.validator_info?.operator_address ?? ''}
            minDelegationAmount={validator?.validator_commissions?.[0]?.min_self_delegation ?? ''}
            delegateType={delegateType}
            maxUndelegationAmount={accountDelegations?.delegation_response?.balance?.amount}
            reloadDelegation={reloadDelegation}
            onSubmit={onSubmit}
            setIsDialogDisabled={setIsDisabled}
          />
        </DialogFormWrapper>
      </ContentBox>
    </ContentSection>
  )
}
