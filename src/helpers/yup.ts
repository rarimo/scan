import { BN } from '@distributedlab/tools'
import * as yup from 'yup'

import { CONFIG } from '@/config'
import { useI18n } from '@/locales/client'

import { cosmosAddress, hex, ipOrUrl, maxNumber, minNumber } from './validations'

export const createYupInitFn = (t: ReturnType<typeof useI18n>) => {
  const setupLocalization = () => {
    yup.setLocale({
      mixed: {
        required: `${t('validation-errors.required')}`,
      },
      string: {
        min: values => t('validation-errors.min-length', values),
        max: values => t('validation-errors.max-length', values),
      },
    })
  }

  const setupValidators = () => {
    yup.addMethod<yup.StringSchema>(yup.string, 'maxNumber', function (max) {
      return this.test({
        message: t('validation-errors.max-number', {
          max: BN.fromBigInt(max, CONFIG.DECIMALS).format({
            decimals: CONFIG.DECIMALS,
          }),
        }),
        name: 'maxNumber',
        params: {
          max,
        },
        test: maxNumber(max),
      })
    })

    yup.addMethod<yup.StringSchema>(yup.string, 'minNumber', function (min) {
      return this.test({
        message: t('validation-errors.min-number', {
          min: BN.fromBigInt(min, CONFIG.DECIMALS).format({
            decimals: CONFIG.DECIMALS,
          }),
        }),
        name: 'minNumber',
        params: {
          min,
        },
        test: minNumber(min),
      })
    })

    yup.addMethod<yup.StringSchema>(yup.string, 'cosmosAddress', function () {
      return this.test({
        message: t('validation-errors.account', {
          prefix: CONFIG.CHAIN_ID,
        }),
        name: 'cosmosAddress',
        test: cosmosAddress,
      })
    })

    yup.addMethod<yup.StringSchema>(yup.string, 'ipOrUrl', function () {
      return this.test({
        message: t('validation-errors.ip-or-url'),
        name: 'ipOrUrl',
        test: ipOrUrl,
      })
    })

    yup.addMethod<yup.StringSchema>(yup.string, 'hex', function () {
      return this.test({
        message: t('validation-errors.hex'),
        name: 'hex',
        test: hex,
      })
    })
  }

  return () => {
    setupLocalization()
    setupValidators()
  }
}
