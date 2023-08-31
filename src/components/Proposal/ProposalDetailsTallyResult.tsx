import { Stack, Typography, useTheme } from '@mui/material'

import { useI18n } from '@/locales/client'
import { FlexboxDirection, TallyResult } from '@/types'

export default function ProposalDetailsTallyResult({ result }: { result: TallyResult }) {
  const t = useI18n()
  const theme = useTheme()

  const tallyResultRow = (label: string, percent: string) => (
    <Typography component={'span'}>
      <Typography component={'span'} variant={'body2'}>
        {label}
      </Typography>
      <Typography component={'span'} variant={'body2'} color={theme.palette.text.secondary}>
        {percent + '%'}
      </Typography>
    </Typography>
  )

  const FLEX_ITEM = {
    direction: { xs: 'column', md: 'row' } as FlexboxDirection,
    spacing: { xs: 1, md: 4 },
    flex: { xs: 1, md: 'unset' },
  }

  return (
    <Stack spacing={4} direction={'row'} sx={{ width: '100%' }}>
      <Stack {...FLEX_ITEM}>
        {tallyResultRow(t('proposal-details.tally-result-yes-lbl'), result.yes)}
        {tallyResultRow(t('proposal-details.tally-result-abstain-lbl'), result.abstain)}
      </Stack>
      <Stack {...FLEX_ITEM}>
        {tallyResultRow(t('proposal-details.tally-result-no-lbl'), result.no)}
        {tallyResultRow(t('proposal-details.tally-result-no-with-veto-lbl'), result.no_with_veto)}
      </Stack>
    </Stack>
  )
}
