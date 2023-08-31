import { BN } from '@distributedlab/tools'
import { omit } from 'lodash-es'

import { CONFIG } from '@/config'
import { TallyResultFragment } from '@/graphql'
import { TallyResult } from '@/types'

const CFG_FORMAT = { decimals: 2 }
const ONE_HUNDRED = 100

export const calculateTallyResults = (tally: TallyResultFragment) => {
  const { yes, no, abstain, no_with_veto } = tally

  const total = BN.fromBigInt(yes, CONFIG.DECIMALS)
    .add(BN.fromBigInt(no, CONFIG.DECIMALS))
    .add(BN.fromBigInt(abstain, CONFIG.DECIMALS))
    .add(BN.fromBigInt(no_with_veto, CONFIG.DECIMALS))

  return Object.entries(omit(tally, '__typename')).reduce((acc, [key, value]) => {
    acc[key as keyof TallyResult] = BN.fromRaw(ONE_HUNDRED, CONFIG.DECIMALS)
      .mul(
        BN.fromBigInt(value, CONFIG.DECIMALS).div(
          total.isZero ? BN.fromBigInt(1, CONFIG.DECIMALS) : total,
        ),
      )
      .format(CFG_FORMAT)

    return acc
  }, {} as TallyResult)
}
