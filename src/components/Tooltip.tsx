import { SxProps, Tooltip as TooltipBase, Typography, useTheme } from '@mui/material'
import { isString } from 'lodash-es'
import { ReactElement, ReactNode, useState } from 'react'

export default function Tooltip({
  children,
  message,
  sx = { minWidth: 300 },
  disabled = false,
}: {
  children: ReactElement<any, any>
  message: string | ReactNode
  sx?: SxProps
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)

  const theme = useTheme()

  const handleClose = () => {
    if (disabled) return
    setOpen(false)
  }

  const handleOpen = () => {
    if (disabled) return
    setOpen(true)
  }

  const title = isString(message) ? (
    <Typography variant='caption' color={theme.palette.text.secondary}>
      {message}
    </Typography>
  ) : (
    message
  )

  return (
    <TooltipBase
      disableFocusListener
      title={title}
      enterDelay={500}
      leaveDelay={200}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      componentsProps={{ tooltip: { sx } }}
    >
      {children}
    </TooltipBase>
  )
}
