import { Metadata } from 'next'

const env = (value?: string): string => value ?? ''
const boolFromStr = (value?: string): boolean => value === 'true'

// prettier-ignore
export const CONFIG = {
  APP_URL: env(process.env.NEXT_PUBLIC_URL),
  APP_NAME: 'Rarimo Blockchain Explorer',
  APP_DESCRIPTION: 'Rarimo Blockchain Explorer allows you to explore and search the Rarimo blockchain for transactions, accounts, validators, proposals, and other activities.',
  CHAIN_API_URL: env(process.env.NEXT_PUBLIC_CHAIN_API_URL),
  CHAIN_RPC_URL: env(process.env.NEXT_PUBLIC_CHAIN_RPC_URL),
  PROTOCOL_ENV: env(process.env.NEXT_PUBLIC_PROTOCOL_ENV),
  CHAIN_ID: env(process.env.NEXT_PUBLIC_CHAIN_ID),
  CHAIN_ADDR_PREFIX: env(process.env.NEXT_PUBLIC_CHAIN_ADDR_PREFIX),
  CHAIN_NAME: env(process.env.NEXT_PUBLIC_CHAIN_NAME),
  CHAIN_ICON_URL: 'https://raw.githubusercontent.com/rarimo/js-sdk/2.0.0-rc.14/assets/logos/ra-dark-logo.png',
  DENOM: env(process.env.NEXT_PUBLIC_DENOM),
  MINIMAL_DENOM: env(process.env.NEXT_PUBLIC_MINIMAL_DENOM),
  GRAPHQL_URL: env(process.env.NEXT_PUBLIC_GRAPHQL_URL),
  GAS_PRICE_STEP_LOW: env(process.env.NEXT_PUBLIC_GAS_PRICE_STEP_LOW),
  GAS_PRICE_STEP_AVG: env(process.env.NEXT_PUBLIC_GAS_PRICE_STEP_AVG),
  GAS_PRICE_STEP_HIGH: env(process.env.NEXT_PUBLIC_GAS_PRICE_STEP_HIGH),
  GAS_PRICE: env(process.env.NEXT_PUBLIC_GAS_PRICE),
  DEVNET_URL: env(process.env.NEXT_PUBLIC_DEVNET_URL),
  TESTNET_URL: env(process.env.NEXT_PUBLIC_TESTNET_URL),
  MAINNET_URL: env(process.env.NEXT_PUBLIC_MAINNET_URL),
  IS_DEV_EDITION: boolFromStr(process.env.NEXT_PUBLIC_IS_DEV_EDITION) || false,

  // Internal
  GRAPHQL_DOCKER_URL: 'http://hasura:8080/v1/graphql',
  CHAIN_API_DOCKER_URL: 'http://validator:1317',
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
