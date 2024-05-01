import { ProposalType } from '@rarimo/client'

import { TFunction } from '@/types'

/* prettier-ignore */
export const localizeProposalType = (t: TFunction, type: ProposalType) =>
  ({
    [ProposalType.UnfreezeSignerParty]: t('proposal-type.unfreeze-signer-party-lbl'),
    [ProposalType.ReshareKeys]: t('proposal-type.reshare-keys-lbl'),
    [ProposalType.Slash]: t('proposal-type.slash-lbl'),
    [ProposalType.DropParties]: t('proposal-type.drop-parties-lbl'),
    [ProposalType.UpgradeContract]: t('proposal-type.upgrade-contract-lbl'),
    [ProposalType.AddNetwork]: t('proposal-type.add-network-lbl'),
    [ProposalType.RemoveNetwork]: t('proposal-type.remove-network-lbl'),
    [ProposalType.AddFeeToken]: t('proposal-type.add-fee-token-lbl'),
    [ProposalType.UpdateFeeToken]: t('proposal-type.update-fee-token-lbl'),
    [ProposalType.RemoveFeeToken]: t('proposal-type.remove-fee-token-lbl'),
    [ProposalType.WithdrawFee]: t('proposal-type.withdraw-fee-lbl'),
    [ProposalType.CreateCollection]: t('proposal-type.create-collection-lbl'),
    [ProposalType.RemoveCollection]: t('proposal-type.remove-collection-lbl'),
    [ProposalType.AddCollectionData]: t('proposal-type.add-collection-data-lbl'),
    [ProposalType.UpdateCollectionData]: t('proposal-type.update-collection-data-lbl'),
    [ProposalType.RemoveCollectionData]: t('proposal-type.remove-collection-data-lbl'),
    [ProposalType.UpdateTokenItem]: t('proposal-type.update-token-item-lbl'),
    [ProposalType.RemoveTokenItem]: t('proposal-type.remove-token-item-lbl'),
    [ProposalType.OracleUnfreeze]: t('proposal-type.oracle-unfreeze-lbl'),
    [ProposalType.OracleChangeParams]: t('proposal-type.oracle-change-params-lbl'),
    [ProposalType.BridgeChangeParams]: t('proposal-type.bridge-change-params-lbl'),
    [ProposalType.SoftwareUpgrade]: t('proposal-type.software-upgrade-lbl'),
    [ProposalType.CancelSoftwareUpgrade]: t('proposal-type.cancel-software-upgrade-lbl'),
    [ProposalType.ParameterChange]: t('proposal-type.parameter-change-lbl'),
    [ProposalType.CommunityPoolSpend]: t('proposal-type.community-pool-spend-lbl'),
    [ProposalType.MintTokens]: t('proposal-type.mint-tokens-lbl'),
    [ProposalType.Text]: t('proposal-type.text-lbl'),
    [ProposalType.EditCSCAListProposal]: t('proposal-type.edit-csca-list-lbl'),
    [ProposalType.ReplaceCSCAListProposal]: t('proposal-type.replace-csca-list-lbl'),
  }[type])
