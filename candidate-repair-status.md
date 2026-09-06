# Candidate workspace repairs

**September 5, 2026: local candidate changes, not deployed.** This page describes source repairs under validation. It does not establish that the public application has changed or that every workflow has completed successfully.

The candidate preserves the existing Authenticity, Creator Rights, Product Passports, and Bitcoin Compute workspaces. Their requests use the application's configured API connection. A failed request, HTML page, or incomplete response cannot stand in for an empty record list or a completed action. Loading, an empty result, and an unavailable service have separate visible states.

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
