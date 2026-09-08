# Candidate workspace repairs

**September 8, 2026: local candidate changes, not deployed.** This page describes source repairs under validation. It does not establish that the public application has changed or that every workflow has completed successfully.

The candidate preserves the existing Authenticity, Creator Rights, Product Passports, and Bitcoin Compute workspaces. Their requests use the application's configured API connection. A failed request, HTML page, or incomplete response cannot stand in for an empty record list or a completed action. Loading, an empty result, and an unavailable service have separate visible states.

## September 8 candidate checks

The third local repair batch adds a Bitcoin Core custody preflight, authenticated LND snapshots and native backups, and owner-bound Bitcoin Layers draft intents. Earlier durable custody, credit, event and blockspace repairs remain under validation. These changes are unshipped. The whole-application decision remains **FUNCTIONAL NO-GO**.

- **Custody recovery and signing:** owner/network-scoped MySQL records, stable retry keys and verified PSBT signatures survive reconnects. Recovery export requires the verified vault owner and a separately saved random secret. Import restores policy metadata into a separate vault; it does not verify funds, hardware keys or the ability to spend. Historical packages protected only by public vault information are insecure. Preserve original recovery material until replacement recovery is verified.
- **Credit repayment:** previously verified, signed fixed-total agreements can record observed payment outpoints with durable replay protection, atomic allocations, append-only events and an accounting outbox. No API yet imports and verifies a new agreement. Origination, lender reservation, collateral release, accounting delivery and re-mined-payment recovery remain incomplete.
- **Commerce access:** a real wallet signature is checked against a short-lived request bound to the owner, wallet, policy and network. A live browser displayed verified identity while withholding access without authoritative entitlement. Payment, refund and payout settlement remain incomplete.
- **Event contracts:** canonical signed records persist and require protected operator identity and verified provider observations. Tests use a fixture provider. These statements are not DLC adaptor signatures or contract execution transactions; no real outcome, settlement or funded recovery is established.
- **Blockspace:** package analysis uses Bitcoin Core and preserves its rejection reasons. A real Signet node and live browser rejected an unfunded transaction with missing inputs. Positive funded acceptance is untested. Miner quote, invoice, payment, share, template and farm providers remain unavailable.
- **Acceptance evidence:** the catalog now contains 2,339 identities and preserves all 2,323 original audit identities. Nine Composer actions still lack exact implemented source bindings. Source references and component checks do not establish completed user journeys.

Custody has three real database tests, ten cryptography/compiler checks, twelve live API assertions including an actual process restart, and eleven live browser checks. Browser authentication was installed programmatically; the proposal used a synthetic, never-funded previous transaction. Credit has fifteen backend tests, including five real MySQL tests with fixture authority responses and real agreement signatures, plus three fixture browser tests. Event has five component tests and one real database lifecycle test with a fixture provider. Blockspace has twelve backend tests, a browser transport/stale-response test, three real Signet-node HTTP assertions and a live browser-to-node rejection check. These evidence levels remain separate from funded spending or delivery.

The custody preflight adds nine backend tests and sixteen real API/browser checks. Actual descriptor signatures finalized a proposal built from a synthetic, never-funded previous transaction. Bitcoin Core rejected it for missing inputs, and a direct database read confirmed the exact saved observation; another owner received HTTP 403. Asset-protection verification and a successful broadcast remain unavailable.

The LND application path has seventeen component/native/database tests and thirteen real HTTP/browser checks. It binds the configured TLS node to an explicitly authorized wallet principal and network, saves snapshots, and exports the exact native seed-encrypted backup bytes. The browser downloaded a 45-byte empty backup, verified its hash and passed those bytes to the real LND verifier; retries, reload and owner isolation passed. Zero channels means funded restoration and Lightning payments remain unproven. Legacy custom JSON backups are not presented as native LND recovery material.

Bitcoin Layers has three backend tests, five database tests, three frontend tests and seventeen actual HTTP assertions. Verified Bitcoin wallet control leaves the persisted intent in draft; it does not prove destination-layer ownership. All seven offered native layers remain blocked. Ten actual browser checks now pass for draft retries/reload, Bitcoin ownership and explicitly unavailable native recovery; session installation and signature paste were programmatic, with no wallet extension or destination-chain execution. The audit Signet wallet remains unfunded.

All 82 migrations are applied to the dedicated audit database. Thirty-six focused schema tests and compiled schema validation pass; these checks do not establish whole-application readiness.

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

## Fourth local repair checkpoint

Custody inheritance now saves honest owner-scoped drafts; four real database tests
and twelve live browser/API checks pass, with active policy unchanged. Rootstock
Testnet EOA ownership passes twenty-five live HTTP/browser checks against the
native read-only RPC; both wallet proofs persist while bridge/recovery remain
blocked. A genuinely future Signet block321168 was announced, observed and signed
by the native Event oracle; reconnect and ten API/browser checks pass. This is no
DLC settlement or finality guarantee. Nostr exact Composer publication now reaches
a separate persistent isolated relay with durable intent and ambiguous-outcome
reconciliation; nine live checks pass through browser reload. NIP07 test signing
does not establish a real extension interaction or truth of published content.

The combined backend and84-migration schema checks pass. The catalog has2342
identities and8remaining Composer gaps. Composer gate requirements now retain
hand-reviewed native evidence stages. The current revision is not full GO;
funded paths and thousands of operation witnesses remain outstanding. Prior
clean-revision custody-list evidence is preserved only for its actual revision.
No deployment, public transaction, mainnet funds or production database change.

## Fifth local repair batch

Rune mint encoding now repeats Mint tag20 for both Rune ID values and validates
exact u64/u32 bounds. The local decoder rejects incomplete or unconsumed even
fields instead of treating the old malformed mint as valid. Native ordinals0.0.17
confirmed the old script is a cenotaph and independently encodes the corrected
script. Twenty-three native comparison vectors,112 focused builder/service/worker
tests and47 extraction regressions pass (the test groups overlap). Historical
signed/broadcast artifacts and database rows were not rewritten. A funded Rune
mint and the Composer mint action remain unproven.

Complimentary tickets now use durable issuer-owned Signet events, attendee grants,
client-generated bearer credentials with server-side hash-only storage, atomic
version rotation and issuer-authorized online check-in. Existing legacy rows are
marked unverified. Four real SQL tests and13 Commerce regressions pass. Twenty-eight
live checks cover separate actual issuer/attendee sessions, credential download,
concurrent one-admission behavior, reload, copied-credential rejection and no
secret disclosure in responses or runtime logs. This is explicit complimentary
admission, not paid-order entitlement or offline uniqueness.

The Blockspace template reader now uses immediate read-only getblocktemplate
requests through the existing configured Core client. It pins the requested
network and stable synchronized tip, checks native transaction bytes and IDs,
dependencies, fees and weight, and leaves mining/DATUM/Signet-solution readiness
unverified. Twenty-nine boundary regressions and three actual changed-source/Core
checks pass. Ten live browser/API checks now pass, including exact native parent,
mobile layout, delayed-response rejection on network change, wrong-network
rejection and a fresh rendered snapshot after reload. The harness forwards real
responses byte-for-byte and uses the control's actual accessible name. Earlier
harness failures remain preserved. No mining job, share or block was submitted.

The combined backend builds and85-migration schema check pass. The complete
legacy ticket table and new credential contracts are declared explicitly. The
catalog now includes2348 identities with8unresolved Composer actions. The earlier
clean dc14060266b checkpoint has2accepted operation witnesses (custody list and
Nostr publication); those witnesses do not automatically cover this newer source.
Full GO remains false, and native funded/protocol journeys remain outstanding.
