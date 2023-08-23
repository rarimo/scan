import { pubkeyToAddress, pubkeyType } from '@cosmjs/amino'
import { fromHex, toBech32 } from '@cosmjs/encoding'
import { isHex } from '@distributedlab/tools'

import { CONFIG } from '@/config'
import { TransactionBaseFragment, TransactionFragment, TransactionListFragment } from '@/graphql'
import { TransactionEVMLog } from '@/types'

export const parseAddress = (
  tx?: TransactionBaseFragment | TransactionListFragment | TransactionFragment,
) => {
  const sender = tx?.signer_infos?.[0]?.public_key
  if (sender) {
    return pubkeyToAddress(
      {
        type: pubkeyType.secp256k1,
        value: sender.key,
      },
      CONFIG.CHAIN_ID,
    )
  }

  if (!tx?.raw_log) return ''

  const logs = JSON.parse(tx.raw_log) as TransactionEVMLog[]
  const senderEvent = logs?.[0]?.events?.find(i => i.type === 'message')

  if (!senderEvent) return ''

  const senderAddressHex = senderEvent.attributes?.find(i => i.key === 'sender' && isHex(i.value))
    ?.value

  if (!senderAddressHex) return ''

  return hexToBech32(senderAddressHex.replace('0x', ''), 'rarimo')
}

export const hexToBech32 = (address: string, prefix: string) => {
  const addressBuffer = fromHex(address)
  return toBech32(prefix, addressBuffer)
}
