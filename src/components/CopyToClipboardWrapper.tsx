'use client'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton, Stack, SxProps, Tooltip } from '@mui/material'
import { ReactNode, useState } from 'react'

import { Bus } from '@/helpers'
import { useI18n } from '@/locales/client'

export const CopyToClipboardWrapper = ({
  value,
  children,
  sx = {},
}: {
  value?: string | number
  children?: ReactNode | Element | string
  sx?: SxProps
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const t = useI18n()

  let timeout: NodeJS.Timeout

  const handleClose = () => {
    setIsCopied(false)
  }

  const copyToClipboard = async () => {
    try {
      clearTimeout(timeout)
      await navigator.clipboard.writeText(`${value}`)
      setIsCopied(true)
      timeout = setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    } catch (e) {
      Bus.error(t('copy-to-clipboard-wrapper.failed-msg'))
    }
  }

  return (
    <Stack flexDirection={'row'} alignItems={'center'}>
      <>
        {children}
        <Tooltip
          title={t('copy-to-clipboard-wrapper.copied-msg')}
          open={isCopied}
          onClose={handleClose}
        >
          <IconButton
            sx={{
              marginLeft: 2.5,
              fontSize: 'inherit',
              lineHeight: 'inherit',
              pl: 0.5,
              width: 28,
              height: 28,
              p: 0.5,
              '& > .MuiSvgIcon-root': {
                width: 20,
                height: 20,
              },
              ...sx,
            }}
            onClick={copyToClipboard}
          >
            {<ContentCopyIcon aria-hidden={true} />}
          </IconButton>
        </Tooltip>
      </>
    </Stack>
  )
}
