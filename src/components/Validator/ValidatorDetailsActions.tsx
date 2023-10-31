import { Tooltip } from '@mui/material'
import { DelegateTypes } from '@rarimo/client'
import { Dispatch, SetStateAction, useMemo } from 'react'

import { withdrawValidatorCommission } from '@/callers'
import MultipleActionsButton from '@/components/MultipleActionsButton'
import { ValidatorFragment } from '@/graphql'
import { useI18n } from '@/locales/client'

export default function ValidatorDetailsActions({
  validator,
  address,
  isDisabled,
  isConnected,
  isDelegationEmpty,
  isRewardEmpty,
  isDelegationLoading,
  isDelegationLoadingError,
  isRewardLoading,
  isRewardLoadingError,
  isGrantsLoading,
  isGrantsLoadingError,
  onSubmit,
  openDialog,
  setDelegateType,
  setIsWithdrawRewards,
  getRewards,
}: {
  address: string
  validator: ValidatorFragment
  isEmpty: boolean
  isDisabled: boolean
  isConnected: boolean
  isDelegationEmpty: boolean
  isRewardEmpty: boolean
  isDelegationLoading: boolean
  isDelegationLoadingError: boolean
  isRewardLoading: boolean
  isRewardLoadingError: boolean
  isGrantsLoading: boolean
  isGrantsLoadingError: boolean
  onSubmit(params: { message: string }): Promise<void>
  openDialog(): void
  getRewards(): void
  setDelegateType: Dispatch<SetStateAction<DelegateTypes>>
  setIsWithdrawRewards: Dispatch<SetStateAction<boolean>>
}) {
  const t = useI18n()

  const getValidatorCommission = async () => {
    const validatorAddress = String(validator?.validator_info?.operator_address)
    return withdrawValidatorCommission(validatorAddress, async args => {
      await onSubmit({
        message: t('validator-details.delegation-commission-submitted-msg', args),
      })
    })
  }

  const isValidator = useMemo(
    () => address === validator?.validator_info?.account?.address,
    [address, validator?.validator_info?.account?.address],
  )

  const delegate = (type: DelegateTypes) => {
    setIsWithdrawRewards(false)
    setDelegateType(type)
    openDialog()
  }

  const isDelegationLoadingComp = useMemo(() => {
    return (
      isDelegationLoading || isDelegationLoadingError || isGrantsLoading || isGrantsLoadingError
    )
  }, [isGrantsLoading, isGrantsLoadingError, isDelegationLoading, isDelegationLoadingError])

  const actions = useMemo(
    () => {
      const result = [
        {
          label: t('validator-details.delegate-btn'),
          handler: () => delegate(DelegateTypes.Delegate),
          isDisabled: isDelegationLoadingComp,
        },
      ]

      if (!isDelegationEmpty) {
        result.push({
          label: t('validator-details.undelegate-btn'),
          handler: () => delegate(DelegateTypes.Undelegate),
          isDisabled: isDelegationLoadingComp,
        })
      }

      if (!isRewardEmpty) {
        result.push({
          label: t('validator-details.get-reward-btn'),
          handler: getRewards,
          isDisabled: isRewardLoading || isRewardLoadingError,
        })
      }

      if (isValidator) {
        result.push({
          label: t('validator-details.get-commission-btn'),
          handler: getValidatorCommission,
          isDisabled: isRewardLoading || isRewardLoadingError,
        })
      }

      return result
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      isDelegationEmpty,
      isDelegationLoading,
      isDelegationLoadingError,
      isRewardEmpty,
      isRewardLoading,
      isRewardLoadingError,
      isValidator,
      t,
    ],
  )

  return (
    <Tooltip
      title={t('validator-details.delegate-btn-tip-lbl')}
      sx={{
        minWidth: 'auto',
        textAlign: 'center',
      }}
      disableHoverListener={isConnected}
      disableTouchListener={isConnected}
    >
      <span>
        <MultipleActionsButton actions={actions} isDisabled={!isConnected || isDisabled} />
      </span>
    </Tooltip>
  )
}
