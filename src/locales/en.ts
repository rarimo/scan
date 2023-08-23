// prettier-ignore
export default {
  "common": {
    "labels": {
      "something-wrong": "Something went wrong. Please try again.",
      "wallet-extension-not-installed": "Keplr wallet extension is not installed.",
      "wallet-not-initialized": "Wallet is not initialized. Please initialize your wallet first.",
      "wallet-broadcast-error": "There was an error while broadcasting the transaction. Please try again.",
      "network-error": "Something is temporary wrong with your network connection or our services. Please try again later.",
      "warning": "Something you are doing is not recommended",
      "success": "Action successful",
      "info": "Something is happening. Just want you to know that",
    },
    "cancel-btn": "Cancel",
    "close-btn": "Close",
    "create-btn": "Create",
    "delete-btn": "Delete",
    "submit-btn": "Submit",
    "edit-btn": "Edit",
    "open-btn": "Open",
    "save-btn": "Save",
    "back-btn": "Go back",
    "connect-wallet-btn": "Connect Wallet",
    "disconnect-wallet-btn": "Disconnect Wallet",
    "loading-error-msg": "There was an error while loading, please try again later.",
  },
  "account-transactions": {
    "title-lbl": "Transactions",
  },
  "header-network-switcher": {
    "testnet-lbl": "Testnet",
    "devnet-lbl": "Devnet",
    "mainnet-lbl": "Mainnet",
  },
  "header-blockchain-menu": {
    "menu-lbl": "Blockchain:",
    "blocks-lbl": "Blocks",
    "transactions-lbl": "Transactions",
    "validators-lbl": "Validators",
    "proposals-lbl": "Proposals",
  },
  "footer": {
    "promo-lbl": "An interoperability protocol for the next generation of multi-chain assets & identities",
    "navigation-links-lbl": "Blockchain",
    "blocks-lbl": "Blocks",
    "transactions-lbl": "Transactions",
    "validators-lbl": "Validators",
    "proposals-lbl": "Proposals",
    "follow-us-links-lbl": "Follow us",
    "discord-lbl": "Discord",
    "twitter-lbl": "Twitter",
    "telegram-lbl": "Telegram",
  },
  "home": {
    "title-part-1": "THE RARIMO ",
    "title-part-2": "BLOCKCHAIN ",
    "title-part-3": "EXPLORER",
  },
  "home-statistics": {
    "height-lbl": "Height",
    "transaction-lbl": "Transactions",
    "supply-lbl": "Supply",
    "average-block-time-lbl": "Average block time",
  },
  "snackbar-info": {
    "title-warning": "Warning",
    "title-success": "Success",
    "title-error": "Error",
    "title-info": "Info",
  },
  "transactions-list": {
    "title": "Latest transactions",
    "operation-col-lbl": "Operation",
    "from": "Sender",
    "view-all": "View all",
    "no-data-msg": "There are no last transactions, it will appear for a while",
    "hash-col-lbl": "Hash",
    "block-col-lbl": "Block",
    "status-col-lbl": "Status",
    "date-col-lbl": "Age",
    "sender-col-lbl": "Sender",
    "fee-col-lbl": "Fee",
    "table-lbl": "Transactions",
    "successful": "Successful",
    "unsuccessful": "Failed",
    "validator-col-lbl": "Validator",
  },
  "block-list": {
    "title": "Latest blocks",
    "validator": "Validator",
    "view-all": "View all",
    "no-data-msg": "There are no last blocks, it will appear for a while",
    "block-col-lbl": "Block",
    "tnx-col-lbl": "Transactions",
    "validator-col-lbl": "Validator",
    "date-col-lbl": "Age",
    "gas-col-lbl": "Total gas",
    "table-lbl": "Blocks",
  },
  "search": {
    "placeholder-lbl": "Search for a block, transaction, or address",
    "no-results-msg": "No results found",
    "search-btn": "Search",
  },
  "account": {
    "address-lbl": "Address:",
    "title-lbl": "Account details",
    "no-data-msg": "There is no account with such address.",
    "balance-lbl": "Balance:",
  },
  "copy-to-clipboard-wrapper": {
    "failed-msg": "Failed to copy to clipboard, using this API requires the permission in your browser settings or your browser not supported this API.",
    "copied-msg": "Copied",
  },
  "validation-errors": {
    "max-length": "This field must contain no more than {max} characters",
    "min-length": "This field must contain a minimum of {min} characters",
    "required": "Please fill out this field",
    "max-number": "This field should be less or equal {max}",
    "min-number": "This field should be more or equal {min}",
    "account": "Invalid account format. Public address should be valid bech32 string with prefix \"{prefix}\"",
    "ip-or-url": "This field should be valid IP address or URL with port suffix",
    "hex": "This field should be valid hex string",
  },
  "message-types": {
    "grant-lbl": "Grant",
    "revoke-lbl": "Revoke",
    "exec-lbl": "Exec",
    "send-lbl": "Send",
    "multi-send-lbl": "Multi Send",
    "verify-invariant-lbl": "Verify Invariant",
    "fund-community-pool-lbl": "Fund Community Pool",
    "withdraw-delegator-reward-lbl": "Withdraw Delegator Reward",
    "withdraw-validator-commission-lbl": "Withdraw Validator Commission",
    "set-withdraw-address-lbl": "Set Withdraw Address",
    "submit-evidence-lbl": "Submit Evidence",
    "revoke-allowance-lbl": "Revoke Allowance",
    "grant-allowance-lbl": "Grant Allowance",
    "deposit-lbl": "Deposit",
    "vote-lbl": "Vote",
    "vote-proposal-lbl": "Proposal Vote",
    "vote-operation-lbl": "Operation Vote",
    "vote-weighted-lbl": "Vote Weighted",
    "submit-proposal-lbl": "Submit Proposal",
    "unjail-lbl": "Unjail",
    "begin-redelegate-lbl": "Begin Redelegate",
    "create-validator-lbl": "Create Validator",
    "edit-validator-lbl": "Edit Validator",
    "delegate-lbl": "Delegate",
    "undelegate-lbl": "Undelegate",
    "create-vesting-account-lbl": "Create Vesting Account",
    "transfer-lbl": "Transfer",
    "create-change-parties-op-lbl": "Create Change Parties",
    "create-violation-report-lbl": "Create Violation Report",
    "change-parties-address-lbl": "Change Parties Address",
    "setup-initial-lbl": "Setup Initial",
    "create-confirmation-lbl": "Create Confirmation",
    "delete-info-lbl": "Delete Info",
    "create-info-lbl": "Create Info",
    "add-chain-lbl": "Add Chain",
    "tss-stake-lbl": "TSS Stake",
    "tss-unstake-lbl": "TSS Unstake",
    "deposit-native-lbl": "Deposit Native",
    "withdraw-native-lbl": "Withdraw Native",
    "multisig-submit-proposal-lbl": "Multisig Submit Proposal",
    "multisig-vote-lbl": "Multisig Vote",
    "create-group-lbl": "Multisig Create Group",
    "change-group-lbl": "Multisig Change Group",
    "stake-lbl": "Oracle Stake",
    "unstake-lbl": "Oracle Unstake",
    "create-transfer-op-lbl": "Oracle Create Transfer",
    "oracle-vote-lbl": "Oracle Vote",
    "oracle-unjail-lbl": "Oracle Unjail",
    "unknown-lbl": "Unknown",
    "ethereum-tx-lbl": "Ethereum Tx",
  },
  "proposal-status": {
    "unspecified-lbl": "Unknown",
    "deposit-period-lbl": "Deposit Period",
    "voting-period-lbl": "Voting Period",
    "passed-lbl": "Passed",
    "rejected-lbl": "Rejected",
    "failed-lbl": "Failed",
    "unrecognized-lbl": "Unknown",
  },
  "proposal-type": {
    "unfreeze-signer-party-lbl": "Unfreeze Signer Party",
    "reshare-keys-lbl": "Reshare Keys",
    "slash-lbl": "Slash",
    "drop-parties-lbl": "Drop Parties",
    "upgrade-contract-lbl": "Upgrade Contract",
    "add-network-lbl": "Add Network",
    "remove-network-lbl": "Remove Network",
    "add-fee-token-lbl": "Add Fee Token",
    "update-fee-token-lbl": "Update Fee Token",
    "remove-fee-token-lbl": "Remove Fee Token",
    "withdraw-fee-lbl": "Withdraw Fee",
    "create-collection-lbl": "Create Collection",
    "remove-collection-lbl": "Remove Collection",
    "add-collection-data-lbl": "Add Collection Data",
    "update-collection-data-lbl": "Update Collection Data",
    "remove-collection-data-lbl": "Remove Collection Data",
    "update-token-item-lbl": "Update Token Item",
    "remove-token-item-lbl": "Remove Token Item",
    "oracle-unfreeze-lbl": "Oracle Unfreeze",
    "oracle-change-params-lbl": "Oracle Change Params",
    "bridge-change-params-lbl": "Bridge Change Params",
    "software-upgrade-lbl": "Software Upgrade",
    "cancel-software-upgrade-lbl": "Cancel Software Upgrade",
    "parameter-change-lbl": "Parameter Change",
    "community-pool-spend-lbl": "Community Pool Spend",
    "mint-tokens-lbl": "Mint Tokens",
    "unknown-lbl": "Unknown",
  },
  "proposal-vote": {
    "unspecified-lbl": "Unspecified",
    "yes-lbl": "Yes",
    "abstain-lbl": "Abstain",
    "no-lbl": "No",
    "no-with-veto-lbl": "No with veto",
    "rejected-lbl": "Rejected",
    "unrecognized-lbl": "Unrecognized",
  },
  "validator-status": {
    "unspecified-lbl": "Unspecified",
    "unbonding-lbl": "Unbonding",
    "unbonded-lbl": "Unbonded",
    "active-lbl": "Active",
    "unrecognized-lbl": "Unrecognized",
    "jailed-lbl": "Jailed",
    "tombstoned-lbl": "Tombstoned",
  },
  "transaction-details": {
    "title": "Transaction details",
    "hash-lbl": "Hash:",
    "status-lbl": "Status:",
    "block-lbl": "Block:",
    "age-lbl": "Age:",
    "sender-lbl": "Sender:",
    "validator-lbl": "Validator:",
    "fee-lbl": "Fee:",
    "operation-lbl": "Operation:",
    "gas-used-lbl": "Gas used:",
    "no-data-message": "There is no transaction with such hash.",
  },
  "transaction-details-content-row": {
    "heading-messages-lbl": "Messages",
    "heading-raw-log-lbl": "Logs",
  },
  "table-collapse-row": {
    "show-lbl": "Show",
    "hide-lbl": "Hide",
  },
  "block-details": {
    "title": "Block details",
    "hash-lbl": "Hash:",
    "height-lbl": "Height:",
    "age-lbl": "Age:",
    "validator-lbl": "Validator:",
    "gas-total-lbl": "Total gas:",
    "tnx-lbl": "Transactions:",
    "no-data-message": "There is no block with such height.",
  },
  "block-transactions": {
    "title-lbl": "Transactions",
  },
  "proposals": {
    "title-lbl": "Proposals",
    "id-col-lbl": "ID",
    "title-col-lbl": "Title",
    "type-col-lbl": "Type",
    "status-col-lbl": "Status",
    "proposer-col-lbl": "Proposer's address",
    "table-lbl": "Proposals",
    "no-data-msg": "There is no existing proposals.",
  },
  "proposal-deposits": {
    "title-lbl": "Deposits",
    "depositor-account-id-col-lbl": "Depositor's account ID",
    "tx-hash-col-lbl": "Transaction hash",
    "age-col-lbl": "Age",
    "block-height-col-lbl": "Block",
    "amount-col-lbl": "Amount",
    "table-lbl": "Proposal Deposits",
    "no-data-msg": "There is no deposits for this proposal, it will appear for a while.",
  },
  "proposal-votes": {
    "title-lbl": "Votes",
    "voter-account-id-col-lbl": "Voter's account ID",
    "tx-hash-col-lbl": "Transaction hash",
    "option-col-lbl": "Option",
    "block-height-col-lbl": "Block",
    "amount-col-lbl": "Amount",
    "age-col-lbl": "Age",
    "table-lbl": "Proposal Votes",
    "no-data-msg": "There is no votes for this proposal, it will appear for a while.",
  },
  "proposal": {
    "title": "Proposal #{id} Details",
    "proposal-vote-submitted-msg": "Vote for proposal #{id} successfully submitted.",
    "connect-wallet-msg": "Please connect your wallet to be able to vote.",
    "not-validator-msg": "Only validators allowed to vote for proposals.",
    "vote-not-allowed-msg": "Not allowed proposal's status for voting.",
    "vote-btn": "Vote",
    "vote-dialog-heading": "Vote for proposal #{id}",
  },
  "proposal-details": {
    "proposer-account-id-lbl": "Proposer's account ID:",
    "no-data-msg": "There is no proposal with such ID.",
    "title-lbl": "Title:",
    "description-lbl": "Description:",
    "status-lbl": "Status:",
    "type-lbl": "Proposal type:",
    "table-lbl": "Proposal Overview",
    "submit-block-lbl": "Submit block:",
    "voting-start-block-lbl": "Voting start block:",
    "voting-end-block-lbl": "Voting end block:",
    "deposit-end-block-lbl": "Deposit end block:",
    "tally-result-lbl": "Tally result:",
    "tally-result-yes-lbl": "Yes - ",
    "tally-result-no-lbl": "No - ",
    "tally-result-no-with-veto-lbl": "No With Veto - ",
    "tally-result-abstain-lbl": "Abstain - ",
  },
  "proposal-details-content-row": {
    "heading-lbl": "Content",
  },
} as const
