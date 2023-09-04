import { makeRarimoClient } from '@rarimo/client'

import { CONFIG } from '@/config'

export const client = makeRarimoClient({
  rpcUrl: CONFIG.CHAIN_RPC_URL,
  apiUrl: CONFIG.CHAIN_API_URL,
  prefix: CONFIG.CHAIN_ADDR_PREFIX,
  chainName: CONFIG.CHAIN_NAME,
  chainIconUrl: CONFIG.CHAIN_ICON_URL,
  currency: {
    denom: CONFIG.DENOM,
    minDenom: CONFIG.MINIMAL_DENOM,
    decimals: CONFIG.DECIMALS,
  },
  gasPrice: {
    amount: Number(CONFIG.GAS_PRICE),
    steps: {
      low: Number(CONFIG.GAS_PRICE_STEP_LOW),
      average: Number(CONFIG.GAS_PRICE_STEP_AVG),
      high: Number(CONFIG.GAS_PRICE_STEP_HIGH),
    },
  },
})
