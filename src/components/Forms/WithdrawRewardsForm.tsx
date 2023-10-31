import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { Coin, GrantAuthorization, MessageTypeUrls } from '@rarimo/client'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'

import { filterGrantsByMessageType } from '@/callers'
import { getClient } from '@/client'
import FormWrapper from '@/components/Forms/FormWrapper'
import { CONFIG } from '@/config'
import { ErrorHandler } from '@/helpers'
import { useForm, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'
import { FormProps } from '@/types'

const DELEGATOR_LABEL_ID = 'delegator-label-id'

enum WithdrawRewardsFormFieldNames {
  Delegator = 'delegator',
}

export default function WithdrawRewardsForm({
  id,
  onSubmit,
  setIsDialogDisabled,
  operator,
  grants,
  reloadReward,
  accountReward,
}: FormProps & {
  operator?: string
  grants: GrantAuthorization[]
  reloadReward: () => Promise<void>
  accountReward: { delegator: string; coins: Coin[] }[]
}) {
  const { address } = useWeb3()
  const t = useI18n()

  const granters = useMemo(() => {
    const granters = filterGrantsByMessageType(grants, [
      MessageTypeUrls.WithdrawDelegatorReward,
    ]).map(i => i.granter)

    return accountReward.filter(i => granters.includes(i.delegator)).map(i => i.delegator)
  }, [grants, accountReward])

  const defaultValues = {
    [WithdrawRewardsFormFieldNames.Delegator]: granters?.[0] ?? '',
  }

  const {
    handleSubmit,
    formErrors,
    control,
    isFormDisabled,
    getErrorMessage,
    disableForm,
    enableForm,
  } = useForm(defaultValues, yup =>
    yup.object({ [WithdrawRewardsFormFieldNames.Delegator]: yup.string().required() }),
  )

  const submit = async (formData: typeof defaultValues) => {
    disableForm()
    setIsDialogDisabled(true)
    try {
      const client = getClient()
      const isExec = formData.delegator !== address
      const validator = String(operator)

      const rewardAmount = accountReward.find(i => i.delegator === formData.delegator)?.coins?.[0]
        ?.amount

      const args = {
        amount: `${rewardAmount} ${CONFIG.DENOM}`,
        address: formData.delegator,
      }

      isExec
        ? await client.tx.execWithdrawDelegatorReward(address, formData.delegator, validator)
        : await client.tx.withdrawDelegatorReward(address, validator)

      await reloadReward()
      onSubmit({
        message: t('validator-details.reward-submitted-msg', args),
      })
    } catch (e) {
      ErrorHandler.process(e)
    }
    enableForm()
    setIsDialogDisabled(false)
  }

  return (
    <FormWrapper id={id} onSubmit={handleSubmit(submit)} isFormDisabled={isFormDisabled}>
      <Typography variant={'body2'} color={'var(--col-txt-secondary)'}>
        {t('withdraw-rewards-form.tip-lbl')}
      </Typography>
      <Controller
        name={WithdrawRewardsFormFieldNames.Delegator}
        control={control}
        render={({ field }) => (
          <FormControl>
            <InputLabel
              id={DELEGATOR_LABEL_ID}
              error={Boolean(formErrors[WithdrawRewardsFormFieldNames.Delegator])}
            >
              {t('withdraw-rewards-form.delegator-lbl')}
            </InputLabel>
            <Select
              {...field}
              labelId={DELEGATOR_LABEL_ID}
              label={t('withdraw-rewards-form.delegator-lbl')}
              disabled={isFormDisabled}
              error={Boolean(formErrors[WithdrawRewardsFormFieldNames.Delegator])}
            >
              {granters.map((item, idx) => (
                <MenuItem value={item} key={idx}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            {Boolean(formErrors[WithdrawRewardsFormFieldNames.Delegator]) && (
              <FormHelperText error>
                {getErrorMessage(formErrors[WithdrawRewardsFormFieldNames.Delegator])}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </FormWrapper>
  )
}
