import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

import { HeaderBridgeMenuProps, HeaderDropdownMenu } from './HeaderDropdownMenu'

export default function HeaderBridgeMenu(props: Omit<HeaderBridgeMenuProps, 'items'>) {
  const t = useI18n()

  const itemList = [
    { label: t('header-bridge-menu.menu-lbl'), href: '' },
    { label: t('header-bridge-menu.tss-lbl'), href: RoutePaths.TSSs },
    { label: t('header-bridge-menu.oracles-lbl'), href: RoutePaths.Oracles },
    { label: t('header-bridge-menu.operations-lbl'), href: RoutePaths.Operations },
    { label: t('header-bridge-menu.confirmations-lbl'), href: RoutePaths.Confirmations },
  ]

  return <HeaderDropdownMenu {...props} items={itemList} />
}
