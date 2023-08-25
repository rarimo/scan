export enum RoutePaths {
  Main = '/',
  Blocks = '/blocks',
  Block = '/blocks/[height]',
  Transactions = '/transactions',
  Transaction = '/transactions/[hash]',
  Proposals = '/proposals',
  Proposal = '/proposals/[id]',
  Account = '/accounts/[address]',
  Validators = '/validators',
  Validator = '/validators/[address]',
}
