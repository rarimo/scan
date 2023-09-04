import { Coin, DelegateTypes, DelegationResponse } from '@rarimo/client'
import { useMemo, useState } from 'react'

import { getDelegationRewards, getValidatorByAddress, getValidatorDelegations } from '@/callers'
import { GetValidatorByAddressQuery } from '@/graphql'
import { useContentSectionAction } from '@/hooks/useContentSectionAction'
import { useLoading } from '@/hooks/useLoading'
import { useValidatorStats } from '@/hooks/useValidatorStats'
import { useWeb3 } from '@/hooks/useWeb3'

export const useValidatorDetails = (operator: string, reload: () => Promise<void>) => {
  const [delegateType, setDelegateType] = useState<DelegateTypes>(DelegateTypes.Delegate)

  const { closeDialog, openDialog, setIsDisabled, onSubmit, isDisabled, isDialogOpened } =
    useContentSectionAction(reload)

  const { data, isLoading, isLoadingError, isEmpty } = useLoading<GetValidatorByAddressQuery>(
    {} as GetValidatorByAddressQuery,
    () => getValidatorByAddress(operator),
  )

  const validator = useMemo(() => data?.validator?.[0], [data])

  const { isConnected, address } = useWeb3()

  const {
    data: accountDelegations,
    isLoading: isDelegationLoading,
    isLoadingError: isDelegationLoadingError,
    isEmpty: isDelegationEmpty,
    reload: reloadDelegation,
  } = useLoading<DelegationResponse>(
    {} as DelegationResponse,
    () => {
      return getValidatorDelegations(address, validator?.validator_info?.operator_address ?? '')
    },
    {
      loadOnMount: isConnected && !isEmpty,
      loadArgs: [address, validator?.validator_info?.operator_address],
    },
  )

  const {
    data: accountReward,
    isLoading: isRewardLoading,
    isLoadingError: isRewardLoadingError,
    isEmpty: isRewardEmpty,
    reload: reloadReward,
  } = useLoading<Coin[]>(
    [],
    () => {
      return getDelegationRewards(address, validator?.validator_info?.operator_address ?? '')
    },
    {
      loadOnMount: isConnected && !isEmpty,
      loadArgs: [address, validator?.validator_info?.operator_address],
    },
  )

  const { condition, comission } = useValidatorStats({
    missedBlocksCounter: validator?.validator_signing_infos?.[0]?.missed_blocks_counter,
    signedBlocksWindow: data?.slashing_params?.[0]?.params?.signedBlocksWindow,
    commission: validator?.validator_commissions?.[0]?.commission ?? 0,
  })

  return {
    data,
    address,
    validator,
    isEmpty,
    isConnected,
    isLoading,
    isLoadingError,
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
  }
}
