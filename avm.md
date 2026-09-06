# Atomicals Virtual Machine

**Source candidate, not deployed.** This page describes the proposed AVM repair. Local source and native tests do not establish a real-network pass. No supported, controlled test-wallet environment has been verified for a complete public-chain journey.

AVM Studio and Guided use the existing Atomicals workspace. The intended flow is to choose a template, review its terms, compile a definition, register it, deploy an instance, then make authorized calls and read the resulting state and history.

## Review each stage

Compilation proves that a source package can be built. Simulation predicts a result from supplied state. Bitcoin confirmation proves inclusion. Only an indexed native execution result can prove that the AVM operation ran, and usable asset outputs still require settlement verification. The interface must keep these stages separate.

Protected methods require an AVM authorization signature over the exact transaction, in addition to ordinary Bitcoin input signatures. A wallet that only signs Bitcoin PSBTs cannot automatically supply that authorization. Review every asset, amount, fee and recipient before signing. Resume the existing operation after an interruption; do not prepare another payment to replace a lost acknowledgement.

## Template terms

The twenty templates remain available. Fixed source programs use `_v2` identities and do not upgrade old deployed instances. Four templates issue `_v3` identities: escrow, lock rewards, vesting and hash timelock swap. Their v2 `refund`, `claim` and `release` methods required a submitted current height to equal the block height at inclusion, so a mature call mined one or more blocks after it was prepared was rejected. The v3 methods take only the amount and read maturity from native block height. Existing v2 instances keep the exact-height requirement and are listed under each template as superseded programs.

| Template family | Terms to review |
| --- | --- |
| Fixed swap | Whole-unit fixed price, distinct payment and inventory assets, minimum output, buyer inventory output and seller payment output. |
| Escrow and listing | Actual payment, committed seller recipient, exclusive sale/release/cancellation/refund states. |
| Auction | Actual increasing bids before the ending height, refunds for superseded bidders, one final seller settlement. |
| Lock rewards | Real prefunded pool, participant principal, proportional rewards rounded down, one claim at maturity. |
| Vesting | Funding before the cliff, full unlock at the end height, tracked partial withdrawals. This template does not offer linear per-block release. |
| Governance | An immutable voter registry, fixed weights, one vote per registered signer, a quorum and one-time execution. |
| Treasuries | Registered distinct signers, approvals bound to the exact amount, asset, recipient and expiry, with consumed approvals. The three-signer template requires signer one and either signer two or signer three. |
| Token sale | Actual payment buys a one-to-one recorded allocation subject to the cap and ending height. Allocations do not create native ARC-20 supply. |
| Subscription | A cumulative cap for each configured block-height period, with cancellation preventing future claims. |
| Loan | Separate collateral and repayment accounting, full repayment before collateral release, and no release beyond remaining collateral. |

The vault and backed ledger use existing real ARC-20 inventory. The NFT ownership template records ownership claims and freeze state; it does not transfer or custody NFT outputs. Mint/burn accounting creates and destroys application units, not native ARC-20 supply. The rate-limited treasury has a per-call ceiling, not a rolling time limit.

Schedules read native execution height. No current template method accepts a submitted height, so a caller cannot fake maturity and a mature call stays valid however many blocks pass before it is mined. Committed recipient scripts are exact Bitcoin locking-script bytes and can represent the chosen wallet address format.

## History and recovery

Contract state, execution receipts and verification history must use the selected network. A source-verification badge does not certify successful execution. Legacy records without a proven network remain unknown rather than being assigned to an assumed chain.

If funding exists but the reveal cannot complete, use the operation's recovery path and review its exact destination. Recovery capability must exist before accepting funding. The source candidate includes a recovery request path, but no public-chain recovery pass is claimed here.
