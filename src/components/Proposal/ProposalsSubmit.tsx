import { Stack } from '@mui/material'
import { sleep } from '@rarimo/shared'
import { useMemo, useState } from 'react'

import { DialogFormWrapper } from '@/components/Dialog'
import SubmitTextProposalForm from '@/components/Forms/SubmitTextProposalForm'
import MultipleActionsButton from '@/components/MultipleActionsButton'
import { Bus } from '@/helpers'
import { useContentSectionAction } from '@/hooks'
import { useI18n } from '@/locales/client'

enum ProposalTypes {
  Text = 'proposal-submit-form',
}

export default function ProposalsSubmit() {
  const t = useI18n()

  const [submitType, setSubmitType] = useState<ProposalTypes>()

  const { closeDialog, openDialog, setIsDisabled, onSubmit, isDisabled, isDialogOpened } =
    useContentSectionAction(async () => {
      await sleep(2000)
      Bus.emit(Bus.eventList.reloadProposals)
    })

  const actions = useMemo(
    () => {
      const result = [
        {
          label: t('proposals.submit-proposal-action'),
          handler: () => {
            setSubmitType(ProposalTypes.Text)
            openDialog()
          },
          isDisabled: false,
        },
      ]

      return result
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  )

  return (
    <Stack>
      <MultipleActionsButton actions={actions} isDisabled={isDisabled} />

      <DialogFormWrapper
        formId={ProposalTypes.Text}
        isDisabled={isDisabled}
        isDialogOpened={isDialogOpened}
        closeDialog={closeDialog}
        actionBtnText={t('proposals-submit.dialog-action-btn')}
        title={t('proposals-submit.dialog-heading')}
      >
        {submitType === ProposalTypes.Text && (
          <SubmitTextProposalForm
            id={ProposalTypes.Text}
            onSubmit={onSubmit}
            setIsDialogDisabled={setIsDisabled}
          />
        )}
      </DialogFormWrapper>
    </Stack>
  )
}
