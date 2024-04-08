import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  GrantAuthorization,
  ProposalStatus,
  proposalStatusFromJSON,
  VoteOption,
} from '@rarimo/client'
import { omit } from 'lodash-es'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import * as Yup from 'yup'

import { getUserVoteTypeFromProposal } from '@/callers'
import { getClient } from '@/client'
import FormWrapper from '@/components/Forms/FormWrapper'
import { VoteStates } from '@/enums'
import { Bus, ErrorHandler } from '@/helpers'
import { useForm, useLocalize, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'
import { FormProps } from '@/types'

const VOTE_OPTIONS = Object.values(omit(VoteOption, 'Unspecified', 'Unrecognized')).filter(i =>
  Number.isInteger(i),
)

const VOTER_LABEL_ID = 'proposal-voter-label'

enum VoteFormFieldNames {
  Option = 'option',
  Voter = 'voter',
}

const VOTE_TYPES: Record<string, VoteStates> = {
  [VoteOption.Yes]: VoteStates.Yes,
  [VoteOption.No]: VoteStates.No,
  [VoteOption.Abstain]: VoteStates.Abstain,
  [VoteOption.NoWithVeto]: VoteStates.Veto,
}

export default function VoteForm({
  id,
  onSubmit,
  grants,
  setIsDialogDisabled,
  proposalId,
}: FormProps & { proposalId: number; grants: GrantAuthorization[] }) {
  const t = useI18n()
  const { address, isValidator, isStaker } = useWeb3()
  const { localizeProposalVoteOption } = useLocalize()

  const [alreadySelectedVote, setAlreadySelectedVote] = useState<VoteStates | ''>('')

  const DEFAULT_VALUES = {
    [VoteFormFieldNames.Option]: VoteOption.Yes,
    [VoteFormFieldNames.Voter]: isValidator ? address : grants?.[0]?.granter,
  }

  const getVoterValidationRule = (yup: typeof Yup): Yup.ObjectShape => {
    if (!isStaker && grants.length) {
      return { [VoteFormFieldNames.Voter]: yup.string().required() }
    }
    if (isStaker && grants.length) {
      return { [VoteFormFieldNames.Voter]: yup.string() }
    }
    return {}
  }

  const {
    handleSubmit,
    control,
    isFormDisabled,
    formErrors,
    formState,
    setValue,
    disableForm,
    enableForm,
    getErrorMessage,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object({
      ...getVoterValidationRule(yup),
      [VoteFormFieldNames.Option]: yup.number().required(),
    }),
  )

  const selectOptions = useMemo(
    () => (grants.length ? [...grants, { granter: address }] : []),
    [address, grants],
  )

  const setNewDefaultVoteOption = useCallback(
    (voteType: string) => {
      const newDefaultStatus = Object.values(VoteStates).find(item => item !== voteType)
      const newDefaultOption = Object.keys(VOTE_TYPES).find(
        key => VOTE_TYPES[key] === newDefaultStatus,
      ) as unknown as VoteOption
      setValue(VoteFormFieldNames.Option, newDefaultOption)
    },
    [setValue],
  )

  const getIsChosenAddressAlreadyVotedForProposal = useCallback(
    async (addressForChecking: string) => {
      try {
        setAlreadySelectedVote('')
        const voteType = await getUserVoteTypeFromProposal(proposalId, addressForChecking)
        if (voteType) {
          setNewDefaultVoteOption(voteType)

          setAlreadySelectedVote(voteType)
        }
      } catch (e) {
        ErrorHandler.processWithoutFeedback(e as Error)
      }
    },
    [proposalId, setNewDefaultVoteOption],
  )

  const submit = async (formData: typeof DEFAULT_VALUES) => {
    disableForm()
    setIsDialogDisabled(true)
    try {
      const client = getClient()
      const proposal = await client.query.getProposal(proposalId)
      const enumStatus = proposalStatusFromJSON(proposal?.status)
      if (enumStatus !== ProposalStatus.VotingPeriod) {
        Bus.error(t('vote-form.voting-time-expired-error'))
        enableForm()
        setIsDialogDisabled(false)
        return
      }

      formData.voter === address
        ? await client.tx.voteProposal(address, proposalId, formData[VoteFormFieldNames.Option])
        : await client.tx.execVoteProposal(address, formData.voter, proposalId, formData.option)

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

  useEffect(() => {
    getIsChosenAddressAlreadyVotedForProposal(formState.voter || address)
  }, [formState.voter, address, getIsChosenAddressAlreadyVotedForProposal])

  return (
    <FormWrapper id={id} onSubmit={handleSubmit(submit)} isFormDisabled={isFormDisabled}>
      <Typography variant={'body2'} color={'var(--col-txt-secondary)'}>
        {t('vote-form.helper-text')}
      </Typography>

      {selectOptions.length ? (
        <Controller
          name={VoteFormFieldNames.Voter}
          control={control}
          render={({ field }) => (
            <FormControl>
              <InputLabel id={VOTER_LABEL_ID} error={Boolean(formErrors[VoteFormFieldNames.Voter])}>
                {t('delegate-form.execution-type-lbl')}
              </InputLabel>
              <Select
                {...field}
                labelId={VOTER_LABEL_ID}
                label={t('delegate-form.execution-type-lbl')}
                disabled={isFormDisabled}
                error={Boolean(formErrors[VoteFormFieldNames.Voter])}
              >
                {selectOptions.map((item, idx) => (
                  <MenuItem key={idx} value={item.granter}>
                    {item.granter}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(formErrors[VoteFormFieldNames.Voter]) && (
                <FormHelperText error>
                  {getErrorMessage(formErrors[VoteFormFieldNames.Voter])}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      ) : (
        <></>
      )}

      <Controller
        name={VoteFormFieldNames.Option}
        control={control}
        render={({ field }) => (
          <FormControl>
            <RadioGroup {...field}>
              {VOTE_OPTIONS.map((option, idx) => (
                <Tooltip
                  placement='bottom-start'
                  followCursor
                  key={idx}
                  title={t('vote-form.already-voted-option')}
                  disableHoverListener={VOTE_TYPES[option] !== alreadySelectedVote}
                  disableTouchListener={VOTE_TYPES[option] !== alreadySelectedVote}
                >
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    disabled={VOTE_TYPES[option] === alreadySelectedVote}
                    label={localizeProposalVoteOption(option as VoteOption)}
                    key={idx}
                  />
                </Tooltip>
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />
    </FormWrapper>
  )
}
