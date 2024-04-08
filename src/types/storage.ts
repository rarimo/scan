import { ThemeMode } from './theme'

export enum LocalStorageKeys {
  Ui = 'rarimo-scan/ui',
  Web3 = 'rarimo-scan/web3',
}

export type UiStorageState = {
  viewportWidth: number
  themeMode?: ThemeMode
}

export type Web3StorageState = {
  isStaker: boolean
  isConnected: boolean
  isValidator: boolean
  address: string
}

export interface IStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export type StorageGetter = () => IStorage
