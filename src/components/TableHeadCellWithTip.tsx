import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Stack, Typography, useTheme } from '@mui/material'
import { ReactNode } from 'react'

import Tooltip from '@/components/Tooltip'

const ICON_SIZE = 16

export default function TableHeadCellWithTip({
  label,
  message,
  align = 'center',
}: {
  label?: string
  message: string | ReactNode
  align?: 'flex-start' | 'center' | 'flex-end'
}) {
  const theme = useTheme()

  return (
    <Tooltip message={message}>
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={align || 'flex-start'}>
        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: 'inherit',
            fontWeight: 500,
            cursor: 'pointer',
            mr: 0.5,
          }}
        >
          {label}
        </Typography>
        <InfoOutlinedIcon
          width={ICON_SIZE}
          height={ICON_SIZE}
          aria-hidden='true'
          sx={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            cursor: 'pointer',
          }}
        />
      </Stack>
    </Tooltip>
  )
}
