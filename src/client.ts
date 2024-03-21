import { makeRarimoClient, type RarimoClient } from '@rarimo/client'

import { CONFIG } from '@/config'

const baseCfg = {
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
}

const client = makeRarimoClient(baseCfg)
const serverClient = makeRarimoClient({
  ...baseCfg,
  apiUrl: CONFIG.IS_DEV_EDITION ? CONFIG.CHAIN_API_DOCKER_URL : CONFIG.CHAIN_API_URL,
})

export const getClient = (): RarimoClient => {
  return typeof window === 'undefined' ? serverClient : client
}
