'use client'

import { createContext } from 'react'

import { TAppStateContext } from '@/types'

export const AppStateContext = createContext<TAppStateContext>({} as TAppStateContext)
