'use client'

import { MenuItem, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react'

import MouseOverDropdown from '@/components/MouseOverDropdown'
import { CONFIG } from '@/config'
import { useI18n } from '@/locales/client'

export default function HeaderNetworkSwitcher({ size = 'medium' }: { size?: 'medium' | 'large' }) {
  const t = useI18n()

  const [link, setLink] = useState('')

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
    if (CONFIG.CHAIN_RPC_URL.includes('devnet')) setLink(CONFIG.DEVNET_URL)
    if (CONFIG.CHAIN_RPC_URL.includes('testnet')) setLink(CONFIG.TESTNET_URL)
    if (CONFIG.CHAIN_RPC_URL.includes('mainnet')) setLink(CONFIG.MAINNET_URL)
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
