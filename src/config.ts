import { Metadata } from 'next'

// prettier-ignore
export const CONFIG = {
  APP_URL: String(process.env.URL),
  APP_NAME: 'Rarimo Blockchain Explorer',
  APP_DESCRIPTION: 'The Rarimo Blockchain Explorer allows you to explore and search the Rarimo blockchain for transactions, accounts, validators, proposals, and other activities.',
  CHAIN_API_URL: String(process.env.CHAIN_API_URL),
  CHAIN_RPC_URL: String(process.env.CHAIN_RPC_URL),
  CHAIN_ID: String(process.env.CHAIN_ID),
  CHAIN_ADDR_PREFIX: String(process.env.CHAIN_ADDR_PREFIX),
  CHAIN_NAME: String(process.env.CHAIN_NAME),
  CHAIN_ICON_URL: 'https://raw.githubusercontent.com/rarimo/js-sdk/2.0.0-rc.14/assets/logos/ra-dark-logo.png',
  DENOM: String(process.env.DENOM),
  MINIMAL_DENOM: String(process.env.MINIMAL_DENOM),
  GRAPHQL_URL: String(process.env.GRAPHQL_URL),
  GAS_PRICE_STEP_LOW: String(process.env.GAS_PRICE_STEP_LOW),
  GAS_PRICE_STEP_AVG: String(process.env.GAS_PRICE_STEP_AVG),
  GAS_PRICE_STEP_HIGH: String(process.env.GAS_PRICE_STEP_HIGH),
  GAS_PRICE: String(process.env.GAS_PRICE),
  DEVNET_URL: String(process.env.DEVNET_URL ?? ''),
  TESTNET_URL: String(process.env.TESTNET_URL ?? ''),
  MAINNET_URL: String(process.env.MAINNET_URL ?? ''),
  // Internal
  DECIMALS: 6,
  PERCENT_DECIMALS: 2,
  AMOUNT_DECIMALS: 2,
  PAGE_LIMIT: 10,
  UPDATE_INTERVAL: 5000,
  DISCORD_URL: 'https://discord.gg/Bzjm5MDXrU',
  TELEGRAM_URL: 'https://t.me/+m_vvj8nFk5g4NTgy',
  TWITTER_URL: 'https://twitter.com/Rarimo_protocol',
  DOCUMENTATION_URL: 'https://docs.rarimo.com',
  SUPPORT_URL: 'https://rarimo.com#community-section',
  USE_CASES_URL: 'https://rarimo.com#use-cases-section',
} as const

export const METADATA: Metadata = {
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
    description: CONFIG.APP_DESCRIPTION,
    locale: 'en_GB',
    type: 'website',
    images: '/preview-card.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    description: CONFIG.APP_DESCRIPTION,
    images: '/preview-card.jpg',
  },
}

const createPageTitle = (pageName: string): string => {
  return `${pageName} | ${CONFIG.APP_NAME}`
}

export const createMetadata = (pageName: string): Metadata => {
  const title = createPageTitle(pageName)

  return {
    metadataBase: new URL(CONFIG.APP_URL),
    title,
    ...METADATA,
    openGraph: {
      ...METADATA.openGraph,
      title,
    },
    twitter: {
      ...METADATA.twitter,
      title,
    },
  }
}
