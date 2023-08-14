import { BN, BnFormatConfig, BnLike } from '@distributedlab/tools'

import { CONFIG } from '@/config'

const AMOUNT_CFG: BnFormatConfig = {
  decimals: CONFIG.AMOUNT_DECIMALS,
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
}

export const formatSeconds = (value?: string) => {
  return BN.fromRaw(value ?? 0, 12).format({
    decimals: CONFIG.AMOUNT_DECIMALS,
    suffix: 's',
  })
}

export const formatToPercent = (value?: BnLike) => {
  return BN.fromBigInt(value ?? '0', CONFIG.DECIMALS).format({
    decimals: CONFIG.PERCENT_DECIMALS,
    suffix: '%',
  })
}

export const formatCurrency = (
  amount?: BnLike,
  config: BnFormatConfig = { decimals: CONFIG.AMOUNT_DECIMALS },
) => {
  return BN.fromBigInt(amount ?? '0', CONFIG.DECIMALS).format({
    ...config,
  })
}

export const formatAmount = (
  amount?: string | number | bigint,
  config: BnFormatConfig = AMOUNT_CFG,
) => {
  return BN.fromRaw(amount ?? '0', CONFIG.DECIMALS).format({
    ...config,
  })
}

export const formatCurrencyWithDenom = (
  amount?: BnLike,
  decimals: number = CONFIG.AMOUNT_DECIMALS,
) => {
  return formatCurrency(amount, {
    ...AMOUNT_CFG,
    decimals,
    suffix: ' ' + CONFIG.DENOM.toUpperCase(),
  })
}

export function abbr(text = '', firstPart = 9, secondPart = 6): string {
  if (text.length <= firstPart + secondPart) return text
  return `${text.slice(0, firstPart)}...${text.slice(-secondPart)}`
}
