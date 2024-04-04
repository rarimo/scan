import { LocalStorageKeys, StorageGetter, Web3StorageState } from '@/types'

import { BaseStorage } from './base'

export class Web3Storage extends BaseStorage<LocalStorageKeys.Web3> {
  private static instance?: Web3Storage

  private constructor(storageGetter: StorageGetter) {
    super(storageGetter)
  }

  public static getInstance(storageGetter: StorageGetter): Web3Storage {
    if (!this.instance) this.instance = new Web3Storage(storageGetter)
    return this.instance
  }

  public save(storage: Web3StorageState): void {
    this.set(LocalStorageKeys.Web3, JSON.stringify(storage))
  }

  public getStorage(initialState: {
    address: string
    isConnected: boolean
    isStaker: boolean
    isValidator: boolean
  }): Web3StorageState {
    const restored = this.get(LocalStorageKeys.Web3)
    return restored ? JSON.parse(restored) : initialState
  }

  public clear(): void {
    this.clearItem(LocalStorageKeys.Web3)
  }
}
