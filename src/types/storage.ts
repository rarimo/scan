import { ThemeMode } from '@/enums'

export type UiStorageState = {
  viewportWidth: number
  themeMode?: ThemeMode
}

export type Web3StorageState = {
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
