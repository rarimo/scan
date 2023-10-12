'use client'

import { MenuItem, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'

import MouseOverDropdown from '@/components/MouseOverDropdown'
import { CONFIG } from '@/config'
import { useI18n } from '@/locales/client'

enum ProtocolEnv {
  DEVNET = 'devnet',
  TESTNET = 'testnet',
  MAINNET = 'mainnet',
}

export default function HeaderNetworkSwitcher({ size = 'medium' }: { size?: 'medium' | 'large' }) {
  const t = useI18n()

  const [link, setLink] = useState('')

  const LINKS_MAP = {
    [ProtocolEnv.DEVNET]: CONFIG.DEVNET_URL,
    [ProtocolEnv.TESTNET]: CONFIG.TESTNET_URL,
    [ProtocolEnv.MAINNET]: CONFIG.MAINNET_URL,
  }

  const itemList = [
    {
      label: t('header-network-switcher.devnet-lbl'),
      link: CONFIG.DEVNET_URL,
    },
    {
      label: t('header-network-switcher.testnet-lbl'),
      link: CONFIG.TESTNET_URL,
    },
    {
      label: t('header-network-switcher.mainnet-lbl'),
      link: CONFIG.MAINNET_URL,
    },
  ].filter(i => i.link)

  const handleChange = (event: SelectChangeEvent) => {
    setLink(event.target.value)
    window.location.replace(String(event.target.value))
  }

  useEffect(() => {
    setLink(LINKS_MAP[CONFIG.PROTOCOL_ENV as ProtocolEnv])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MouseOverDropdown size={size} value={link} handleChange={handleChange}>
      {itemList.map((item, idx) => (
        <MenuItem value={item.link} key={idx}>
          {item.label}
        </MenuItem>
      ))}
    </MouseOverDropdown>
  )
}
