import { BN } from '@distributedlab/tools'
import { InputAdornment, TextField, Typography } from '@mui/material'
import { DelegateTypes } from '@rarimo/client'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { getClient } from '@/client'
import FormWrapper from '@/components/Forms/FormWrapper'
import { CONFIG } from '@/config'
import { ErrorHandler } from '@/helpers'
import { useForm, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'
import { FormProps } from '@/types'

enum DelegateFormFieldNames {
  Validator = 'validator',
  Amount = 'amount',
}

const defaultValues = {
  [DelegateFormFieldNames.Amount]: '',
}

export type DelegateFormData = typeof defaultValues

export default function DelegateForm({
  id,
  onSubmit,
  setIsDialogDisabled,
  operator,
  minDelegationAmount,
  delegateType,
  reloadDelegation,
  maxUndelegationAmount,
}: FormProps & {
  operator?: string
  minDelegationAmount?: string
  delegateType: DelegateTypes
  maxUndelegationAmount?: string
  reloadDelegation: () => Promise<void>
}) {
  const { address } = useWeb3()
  const t = useI18n()

  const isDelegation = useMemo(() => delegateType === DelegateTypes.Delegate, [delegateType])

  const {
    handleSubmit,
    formErrors,
    control,
    isFormDisabled,
    getErrorMessage,
    disableForm,
    enableForm,
  } = useForm(defaultValues, yup =>
    yup.object().shape(
      {
        [DelegateFormFieldNames.Amount]: yup
          .string()
          .required()
          .when(DelegateFormFieldNames.Amount, {
            is: () => isDelegation,
            then: rule => {
              return rule.minNumber(
                BN.fromBigInt(String(minDelegationAmount), CONFIG.DECIMALS).value,
              )
            },
          })
          .when(DelegateFormFieldNames.Amount, {
            is: () => !isDelegation,
            then: rule => rule.maxNumber(String(maxUndelegationAmount)),
          }),
      },
      [[DelegateFormFieldNames.Amount, DelegateFormFieldNames.Amount]],
    ),
  )

  const submit = async (formData: DelegateFormData) => {
    disableForm()
    setIsDialogDisabled(true)
    try {
      const client = getClient()
      const txFn = isDelegation ? client.tx.delegate : client.tx.undelegate
      await txFn(address, String(operator), {
        denom: CONFIG.MINIMAL_DENOM,
        amount: BN.fromRaw(formData.amount, CONFIG.DECIMALS).value,
      })

      const args = {
        amount: `${formData.amount} ${CONFIG.DENOM}`,
        address,
      }

      await reloadDelegation()
      onSubmit({
        message: isDelegation
          ? t('validator-details.delegation-submitted-msg', args)
          : t('validator-details.undelegation-submitted-msg', args),
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
        {isDelegation ? t('delegate-form.delegation-lbl') : t('delegate-form.undelegation-lbl')}
      </Typography>
      <Controller
        name={DelegateFormFieldNames.Amount}
        control={control}
        render={({ field: { onChange, onBlur, name, value, ref } }) => (
          <NumericFormat
            type='text'
            displayType='input'
            decimalScale={CONFIG.DECIMALS}
            name={name}
            value={value}
            allowNegative={false}
            customInput={TextField}
            inputRef={ref}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>{CONFIG.DENOM.toUpperCase()}</InputAdornment>
              ),
            }}
            label={t('delegate-form.amount-lbl')}
            error={Boolean(formErrors[DelegateFormFieldNames.Amount])}
            disabled={isFormDisabled}
            onValueChange={values => onChange(values.floatValue)}
            onBlur={onBlur}
            helperText={getErrorMessage(formErrors[DelegateFormFieldNames.Amount])}
          />
        )}
      />
    </FormWrapper>
  )
}
