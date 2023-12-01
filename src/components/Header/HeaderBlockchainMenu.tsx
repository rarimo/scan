import { HeaderBridgeMenuProps, HeaderDropdownMenu } from '@/components/Header/HeaderDropdownMenu'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

export default function HeaderBlockchainMenu(props: Omit<HeaderBridgeMenuProps, 'items'>) {
  const t = useI18n()

  const itemList = [
    { label: t('header-blockchain-menu.menu-lbl'), href: '' },
    { label: t('header-blockchain-menu.validators-lbl'), href: RoutePaths.Validators },
    { label: t('header-blockchain-menu.proposals-lbl'), href: RoutePaths.Proposals },
    { label: t('header-blockchain-menu.transactions-lbl'), href: RoutePaths.Transactions },
    { label: t('header-blockchain-menu.blocks-lbl'), href: RoutePaths.Blocks },
  ]

  return <HeaderDropdownMenu {...props} items={itemList} />
}
