import { ProposalType } from '@rarimo/client'

/* prettier-ignore */
export const PROPOSAL_TYPES_MAP = {
  'rarimocore/UnfreezeSignerPartyProposal': ProposalType.UnfreezeSignerParty,
  "/rarimo.rarimocore.rarimocore.UnfreezeSignerPartyProposal": ProposalType.UnfreezeSignerParty,
  'rarimocore/ReshareKeysProposal': ProposalType.ReshareKeys,
  'rarimocore/SlashProposal': ProposalType.Slash,
  'rarimocore/DropPartiesProposal': ProposalType.DropParties,
  'rarimo.rarimocore.tokenmanager.UpgradeContractProposal': ProposalType.UpgradeContract,
  'rarimo.rarimocore.tokenmanager.AddNetworkProposal': ProposalType.AddNetwork,
  'rarimo.rarimocore.tokenmanager.RemoveNetworkProposal': ProposalType.RemoveNetwork,
  'rarimo.rarimocore.tokenmanager.AddFeeTokenProposal': ProposalType.AddFeeToken,
  'rarimo.rarimocore.tokenmanager.UpdateFeeTokenProposal': ProposalType.UpdateFeeToken,
  'rarimo.rarimocore.tokenmanager.RemoveFeeTokenProposal': ProposalType.RemoveFeeToken,
  'rarimo.rarimocore.tokenmanager.WithdrawFeeProposal': ProposalType.WithdrawFee,
  'rarimo.rarimocore.tokenmanager.UpdateTokenItemProposal': ProposalType.UpdateTokenItem,
  'rarimo.rarimocore.tokenmanager.RemoveTokenItemProposal': ProposalType.RemoveTokenItem,
  'rarimo.rarimocore.tokenmanager.CreateCollectionProposal': ProposalType.CreateCollection,
  'rarimo.rarimocore.tokenmanager.UpdateCollectionDataProposal': ProposalType.UpdateCollectionData,
  'rarimo.rarimocore.tokenmanager.AddCollectionDataProposal': ProposalType.AddCollectionData,
  'rarimo.rarimocore.tokenmanager.RemoveCollectionDataProposal': ProposalType.RemoveCollectionData,
  'rarimo.rarimocore.tokenmanager.RemoveCollectionProposal': ProposalType.RemoveCollection,
  'bridge/ChangeParamsProposal': ProposalType.BridgeChangeParams,
  'oraclemanager/OracleUnfreezeProposal': ProposalType.OracleUnfreeze,
  'oraclemanager/ChangeParamsProposal': ProposalType.OracleChangeParams,
  '/cosmos.gov.v1beta1.TextProposal': ProposalType.Text,
  '/rarimo.rarimocore.cscalist.ReplaceCSCAListProposal': ProposalType.ReplaceCSCAListProposal,
  '/rarimo.rarimocore.cscalist.EditCSCAListProposal': ProposalType.EditCSCAListProposal,

  ParameterChange: ProposalType.ParameterChange,
  SoftwareUpgrade: ProposalType.SoftwareUpgrade,
  CancelSoftwareUpgrade: ProposalType.CancelSoftwareUpgrade,
  CommunityPoolSpend: ProposalType.CommunityPoolSpend,
  mint_tokens: ProposalType.MintTokens,
}
