export enum RoutePaths {
  Main = '/',

  // Blockchain
  Blocks = '/blocks',
  Block = '/blocks/[height]',
  Transactions = '/transactions',
  Transaction = '/transactions/[hash]',
  Proposals = '/proposals',
  Proposal = '/proposals/[id]',
  Account = '/accounts/[address]',
  Validators = '/validators',
  Validator = '/validators/[address]',

  // Bridge
  TSSs = '/tss',
  TSS = '/tss/[address]',
  Oracles = '/oracles',
  Oracle = '/oracles/[address]',
  Operations = '/operations',
  Operation = '/operations/[index]',
  Confirmations = '/confirmations',
  Confirmation = '/confirmations/[root]',
  Networks = '/networks',
  Network = '/networks/[name]',
}
