import { makeRarimoClient, RarimoClient } from '@rarimo/client'

import { CONFIG } from '@/config'

export let client: RarimoClient

export const initClient = async () => {
  if (client) return

  client = await makeRarimoClient({
    rpcUrl: CONFIG.CHAIN_RPC_URL,
    apiUrl: CONFIG.CHAIN_API_URL,
    prefix: CONFIG.CHAIN_ADDR_PREFIX,
    currency: {
      denom: CONFIG.DENOM,
      minDenom: CONFIG.MINIMAL_DENOM,
      decimals: CONFIG.DECIMALS,
    },
    gasPriceSteps: {
      low: Number(CONFIG.GAS_PRICE_STEP_LOW),
      average: Number(CONFIG.GAS_PRICE_STEP_AVG),
      high: Number(CONFIG.GAS_PRICE_STEP_HIGH),
    },
    tx: {
      amount: [{ denom: CONFIG.MINIMAL_DENOM, amount: String(CONFIG.FEE_AMOUNT) }],
      gas: String(CONFIG.GAS_AMOUNT),
    },
  })
}
