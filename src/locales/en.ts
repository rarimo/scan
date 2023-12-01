// prettier-ignore
export default {
  "404": {
    "title": "Sorry, this page not existed",
    "homepage-link": "Home Page",
    "transaction-link": "Transactions",
    "block-link": "Blocks",
  },
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
    "menu-lbl": "Blockchain",
    "blocks-lbl": "Blocks",
    "transactions-lbl": "Transactions",
    "validators-lbl": "Validators",
    "proposals-lbl": "Proposals",
  },
  "header-bridge-menu": {
    "menu-lbl": "Bridge",
    "tss-lbl": "TSS",
    "oracles-lbl": "Oracles",
    "operations-lbl": "Operations",
    "confirmations-lbl": "Confirmations",
    "networks-lbl": "Networks",
    "supported-tokens-lbl": "Supported Tokens",
  },
  "footer": {
    "navigation-links-lbl": "Navigation",
    "documentation-lbl": "Documentation",
    "use-cases-lbl": "Use cases",
    "support-lbl": "Support",
    "follow-us-links-lbl": "Follow us",
    "discord-lbl": "Discord",
    "twitter-lbl": "Twitter",
    "telegram-lbl": "Telegram",
  },
  "home": {
    "title-part-1": "RARIMO ",
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
  "transaction-list": {
    "title": "Latest transactions",
    "operation-col-lbl": "Operation",
    "from": "Sender",
    "view-all": "View all",
    "no-data-title": "There is no existing transactions",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading transactions",
    "error-subtitle": "Please try again later",
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
    "block": "block",
    "transaction": "tx#",
    "validator": "Validator",
    "view-all": "View all",
    "no-data-title": "There are no blocks",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading blocks",
    "error-subtitle": "Please try again later",
    "block-col-lbl": "Block",
    "tnx-col-lbl": "Transactions",
    "validator-col-lbl": "Validator",
    "date-col-lbl": "Age",
    "gas-col-lbl": "Total gas",
    "table-lbl": "Blocks",
  },
  "search": {
    "placeholder-lbl": "Search for a block, transaction, or address",
    "placeholder-small-lbl": "Search...",
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
    "create-identity-default-transfer-op-lbl": "Create Identity Transfer",
    "create-identity-gist-transfer-op-lbl": "Create Identity GIST Transfer",
    "create-identity-state-transfer-op-lbl": "Create Identity State Transfer",
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
    "no-data-title": "There is no existing proposals",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading proposals",
    "error-subtitle": "Please try again later",
  },
  "proposal-deposits": {
    "title-lbl": "Deposits",
    "depositor-account-id-col-lbl": "Depositor's account ID",
    "tx-hash-col-lbl": "Transaction hash",
    "age-col-lbl": "Age",
    "block-height-col-lbl": "Block",
    "amount-col-lbl": "Amount",
    "table-lbl": "Proposal Deposits",
    "no-data-title": "There is no deposits for this proposal",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading deposits",
    "error-subtitle": "Please try again later",
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
    "no-data-title": "There is no votes for this proposal",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading votes",
    "error-subtitle": "Please try again later",
  },
  "proposal": {
    "title": "Proposal #{id} Details",
    "proposal-vote-submitted-msg": "Vote for proposal #{id} successfully submitted.",
    "connect-wallet-msg": "Please connect your wallet to be able to vote.",
    "not-validator-msg": "Only validators allowed to vote for proposals.",
    "vote-not-allowed-msg": "Not allowed proposal's status for voting.",
    "vote-btn": "Vote",
    "dialog-action-btn": "Confirm",
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
  "validators": {
    "title": "Validators",
    "all-filter-lbl": "All",
    "active-filter-lbl": "Active",
    "inactive-filter-lbl": "Inactive",
    "tabs-lbl": "Validator statuses",
  },
  "validator-list": {
    "validator-col-lbl": "Validator",
    "voting-power-col-lbl": "Voting Power",
    "voting-power-col-tip-lbl": "As the top 34% voting power can easily decrease network security and halt the network they will be highlighted differently in order to educate and encourage decentralization.",
    "commission-col-lbl": "Commission",
    "condition-col-lbl": "Condition",
    "status-col-lbl": "Status",
    "table-lbl": "Validators",
    "no-data-title": "There are no validators",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading validators",
    "error-subtitle": "Please try again later",
    "condition-col-tooltip": "The overall health condition of validator within the current signed block window",
    "condition-col-tooltip-0-percent": "0%",
    "condition-col-tooltip-1-percent": "1% – 70%",
    "condition-col-tooltip-70-percent": "70% – 90%",
    "condition-col-tooltip-90-percent": "90% – 100%",
  },
  "validator-details": {
    "validator-name-lbl": "Moniker:",
    "website-lbl": "Website:",
    "validator-operator-address-lbl": "Operator Address:",
    "validator-address-lbl": "Account Address:",
    "validator-consensus-address-lbl": "Consensus Address:",
    "validator-consensus-pubkey-lbl": "Consensus Public Key:",
    "commission-lbl": "Commission:",
    "missed-blocks-lbl": "Missed Blocks:",
    "condition-lbl": "Condition:",
    "status-lbl": "Status:",
    "table-lbl": "Validator details:",
    "no-data-message": "There is no validator with such address.",
    "voting-power-lbl": "Voting Power:",
    "voting-power-col-tip-lbl": "As the top 34% voting power can easily decrease network security and halt the network they will be highlighted differently in order to educate and encourage decentralization.",
    "title": "Validator Details",
    "delegate-btn": "Delegate",
    "undelegate-btn": "Undelegate",
    "get-reward-btn": "Get Reward",
    "get-commission-btn": "Get Commission",
    "dialog-heading-delegate": "Delegate",
    "dialog-heading-undelegate": "Undelegate",
    "dialog-heading-withdraw-rewards": "Withdraw Delegator's Rewards",
    "delegate-btn-tip-lbl": "Please connect your wallet to be able to delegate.",
    "delegation-submitted-msg": "Successfully delegated {amount} to {address}",
    "delegation-commission-submitted-msg": "Successfully received commission {amount} to {address}",
    "undelegation-submitted-msg": "Successfully undelegated {amount} from {address}",
    "reward-submitted-msg": "Successfully get rewards {amount} to {address}",
  },
  "validator-delegations": {
    "title-lbl": "Delegations",
    "tabs-lbl": "Delegation types",
    "delegations-lbl": "Delegations",
    "redelegations-lbl": "Redelegations",
    "unbondings-lbl": "Unbondings",
  },
  "validator-delegation-list": {
    "table-lbl": "Delegations",
    "address-col-lbl": "Address",
    "amount-col-lbl": "Amount",
    "no-data-title": "There are no delegations",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading delegations",
    "error-subtitle": "Please try again later",
  },
  "validator-redelegation-list": {
    "no-data-title": "There are no redelegations",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading redelegations",
    "error-subtitle": "Please try again later",
    "table-lbl": "Redelegations",
    "address-col-lbl": "Address",
    "to-col-lbl": "To",
    "amount-col-lbl": "Amount",
    "age-col-lbl": "Age",
  },
  "validator-unbonding-delegation-list": {
    "no-data-title": "There are no unbonding delegations",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading unbonding delegations",
    "error-subtitle": "Please try again later",
    "table-lbl": "Unbonding Delegations",
    "address-col-lbl": "Address",
    "amount-col-lbl": "Amount",
    "age-col-lbl": "Age",
  },
  "validator-transactions": {
    "title-lbl": "Transactions",
  },
  "validator-blocks": {
    "title-lbl": "Blocks",
  },
  "no-data": {
    "title-lbl": "No data found",
    "subtitle-lbl": "There is no data to display",
    "error-title-lbl": "Error acquiring data",
    "error-subtitle-lbl": "There was an error while loading, please try again later.",
  },
  "navbar-links": {
    "documentation-lbl": "Documentation",
    "use-cases-lbl": "Use cases",
    "support-lbl": "Support",
    "discord-lbl": "Discord",
    "twitter-lbl": "Twitter",
    "telegram-lbl": "Telegram",
  },
  "vote-form": {
    "voting-time-expired-error": "Voting time has expired",
    "submitted-msg": "Vote for proposal #{id} successfully submitted.",
    "helper-text": "Please select your preferred vote option by marking the appropriate radio button.",
  },
  "delegate-form": {
    "amount-lbl": "Amount",
    "delegation-lbl": "Please enter the amount of tokens you would like to delegate.",
    "undelegation-lbl": "Please enter the amount of tokens you would like to undelegate.",
    "execution-type-lbl": "On behalf of",
  },
  "withdraw-rewards-form": {
    "delegator-lbl": "On behalf of",
    "tip-lbl": "Please select on behalf of which account you would like to withdraw delegator's rewards.",
  },
  "tsss": {
    "table-lbl": "Threshold Signature Services",
  },
  "tss-state": {
    "threshold-lbl": "Threshold",
    "is-update-required-lbl": "Update required",
    "is-update-required-yes-lbl": "Yes",
    "is-update-required-no-lbl": "No",
    "public-key-lbl": "Public key",
    "max-violation-count-lbl": "Max violations",
  },
  "tss-list": {
    "table-lbl": "Threshold Signature Services",
    "account-col-lbl": "Account",
    "status-col-lbl": "Status",
    "delegator-col-lbl": "Delegator",
    "violations-col-lbl": "Violations",
    "no-data-title": "There are no TSS",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading TSS",
    "error-subtitle": "Please try again later",
  },
  "tss-status": {
    "active-lbl": "Active",
    "frozen-lbl": "Frozen",
    "slashed-lbl": "Slashed",
    "inactive-lbl": "Inactive",
    "unrecognized-lbl": "Unrecognized",
  },
  "tss-details": {
    "account-col-lbl": "Account:",
    "address-col-lbl": "Address:",
    "status-col-lbl": "Status:",
    "delegator-col-lbl": "Delegator:",
    "violations-col-lbl": "Violations:",
    "freeze-end-block-col-lbl": "Freeze end block:",
    "public-key-col-lbl": "Public key:",
    "title": "TSS Details",
    "no-data-msg": "There is no TSS with such account address.",
  },
  "oracles": {
    "account-col-lbl": "Account",
    "chain-col-lbl": "Chain",
    "status-col-lbl": "Status",
    "stake-col-lbl": "Stake",
    "table-lbl": "Oracles",
    "no-data-title": "There is no existing oracles",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading oracles",
    "error-subtitle": "Please try again later",
  },
  "oracle-status": {
    "active-lbl": "Active",
    "freezed-lbl": "Freezed",
    "jailed-lbl": "Jailed",
    "slashed-lbl": "Slashed",
    "inactive-lbl": "Inactive",
    "unrecognized-lbl": "Unrecognized",
  },
  "oracle": {
    "account-col-lbl": "Account:",
    "chain-col-lbl": "Chain:",
    "status-col-lbl": "Status:",
    "stake-col-lbl": "Stake:",
    "missed-col-lbl": "Missed:",
    "votes-col-lbl": "Votes:",
    "operations-col-lbl": "Created operations:",
    "violations-col-lbl": "Violations:",
    "freeze-end-block-col-lbl": "Freeze end block:",
    "title": "Oracle Details",
    "no-data-msg": "There is no oracle with such account address.",
  },
  "operation-list": {
    "table-lbl": "Operations",
    "no-data-title": "There are no operations",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading operations",
    "error-subtitle": "Please try again later",
    "index-col-lbl": "Index",
    "creator-col-lbl": "Creator",
    "type-col-lbl": "Type",
    "status-col-lbl": "Status",
    "date-col-lbl": "Age",
  },
  "operation-type": {
    "transfer-lbl": "Transfer",
    "change-parties-lbl": "Change Parties",
    "fee-token-management-lbl": "Fee Token Management",
    "contract-upgrade-lbl": "Contract Upgrade",
    "identity-default-transfer-lbl": "Identity Default Transfer",
    "identity-aggregated-transfer-lbl": "Identity Aggregated Transfer",
    "identity-gist-transfer-lbl": "Identity Gist Transfer",
    "identity-state-transfer-lbl": "Identity State Transfer",
    "unrecognized-lbl": "Unknown",
  },
  "operation-status": {
    "initialized": "Initialized",
    "approved": "Approved",
    "not-approved": "Not Approved",
    "signed": "Signed",
    "unrecognized": "Unknown",
  },
  "operation-vote-type": {
    "yes": "Yes",
    "no": "No",
    "unrecognized": "Unknown",
  },
  "operation": {
    "index-col-lbl": "Index:",
    "type-col-lbl": "Operation Type:",
    "status-col-lbl": "Status:",
    "creator-col-lbl": "Creator:",
    "block-col-lbl": "Block:",
    "tx-col-lbl": "Transaction hash:",
    "age-col-lbl": "Age:",
    "confirmation-col-lbl": "Confirmation:",
    "title": "Operation Details",
    "no-data-msg": "There is no operation with such index.",
  },
  "operation-vote-list": {
    "table-lbl": "Votes",
    "voter-col-lbl": "Voter's account ID",
    "tx-col-lbl": "Transaction hash",
    "option-col-lbl": "Option",
    "block-col-lbl": "Block",
    "age-col-lbl": "Age",
    "no-data-title": "There is no votes for this operation",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading votes",
    "error-subtitle": "Please try again later",
  },
  "confirmations": {
    "table-lbl": "Confirmations",
    "no-data-title": "There are no confirmations",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading confirmations",
    "error-subtitle": "Please try again later",
    "root-col-lbl": "Root",
    "creator-col-lbl": "Creator",
    "block-col-lbl": "Block",
    "tx-col-lbl": "Transaction hash",
    "age-col-lbl": "Age",
  },
  "confirmation": {
    "root-col-lbl": "Root:",
    "creator-col-lbl": "Creator:",
    "age-col-lbl": "Age:",
    "block-col-lbl": "Block:",
    "tx-col-lbl": "Transaction hash:",
    "title": "Confirmation Details",
    "no-data-msg": "There is no confirmation with such index.",
  },
  "networks": {
    "table-lbl": "Networks",
    "no-data-title": "There are no networks",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading networks",
    "error-subtitle": "Please try again later",
    "name-col-lbl": "Name",
    "type-col-lbl": "Type",
    "params-col-lbl": "Parameters",
  },
  "network-type": {
    "evm-lbl": "EVM",
    "solana-lbl": "Solana",
    "near-lbl": "Near",
    "other-lbl": "Other",
    "rarimo-lbl": "Rarimo",
    "unrecognized-lbl": "Unknown",
  },
  "network-param-type": {
    "bridge-lbl": "Bridge",
    "fee-lbl": "Fee",
    "identity-lbl": "Identity",
    "unrecognized-lbl": "Unknown",
  },
  "network": {
    "name-col-lbl": "Name:",
    "type-col-lbl": "Type:",
    "params-col-lbl": "Parameters:",
    "title": "Network Details",
    "no-data-msg": "There is no network with such name.",
    "parameters-col-lbl": "Parameters",
  },
  "supported-tokens": {
    "table-lbl": "Supported Tokens",
    "nft-filter-lbl": "Non-fungible",
    "ft-filter-lbl": "Fungible",
  },
  "supported-token-list": {
    "index-col-lbl": "Index",
    "name-col-lbl": "Name",
    "symbol-col-lbl": "Symbol",
    "chains-col-lbl": "Chains",
    "table-lbl": "Supported tokens",
    "no-data-title": "There are no supported tokens",
    "no-data-subtitle": "It will appear for a while",
    "error-title": "There was an error while loading supported tokens",
    "error-subtitle": "Please try again later",
  },
  "supported-token": {
    "title": "Supported Token",
    "no-data-msg": "There are no supported token with such index",
    "index-col-lbl": "Index:",
    "name-col-lbl": "Name:",
    "symbol-col-lbl": "Symbol:",
    "chains-col-lbl": "Chains",
    "metadata-uri-col-lbl": "Metadata URI:",
  },
} as const
