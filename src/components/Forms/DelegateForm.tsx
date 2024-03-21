import { BN, isFixedPointString } from '@distributedlab/tools'
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import {
  DelegateTypes,
  DelegationResponse,
  GenericAuthorization,
  GrantAuthorization,
  MessageTypeUrls,
} from '@rarimo/client'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { filterGrantsByMessageType } from '@/callers'
import { getClient } from '@/client'
import FormWrapper from '@/components/Forms/FormWrapper'
import { CONFIG } from '@/config'
import { ErrorHandler } from '@/helpers'
import { useForm, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'
import { FormProps } from '@/types'

const EXECUTE_OPTIONS_LABEL_ID = 'sender-label-id'

enum DelegateFormFieldNames {
  Validator = 'validator',
  Amount = 'amount',
  Delegator = 'delegator',
}

const DELEGATE_TYPE_BY_MSG: { [key in MessageTypeUrls]?: DelegateTypes } = {
  [MessageTypeUrls.Delegate]: DelegateTypes.Delegate,
  [MessageTypeUrls.Undelegate]: DelegateTypes.Undelegate,
}

export default function DelegateForm({
  id,
  onSubmit,
  setIsDialogDisabled,
  operator,
  minDelegationAmount,
  delegateType,
  grants,
  reloadDelegation,
  accountDelegations,
}: FormProps & {
  operator?: string
  grants: GrantAuthorization[]
  accountDelegations: DelegationResponse[]
  minDelegationAmount?: string
  delegateType: DelegateTypes
  reloadDelegation: () => Promise<void>
}) {
  const { address } = useWeb3()
  const t = useI18n()

  const isDelegation = useMemo(() => delegateType === DelegateTypes.Delegate, [delegateType])
  const availableUndelegators = useMemo(() => {
    return accountDelegations.map(i => i.delegation_response.delegation.delegator_address)
  }, [accountDelegations])

  const defaultValues = {
    [DelegateFormFieldNames.Amount]: '',
    [DelegateFormFieldNames.Delegator]: isDelegation
      ? address
      : availableUndelegators.includes(address)
        ? address
        : availableUndelegators[0],
  }

  const granters = useMemo(() => {
    return filterGrantsByMessageType(grants, [
      MessageTypeUrls.Delegate,
      MessageTypeUrls.Undelegate,
    ]).map(i => ({
      granter: i.granter,
      type: DELEGATE_TYPE_BY_MSG[(i.authorization as GenericAuthorization).msg as MessageTypeUrls],
    }))
  }, [grants])

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
          .when(DelegateFormFieldNames.Delegator, ([delegator], schema) => {
            const delegation = accountDelegations.find(
              i => i.delegation_response.delegation.delegator_address === delegator,
            )

            return isDelegation
              ? schema.minNumber(
                  BN.fromBigInt(String(minDelegationAmount || 0), CONFIG.DECIMALS).value,
                )
              : schema.maxNumber(
                  BN.fromBigInt(
                    delegation?.delegation_response.balance.amount ?? '0',
                    CONFIG.DECIMALS,
                  ).value,
                )
          }),
        [DelegateFormFieldNames.Delegator]: yup.string().required(),
      },
      [[DelegateFormFieldNames.Delegator, DelegateFormFieldNames.Delegator]],
    ),
  )

  const submit = async (formData: typeof defaultValues) => {
    disableForm()
    setIsDialogDisabled(true)
    try {
      const client = getClient()
      const isExec = formData.delegator !== address
      const txFn = isDelegation ? client.tx.delegate : client.tx.undelegate
      const txExecFn = isDelegation ? client.tx.execDelegate : client.tx.execUndelegate
      const validator = String(operator)
      const amount = {
        denom: CONFIG.MINIMAL_DENOM,
        amount: BN.fromRaw(formData.amount, CONFIG.DECIMALS).value,
      }

      isExec
        ? await txExecFn(address, formData.delegator, validator, amount)
        : await txFn(address, validator, amount)

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

  const delegatorItems = useMemo(() => {
    const grantersByType = granters.filter(i => i.type === delegateType)
    return [...(isDelegation ? [{ granter: address, type: delegateType }] : []), ...grantersByType]
  }, [address, delegateType, granters, isDelegation])

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
            onValueChange={values => {
              const isValid = isFixedPointString(values.value)
              if (isValid) onChange(values.value)
            }}
            onBlur={onBlur}
            helperText={getErrorMessage(formErrors[DelegateFormFieldNames.Amount])}
          />
        )}
      />
      {granters.length ? (
        <Controller
          name={DelegateFormFieldNames.Delegator}
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel
                id={EXECUTE_OPTIONS_LABEL_ID}
                error={Boolean(formErrors[DelegateFormFieldNames.Delegator])}
              >
                {t('delegate-form.execution-type-lbl')}
              </InputLabel>
              <Select
                {...field}
                labelId={EXECUTE_OPTIONS_LABEL_ID}
                label={t('delegate-form.execution-type-lbl')}
                disabled={isFormDisabled}
                error={Boolean(formErrors[DelegateFormFieldNames.Delegator])}
              >
                {delegatorItems.map((item, idx) => (
                  <MenuItem value={item.granter} key={idx}>
                    {item.granter}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formErrors[DelegateFormFieldNames.Delegator]) && (
                <FormHelperText error>
                  {getErrorMessage(formErrors[DelegateFormFieldNames.Delegator])}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      ) : (
        <></>
      )}
    </FormWrapper>
  )
}
