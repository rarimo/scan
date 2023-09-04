import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { ProposalStatus, proposalStatusFromJSON, VoteOption } from '@rarimo/client'
import { omit } from 'lodash-es'
import { Controller } from 'react-hook-form'

import { client } from '@/client'
import FormWrapper from '@/components/Forms/FormWrapper'
import { Bus, ErrorHandler } from '@/helpers'
import { useForm, useLocalize, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'
import { FormProps } from '@/types'

const VOTE_OPTIONS = Object.values(omit(VoteOption, 'Unspecified', 'Unrecognized')).filter(i =>
  Number.isInteger(i),
)

enum VOTE_FORM_FIELD_NAMES {
  Option = 'option',
}

const DEFAULT_VALUES = {
  [VOTE_FORM_FIELD_NAMES.Option]: VoteOption.Yes,
}

export type VoteFormData = typeof DEFAULT_VALUES

export default function VoteForm({
  id,
  onSubmit,
  setIsDialogDisabled,
  proposalId,
}: FormProps & { proposalId: number }) {
  const t = useI18n()
  const { address } = useWeb3()
  const { localizeProposalVoteOption } = useLocalize()

  const { handleSubmit, control, isFormDisabled, disableForm, enableForm } = useForm(
    DEFAULT_VALUES,
    yup =>
      yup.object({
        [VOTE_FORM_FIELD_NAMES.Option]: yup.number().required(),
      }),
  )

  const submit = async (formData: VoteFormData) => {
    disableForm()
    setIsDialogDisabled(true)
    try {
      const proposal = await client.query.getProposal(proposalId)
      const enumStatus = proposalStatusFromJSON(proposal?.status)
      if (enumStatus !== ProposalStatus.VotingPeriod) {
        Bus.error(t('vote-form.voting-time-expired-error'))
        enableForm()
        setIsDialogDisabled(false)
        return
      }

      await client.tx.voteProposal(address, proposalId, formData[VOTE_FORM_FIELD_NAMES.Option])

      onSubmit({
        message: t('vote-form.submitted-msg', {
          id: proposalId,
        }),
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
        {t('vote-form.helper-text')}
      </Typography>
      <Controller
        name={VOTE_FORM_FIELD_NAMES.Option}
        control={control}
        render={({ field }) => (
          <FormControl>
            <RadioGroup {...field}>
              {VOTE_OPTIONS.map((option, idx) => (
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={localizeProposalVoteOption(option as VoteOption)}
                  key={idx}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />
    </FormWrapper>
  )
}
