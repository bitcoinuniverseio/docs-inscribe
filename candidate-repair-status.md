# Candidate workspace repairs

**September 8, 2026: local candidate changes, not deployed.** This page describes source repairs under validation. It does not establish that the public application has changed or that every workflow has completed successfully.

The candidate preserves the existing Authenticity, Creator Rights, Product Passports, and Bitcoin Compute workspaces. Their requests use the application's configured API connection. A failed request, HTML page, or incomplete response cannot stand in for an empty record list or a completed action. Loading, an empty result, and an unavailable service have separate visible states.

## September 8 candidate checks

The latest local candidate hardens custody recovery packages and corrects credit repayment allocation. These changes have not shipped and do not establish a complete recovery or repayment journey.

- **Custody recovery:** export requires the verified vault owner and a separately saved random recovery secret. The encrypted package can be imported on the same network by its owner into a separate vault. That import restores policy metadata; it does not verify funds, hardware keys or the ability to spend. Historical packages protected only by public vault information are insecure. Keep original recovery material until a replacement has been verified. Unowned historical vaults require an ownership recovery procedure before export.
- **Credit repayment:** the candidate allocates a payment to outstanding principal first, then accrued interest, and retains both paid totals. Invalid amounts and overpayments are rejected. Local repayment arithmetic is not evidence that a payment arrived or that collateral was released.
- **Commerce access:** a real wallet signature is checked against a short-lived request bound to the store, wallet, policy and network. A valid signature does not establish holdings or ticket ownership; access remains blocked without entitlement evidence.
- **Acceptance evidence:** the original audit contains 2,323 operation rows. The candidate adds four routes, bringing its current inventory to 2,327. Source references and component checks cannot become completed user journeys merely by appearing in the inventory.

Four custody component tests, fourteen credit component tests and thirteen commerce cryptography tests passed in the local candidate. A separate recovery integration test used the real Rust compiler with freshly generated public keys and restored the exact policy and descriptor in a fresh service. This verifies encrypted policy metadata recovery, not funds or signing. No end-to-end acceptance is claimed from those checks. The whole-application status remains **NO-GO**.

## Reading a result

| State | What it means |
| --- | --- |
| Draft or saved record | The service accepted a record. This does not establish a signature, durable recovery after restart, payment, or blockchain settlement. |
| Verified signature | A verifier checked the signature against the specified content. Certificate trust, identity, and legal authority require their own evidence. |
| Submitted transaction | A transaction was submitted to the network. It has not necessarily confirmed. |
| Confirmed result | Blockchain confirmation was observed for the transaction. A receipt reference or Merkle root alone does not establish confirmation. |
| Unavailable or indeterminate | A required service or sufficient evidence is absent. No successful outcome is implied. |

## What the candidate changes

- **Authenticity:** file inspection requires original media bytes. Repository lookup requires consent. The form no longer substitutes a sample image, generates a random media hash, or sends a fabricated signature. Credential signing remains unavailable until a real C2PA signer is connected and verified.
- **Creator Rights:** registration and offer forms use a verified wallet session instead of a hardcoded party. The backend must still enforce authority for the asset. Royalty calculations use the selected asset's contributor shares and exact satoshi strings; a calculation is not a payment. Technical clearance is not a legal guarantee.
- **Product Passports:** mass-balance checks take the user's facility, monthly period, and quantities. A conserved calculation does not establish physical segregation or an audited supply chain. Absent evidence is not displayed as verified compliance, a confirmed Bitcoin anchor, or a downloaded verifier bundle.
- **Bitcoin Compute:** failed requests cannot become a project or simulation result. Changing the selected project clears its previous result. Production deployment and mainnet execution are outside this candidate's validation.

Requests are cancelled when the relevant selection, verified account, or network changes so that an old response cannot replace the current view. Narrow screens retain horizontally scrollable workspace navigation.

## What remains unproven

Real credential signing, complete durable persistence and restart recovery, authenticated backend ownership enforcement, physical product verification, confirmed anchors, and complete compute execution still need their required integrations and end-to-end acceptance evidence. Local contract checks and browser checks do not substitute for those results.

No deployment, production database change, or mainnet broadcast is authorized by these repairs. See [release evidence](release-evidence.md) for how an actual release is identified.
