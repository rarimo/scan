import { omit } from 'lodash-es'

import { LocalStorageKeys } from '@/enums'
import { StorageGetter, UiStorageState } from '@/types'

import { BaseStorage } from './base'

export class UiStorage extends BaseStorage<LocalStorageKeys.Ui> {
  private static instance?: UiStorage

  private constructor(storageGetter: StorageGetter) {
    super(storageGetter)
  }

  public static getInstance(storageGetter: StorageGetter): UiStorage {
    if (!this.instance) this.instance = new UiStorage(storageGetter)
    return this.instance
  }

  public save(storage: UiStorageState): void {
    this.set(LocalStorageKeys.Ui, JSON.stringify(omit(storage, 'viewportWidth')))
  }

  public getStorage(initialState: UiStorageState): UiStorageState {
    const restored = this.get(LocalStorageKeys.Ui)
    return restored ? { ...JSON.parse(restored), viewportWidth: window.innerWidth } : initialState
  }

  public clear(): void {
    this.clearItem(LocalStorageKeys.Ui)
  }
}
