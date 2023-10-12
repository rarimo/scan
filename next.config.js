/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
  env: {
    URL: process.env.URL,
    CHAIN_ID: process.env.CHAIN_ID,
    CHAIN_ADDR_PREFIX: process.env.CHAIN_ADDR_PREFIX,
    CHAIN_NAME: process.env.CHAIN_NAME,
    DENOM: process.env.DENOM,
    PROTOCOL_ENV: process.env.PROTOCOL_ENV,
    MINIMAL_DENOM: process.env.MINIMAL_DENOM,
    GAS_PRICE_STEP_LOW: process.env.GAS_PRICE_STEP_LOW,
    GAS_PRICE_STEP_AVG: process.env.GAS_PRICE_STEP_AVG,
    GAS_PRICE_STEP_HIGH: process.env.GAS_PRICE_STEP_HIGH,
    GAS_PRICE: process.env.GAS_PRICE,
    DEVNET_URL: process.env.DEVNET_URL,
    TESTNET_URL: process.env.TESTNET_URL,
    MAINNET_URL: process.env.MAINNET_URL,
    CHAIN_API_URL: process.env.CHAIN_API_URL,
    CHAIN_RPC_URL: process.env.CHAIN_RPC_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
}
