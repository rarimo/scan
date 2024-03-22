import {
  FormControl,
  FormHelperText,
  TextareaAutosize as BaseTextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useMemo } from 'react'
import { Controller } from 'react-hook-form'

import { getClient } from '@/client'
import FormWrapper from '@/components/Forms/FormWrapper'
import { ErrorHandler } from '@/helpers'
import { useForm, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'
import { FormProps } from '@/types'

enum FieldNames {
  Title = 'title',
  Description = 'description',
}

export default function SubmitTextProposalForm({ id, onSubmit, setIsDialogDisabled }: FormProps) {
  const t = useI18n()
  const { address } = useWeb3()

  const DEFAULT_VALUES = {
    [FieldNames.Title]: '',
    [FieldNames.Description]: '',
  }

  const {
    handleSubmit,
    control,
    isFormDisabled,
    formErrors,
    disableForm,
    enableForm,
    getErrorMessage,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object({
      [FieldNames.Title]: yup.string().required(),
      [FieldNames.Description]: yup.string().required(),
    }),
  )

  const client = useMemo(() => getClient(), [])

  const getMinAmount = async (): Promise<string> => {
    const { deposit_params } = await client.query.getGovParams('deposit')

    return (
      deposit_params?.min_deposit?.find(i => i?.denom === client.config.currency.minDenom)
        ?.amount ?? '0'
    )
  }

  const submit = async (formData: typeof DEFAULT_VALUES) => {
    disableForm()
    setIsDialogDisabled(true)
    try {
      const client = getClient()

      const amount = await getMinAmount()

      const receipt = await client.tx.submitTextProposal(
        address,
        [
          {
            denom: client.config.currency.minDenom,
            amount,
          },
        ],
        formData[FieldNames.Title],
        formData[FieldNames.Description],
      )

      console.log(receipt)

      onSubmit({
        message: t('submit-text-proposal-form.submitted-msg'),
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
        {t('submit-text-proposal-form.helper-text')}
      </Typography>

      <Controller
        name={FieldNames.Title}
        control={control}
        render={({ field }) => (
          <FormControl>
            <TextField
              {...field}
              label={t('submit-text-proposal-form.title-lbl')}
              error={!!formErrors[FieldNames.Title]}
            />

            {Boolean(formErrors[FieldNames.Title]) && (
              <FormHelperText error>{getErrorMessage(formErrors[FieldNames.Title])}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <Controller
        name={FieldNames.Description}
        control={control}
        render={({ field }) => (
          <FormControl>
            <TextareaAutosize
              {...field}
              minRows={5}
              aria-label='empty textarea'
              placeholder={t('submit-text-proposal-form.description-lbl')}
            />

            {Boolean(formErrors[FieldNames.Description]) && (
              <FormHelperText error>
                {getErrorMessage(formErrors[FieldNames.Description])}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />
    </FormWrapper>
  )
}

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  background: none;
  padding: ${theme.spacing(2)} ${theme.spacing(1.75)};
`,
)
