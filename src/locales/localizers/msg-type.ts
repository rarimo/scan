import { MessageTypeUrls } from '@rarimo/client'

import { TFunction } from '@/types'

/* prettier-ignore */
export const localizeMsgType = (t: TFunction, type: string) =>
  ({
    [MessageTypeUrls.Grant]: t('message-types.grant-lbl'),
    [MessageTypeUrls.Revoke]: t('message-types.revoke-lbl'),
    [MessageTypeUrls.Exec]: t('message-types.exec-lbl'),
    [MessageTypeUrls.Send]: t('message-types.send-lbl'),
    [MessageTypeUrls.MultiSend]: t('message-types.multi-send-lbl'),
    [MessageTypeUrls.VerifyInvariant]: t('message-types.verify-invariant-lbl'),
    [MessageTypeUrls.FundCommunityPool]: t('message-types.fund-community-pool-lbl'),
    [MessageTypeUrls.WithdrawDelegatorReward]: t('message-types.withdraw-delegator-reward-lbl'),
    [MessageTypeUrls.WithdrawValidatorCommission]: t('message-types.withdraw-validator-commission-lbl'),
    [MessageTypeUrls.SetWithdrawAddress]: t('message-types.set-withdraw-address-lbl'),
    [MessageTypeUrls.SubmitEvidence]: t('message-types.submit-evidence-lbl'),
    [MessageTypeUrls.RevokeAllowance]: t('message-types.revoke-allowance-lbl'),
    [MessageTypeUrls.GrantAllowance]: t('message-types.grant-allowance-lbl'),
    [MessageTypeUrls.Deposit]: t('message-types.deposit-lbl'),
    [MessageTypeUrls.Vote]: t('message-types.vote-proposal-lbl'),
    [MessageTypeUrls.VoteWeighted]: t('message-types.vote-weighted-lbl'),
    [MessageTypeUrls.SubmitProposal]: t('message-types.submit-proposal-lbl'),
    [MessageTypeUrls.Unjail]: t('message-types.unjail-lbl'),
    [MessageTypeUrls.BeginRedelegate]: t('message-types.begin-redelegate-lbl'),
    [MessageTypeUrls.CreateValidator]: t('message-types.create-validator-lbl'),
    [MessageTypeUrls.EditValidator]: t('message-types.edit-validator-lbl'),
    [MessageTypeUrls.Delegate]: t('message-types.delegate-lbl'),
    [MessageTypeUrls.Undelegate]: t('message-types.undelegate-lbl'),
    [MessageTypeUrls.CreateVestingAccount]: t('message-types.create-vesting-account-lbl'),
    [MessageTypeUrls.Transfer]: t('message-types.transfer-lbl'),

    [MessageTypeUrls.CreateChangePartiesOp]: t('message-types.create-change-parties-op-lbl'),
    [MessageTypeUrls.SetupInitial]: t('message-types.setup-initial-lbl'),
    [MessageTypeUrls.RarimoCreateTransferOp]: t('message-types.create-transfer-op-lbl'),
    [MessageTypeUrls.CreateConfirmation]: t('message-types.create-confirmation-lbl'),
    [MessageTypeUrls.RarimoVote]: t('message-types.vote-operation-lbl'),
    [MessageTypeUrls.CreateViolationReport]: t('message-types.create-violation-report-lbl'),
    [MessageTypeUrls.RarimoStake]: t('message-types.tss-stake-lbl'),
    [MessageTypeUrls.RarimoUnstake]: t('message-types.tss-unstake-lbl'),
    [MessageTypeUrls.ChangePartyAddress]: t('message-types.change-parties-address-lbl'),

    [MessageTypeUrls.EthereumTx]: t('message-types.ethereum-tx-lbl'),

    [MessageTypeUrls.DeleteInfo]: t('message-types.delete-info-lbl'),
    [MessageTypeUrls.CreateInfo]: t('message-types.create-info-lbl'),
    [MessageTypeUrls.AddChain]: t('message-types.add-chain-lbl'),

    [MessageTypeUrls.DepositNative]: t('message-types.deposit-native-lbl'),
    [MessageTypeUrls.WithdrawNative]: t('message-types.withdraw-native-lbl'),

    [MessageTypeUrls.MultisigSubmitProposal]: t('message-types.multisig-submit-proposal-lbl'),
    [MessageTypeUrls.MultisigVote]: t('message-types.multisig-vote-lbl'),
    [MessageTypeUrls.CreateGroup]: t('message-types.create-group-lbl'),
    [MessageTypeUrls.ChangeGroup]: t('message-types.change-group-lbl'),

    [MessageTypeUrls.OracleStake]: t('message-types.stake-lbl'),
    [MessageTypeUrls.OracleUnstake]: t('message-types.unstake-lbl'),
    [MessageTypeUrls.OracleCreateTransferOp]: t('message-types.create-transfer-op-lbl'),
    [MessageTypeUrls.OracleVote]: t('message-types.oracle-vote-lbl'),
    [MessageTypeUrls.OracleUnjail]: t('message-types.oracle-unjail-lbl'),
    [MessageTypeUrls.CreateIdentityDefaultTransferOp]: t('message-types.create-identity-default-transfer-op-lbl'),
    [MessageTypeUrls.CreateIdentityGISTTransferOp]: t('message-types.create-identity-gist-transfer-op-lbl'),
    [MessageTypeUrls.CreateIdentityStateTransferOp]: t('message-types.create-identity-state-transfer-op-lbl'),
    [MessageTypeUrls.MsgCreateWorldCoinIdentityTransferOp]: t('message-types.create-worldcoin-identity-transfer-op-lbl'),
  })[type]
