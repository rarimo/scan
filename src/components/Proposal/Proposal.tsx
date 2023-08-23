'use client'

// import { Button, Tooltip } from '@mui/material'
// import { ProposalStatus, proposalStatusFromJSON } from '@rarimo/client'
// import { sleep } from '@rarimo/shared'
// import isEmpty from 'lodash-es/isEmpty'
// import  { useMemo } from 'react'

import { getProposalByID } from '@/callers'
import { ContentSection } from '@/components/Content'
import { ProposalFragment } from '@/graphql'
// import { Bus } from '@/helpers'
import {
  // useContentSectionAction,
  useLoading,
  // useWeb3
} from '@/hooks'
import { useI18n } from '@/locales/client'

import ProposalDetails from './ProposalDetails'

export default function Proposal({ id }: { id: string }) {
  const t = useI18n()
  // const { isConnected, isValidator } = useWeb3()

  const {
    data,
    isLoading,
    isLoadingError,
    // reload
  } = useLoading<ProposalFragment>({} as ProposalFragment, () => getProposalByID(id))
  //
  // const { closeDialog, openDialog, setIsDisabled, onSubmit, isDisabled, isDialogOpened } =
  //   useContentSectionAction(async () => {
  //     await sleep(2000)
  //     await reload()
  //     Bus.emit(Bus.eventList.reloadVotes)
  //   })

  // const isVotingAllowed = useMemo(() => {
  //   if (isEmpty(data)) return false
  //   const enumStatus = proposalStatusFromJSON(data?.status ?? '')
  //   return enumStatus === ProposalStatus.VotingPeriod
  // }, [data])
  //
  // const tooltipText = useMemo(() => {
  //   if (!isVotingAllowed) return t('proposal.vote-not-allowed-msg')
  //   if (!isConnected) return t('proposal.connect-wallet-msg')
  //   if (!isValidator) return t('proposal.not-validator-msg')
  //
  //   return ''
  // }, [isValidator, isVotingAllowed, isConnected, t])

  // const sectionAction = (
  //   <Tooltip
  //     title={tooltipText}
  //     sx={{
  //       minWidth: 'auto',
  //       textAlign: 'center',
  //     }}
  //     disableHoverListener={isValidator && isVotingAllowed && isConnected}
  //     disableTouchListener={isValidator && isVotingAllowed && isConnected}
  //   >
  //     <span>
  //       <Button
  //         onClick={() => {
  //           openDialog()
  //         }}
  //         disabled={isDisabled || !isVotingAllowed || !isValidator || !isConnected}
  //       >
  //         {t('proposal.vote-btn')}
  //       </Button>
  //     </span>
  //   </Tooltip>
  // )

  return (
    <ContentSection
      withBackButton
      title={t('proposal.title', { id })}
      // action={sectionAction}
    >
      <ProposalDetails proposal={data} isLoading={isLoading} isLoadingError={isLoadingError} />
      {/*<DialogFormWrapper*/}
      {/*  formId={VOTE_FORM_ID}*/}
      {/*  isDisabled={isDisabled}*/}
      {/*  isDialogOpened={isDialogOpened}*/}
      {/*  closeDialog={closeDialog}*/}
      {/*  title={t('proposal.vote-dialog-heading', { id })}*/}
      {/*>*/}
      {/*  <VoteForm*/}
      {/*    id={VOTE_FORM_ID}*/}
      {/*    proposalId={Number(id)}*/}
      {/*    onSubmit={onSubmit}*/}
      {/*    setIsDialogDisabled={setIsDisabled}*/}
      {/*  />*/}
      {/*</DialogFormWrapper>*/}
    </ContentSection>
  )
}
