'use client'

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Button, Stack } from '@mui/material'
import React from 'react'

import HeaderNetworkSwitcher from '@/components/Header/HeaderNetworkSwitcher'
import { abbr } from '@/helpers'
import { useWeb3 } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function NavbarActionsList() {
  const t = useI18n()

  const { connect, disconnect, isConnected, isConnecting, address } = useWeb3()

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Button
          size={'large'}
          sx={{
            minWidth: 170,
            flexDirection: 'row',
          }}
          onClick={isConnected ? disconnect : connect}
          disabled={isConnecting}
        >
          {isConnected ? abbr(address, 16, 10) : t('common.connect-wallet-btn')}
          {isConnected && (
            <LogoutOutlinedIcon
              aria-hidden='true'
              style={{ marginLeft: 8, marginTop: '1px', width: 20, height: 20 }}
            />
          )}
        </Button>
        <HeaderNetworkSwitcher size={'large'} />
      </Stack>
    </Stack>
  )
}
