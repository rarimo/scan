import { Stack, Typography, TypographyTypeMap, useTheme } from '@mui/material'

import TableHeadCellWithTip from '@/components/TableHeadCellWithTip'
import ValidatorCondition from '@/components/Validator/ValidatorCondition'
import { useI18n } from '@/locales/client'

export default function ValidatorConditionTableHead({ label }: { label: string }) {
  const t = useI18n()
  const theme = useTheme()

  const captionProps: TypographyTypeMap['props'] = {
    variant: 'caption',
    color: theme.palette.text.secondary,
  }

  const conditions = [
    {
      condition: 90,
      message: t('validator-list.condition-col-tooltip-90-percent'),
    },
    {
      condition: 70,
      message: t('validator-list.condition-col-tooltip-70-percent'),
    },
    {
      condition: 1,
      message: t('validator-list.condition-col-tooltip-1-percent'),
    },
    {
      condition: 0,
      message: t('validator-list.condition-col-tooltip-0-percent'),
    },
  ]

  const message = (
    <Stack spacing={1}>
      <Typography {...captionProps}>{t('validator-list.condition-col-tooltip')}</Typography>

      <Stack spacing={0.3}>
        {conditions?.map((condition, idx) => (
          <Stack flexDirection='row' alignItems='center' justifyContent='flex-start' key={idx}>
            <ValidatorCondition condition={condition.condition} />
            <Typography {...captionProps} sx={{ ml: 1.5 }}>
              {condition.message}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )

  return <TableHeadCellWithTip label={label} message={message} align={'flex-start'} />
}
