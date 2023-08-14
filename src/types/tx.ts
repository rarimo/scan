export type TransactionEVMEvent = {
  type: string
  attributes: { key: string; value: string }[] | null
}

export type TransactionEVMLog = {
  msg_index: number
  events: TransactionEVMEvent[]
}
