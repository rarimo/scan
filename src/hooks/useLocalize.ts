'use client'

import { BondStatus, ProposalType } from '@rarimo/client'
import { AnyObject, Flags, Maybe, Schema } from 'yup'

import { createYupInitFn } from '@/helpers'
import { useI18n } from '@/locales/client'
import {
  localizeMsgType,
  localizeProposalStatus,
  localizeProposalType,
  localizeProposalVoteOption,
  localizeValidatorStatus,
} from '@/locales/localizers'

declare module 'yup' {
  export interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TType, TContext, TDefault, TFlags> {
    maxNumber(max: number | string): this
    minNumber(min: number | string): this
    cosmosAddress(): this
    ipOrUrl(): this
    hex(): this
  }
}

export const useLocalize = () => {
  const t = useI18n()

  const localizers = {
    localizeProposalStatus: (status: unknown) => localizeProposalStatus(t, status),
    localizeProposalVoteOption: (option: unknown) => localizeProposalVoteOption(t, option),
    localizeProposalType: (type: ProposalType) => localizeProposalType(t, type),
    localizeMsgType: (type: string) => localizeMsgType(t, type),
    localizeValidatorStatus: (status: BondStatus, jailed: boolean) =>
      localizeValidatorStatus(t, status, jailed),
  }

  return {
    init: createYupInitFn(t),
    ...localizers,
  }
}
