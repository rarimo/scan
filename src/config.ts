import { Metadata } from 'next'

export const CONFIG = {
  APP_URL: String(process.env.URL),
  APP_NAME: String(process.env.NAME),
  APP_DESCRIPTION: String(process.env.DESCRIPTION),
  CHAIN_API_URL: String(process.env.CHAIN_API_URL),
  CHAIN_RPC_URL: String(process.env.CHAIN_RPC_URL),
  CHAIN_ID: String(process.env.CHAIN_ID),
  CHAIN_ADDR_PREFIX: String(process.env.CHAIN_ADDR_PREFIX),
  CHAIN_NAME: String(process.env.CHAIN_NAME),
  CHAIN_ICON_URL: String(process.env.CHAIN_ICON_URL),
  DENOM: String(process.env.DENOM),
  MINIMAL_DENOM: String(process.env.MINIMAL_DENOM),
  GRAPHQL_URL: String(process.env.GRAPHQL_URL),
  GAS_PRICE_STEP_LOW: String(process.env.GAS_PRICE_STEP_LOW),
  GAS_PRICE_STEP_AVG: String(process.env.GAS_PRICE_STEP_AVG),
  GAS_PRICE_STEP_HIGH: String(process.env.GAS_PRICE_STEP_HIGH),
  DEVNET_URL: String(process.env.DEVNET_URL),
  TESTNET_URL: String(process.env.TESTNET_URL),
  MAINNET_URL: String(process.env.MAINNET_URL),
  // Internal
  DECIMALS: 6,
  PERCENT_DECIMALS: 2,
  AMOUNT_DECIMALS: 2,
  PAGE_LIMIT: 10,
  UPDATE_INTERVAL: 5000,
  FEE_AMOUNT: 100000000,
  GAS_AMOUNT: 10000000,
  DISCORD_URL: 'https://discord.gg/Bzjm5MDXrU',
  TELEGRAM_URL: 'https://t.me/+m_vvj8nFk5g4NTgy',
  TWITTER_URL: 'https://twitter.com/Rarimo_protocol',
} as const

export const METADATA: Metadata = {
  metadataBase: new URL(CONFIG.APP_URL),
  description: CONFIG.APP_DESCRIPTION,
  applicationName: CONFIG.APP_NAME,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  colorScheme: 'dark light',
  viewport:
    'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0',
  creator: 'Rarimo Team',
  openGraph: {
    title: CONFIG.APP_NAME,
    description: CONFIG.APP_DESCRIPTION,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    description: CONFIG.APP_DESCRIPTION,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
    },
  },
}

export const craftPageTitle = (pageName: string): string => {
  return `${pageName} | ${CONFIG.APP_NAME}`
}
