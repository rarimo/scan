import { NetworkParamType, NetworkType } from '@rarimo/client'

import { TFunction } from '@/types'

export const localizeNetworkType = (t: TFunction, type: NetworkType) =>
  ({
    [NetworkType.EVM]: t('network-type.evm-lbl'),
    [NetworkType.Solana]: t('network-type.solana-lbl'),
    [NetworkType.Near]: t('network-type.near-lbl'),
    [NetworkType.Other]: t('network-type.other-lbl'),
    [NetworkType.Rarimo]: t('network-type.rarimo-lbl'),
    [NetworkType.Unrecognized]: t('network-type.unrecognized-lbl'),
  })[type]

export const localizeNetworkParamType = (t: TFunction, type: NetworkParamType) =>
  ({
    [NetworkParamType.Bridge]: t('network-param-type.bridge-lbl'),
    [NetworkParamType.Fee]: t('network-param-type.fee-lbl'),
    [NetworkParamType.Identity]: t('network-param-type.identity-lbl'),
    [NetworkParamType.Unrecognized]: t('network-param-type.unrecognized-lbl'),
  })[type]
