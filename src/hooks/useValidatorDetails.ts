import {
  Coin,
  DelegateTypes,
  DelegationResponse,
  GrantAuthorization,
  MessageTypeUrls,
} from '@rarimo/client'
import { isEmpty as _isEmpty } from 'lodash-es'
import { useMemo, useState } from 'react'

import {
  filterGrantsByMessageType,
  getDelegationRewards,
  getGrants,
  getValidatorByAddress,
  getValidatorDelegations,
} from '@/callers'
import { GetValidatorByAddressQuery } from '@/graphql'
import { useContentSectionAction } from '@/hooks/useContentSectionAction'
import { useLoading } from '@/hooks/useLoading'
import { useValidatorStats } from '@/hooks/useValidatorStats'
import { useWeb3 } from '@/hooks/useWeb3'

export const useValidatorDetails = (operator: string, reload: () => Promise<void>) => {
  const [delegateType, setDelegateType] = useState<DelegateTypes>(DelegateTypes.Delegate)
  const [isWithdrawRewards, setIsWithdrawRewards] = useState(false)

  const { closeDialog, openDialog, setIsDisabled, onSubmit, isDisabled, isDialogOpened } =
    useContentSectionAction(reload)

  const { data, isLoading, isLoadingError, isEmpty } = useLoading<GetValidatorByAddressQuery>(
    {} as GetValidatorByAddressQuery,
    () => getValidatorByAddress(operator),
  )

  const validator = useMemo(() => data?.validator?.[0], [data])

  const { isConnected, address } = useWeb3()

  const {
    data: grants,
    isLoading: isGrantsLoading,
    isLoadingError: isGrantsLoadingError,
    isEmpty: isGrantsEmpty,
  } = useLoading<GrantAuthorization[]>([], () => getGrants(address), {
    loadOnMount: isConnected,
    loadArgs: [address],
  })

  const {
    data: accountDelegations,
    isLoading: isDelegationLoading,
    isLoadingError: isDelegationLoadingError,
    isEmpty: isDelegationEmpty,
    reload: reloadDelegation,
  } = useLoading<DelegationResponse[]>(
    [],
    async () => {
      const grants = filterGrantsByMessageType(await getGrants(address), [MessageTypeUrls.Delegate])

      const resp = await Promise.all([
        getValidatorDelegations(address, validator?.validator_info?.operator_address ?? ''),
        ...grants.map(grant =>
          getValidatorDelegations(grant.granter, validator?.validator_info?.operator_address ?? ''),
        ),
      ])

      return resp.filter(i => !_isEmpty(i))
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
  } = useLoading<{ delegator: string; coins: Coin[] }[]>(
    [],
    async () => {
      const grants = filterGrantsByMessageType(await getGrants(address), [
        MessageTypeUrls.WithdrawDelegatorReward,
      ])

      const result: { delegator: string; coins: Coin[] }[] = [
        { delegator: address, coins: [] },
        ...grants.map(grant => ({ delegator: grant.granter, coins: [] })),
      ]

      const resp = await Promise.all([
        getDelegationRewards(address, validator?.validator_info?.operator_address ?? ''),
        ...grants.map(grant =>
          getDelegationRewards(grant.granter, validator?.validator_info?.operator_address ?? ''),
        ),
      ])

      resp.forEach((item, idx) => {
        if (_isEmpty(item)) return
        result[idx].coins = item
      })

      return result
        .map(el => ({
          ...el,
          // convert u[Denom] to Denom, e.g. uRMO to RMO
          coins: el.coins?.map(i => ({ ...i, amount: `${i.amount}`.split('.')[0] })),
        }))
        .filter(el => el.coins.length && Number(el.coins[0].amount))
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
    isWithdrawRewards,
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
    setIsWithdrawRewards,
    closeDialog,
    openDialog,
    setIsDisabled,
    onSubmit,
    isDisabled,
    isDialogOpened,
    condition,
    comission,
    grants,
    isGrantsLoading,
    isGrantsLoadingError,
    isGrantsEmpty,
  }
}
