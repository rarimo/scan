'use client'

import { Button, Tooltip } from '@mui/material'
import {
  GrantAuthorization,
  MessageTypeUrls,
  ProposalStatus,
  proposalStatusFromJSON,
} from '@rarimo/client'
import { sleep } from '@rarimo/shared'
import isEmpty from 'lodash-es/isEmpty'
import { useMemo } from 'react'

import { filterGrantsByMessageType, getGrants, getProposalByID } from '@/callers'
import { ContentSection } from '@/components/Content'
import { DialogFormWrapper } from '@/components/Dialog'
import { VoteForm } from '@/components/Forms'
import { ProposalFragment } from '@/graphql'
import { Bus } from '@/helpers'
import { useContentSectionAction, useLoading, useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'

import ProposalDetails from './ProposalDetails'

const VOTE_FORM_ID = 'vote-form'

export default function Proposal({ id }: { id: string }) {
  const t = useI18n()
  const { isConnected, isValidator, address } = useWeb3()

  const { data, isLoading, isLoadingError, reload } = useLoading<ProposalFragment>(
    {} as ProposalFragment,
    () => getProposalByID(id),
  )

  const {
    data: grants,
    isLoading: isGrantsLoading,
    isLoadingError: isGrantsLoadingError,
    isEmpty: isGrantsEmpty,
  } = useLoading<GrantAuthorization[]>(
    [],
    async () => {
      return filterGrantsByMessageType(await getGrants(address), [MessageTypeUrls.Vote])
    },
    {
      loadOnMount: isConnected,
      loadArgs: [address],
    },
  )

  const { closeDialog, openDialog, setIsDisabled, onSubmit, isDisabled, isDialogOpened } =
    useContentSectionAction(async () => {
      await sleep(2000)
      await reload()
      Bus.emit(Bus.eventList.reloadVotes)
    })

  const isVotingAllowed = useMemo(() => {
    if (isEmpty(data)) return false
    const enumStatus = proposalStatusFromJSON(data?.status ?? '')
    return enumStatus === ProposalStatus.VotingPeriod
  }, [data])

  const tooltipText = useMemo(() => {
    if (!isVotingAllowed) return t('proposal.vote-not-allowed-msg')
    if (!isConnected) return t('proposal.connect-wallet-msg')
    if (!isValidator && isGrantsEmpty) return t('proposal.not-validator-msg')

    return ''
  }, [isValidator, isVotingAllowed, isGrantsEmpty, isConnected, t])

  const isTooltipListenersDisable = useMemo(
    () => (isValidator || !isGrantsEmpty) && isVotingAllowed && isConnected,
    [isValidator, isGrantsEmpty, isVotingAllowed, isConnected],
  )

  const sectionAction = (
    <Tooltip
      title={tooltipText}
      sx={{
        minWidth: 'auto',
        textAlign: 'center',
      }}
      disableHoverListener={isTooltipListenersDisable}
      disableTouchListener={isTooltipListenersDisable}
    >
      <span>
        <Button
          onClick={openDialog}
          disabled={
            isDisabled || !isVotingAllowed || (!isValidator && isGrantsEmpty) || !isConnected
          }
        >
          {t('proposal.vote-btn')}
        </Button>
      </span>
    </Tooltip>
  )

  return (
    <ContentSection withBackButton title={t('proposal.title', { id })} action={sectionAction}>
      <ProposalDetails
        proposal={data}
        isLoading={isLoading || isGrantsLoading}
        isLoadingError={isLoadingError || isGrantsLoadingError}
      />
      <DialogFormWrapper
        formId={VOTE_FORM_ID}
        isDisabled={isDisabled}
        isDialogOpened={isDialogOpened}
        closeDialog={closeDialog}
        actionBtnText={t('proposal.dialog-action-btn')}
        title={t('proposal.vote-dialog-heading', { id })}
      >
        <VoteForm
          id={VOTE_FORM_ID}
          grants={grants}
          proposalId={Number(id)}
          onSubmit={onSubmit}
          setIsDialogDisabled={setIsDisabled}
        />
      </DialogFormWrapper>
    </ContentSection>
  )
}
