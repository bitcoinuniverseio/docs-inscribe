# Candidate workspace repairs

**September 8, 2026: source consolidated; production deployment pending.**

The application changes are on `main` and `develop` at
`e3d0524e233cf2c93dc71ca79d6f8210f177b331`. Deployment is authorized but has not
been verified. The full application remains **FUNCTIONAL NO-GO**: the catalog
contains 2,348 operations and eight Composer actions still lack exact native
bindings. Passing individual checks does not establish full readiness.

## Verified repairs

- **Policy Custody:** owner-scoped vaults, signed transaction review and encrypted
  policy recovery persist in MySQL. Recovery uses a separate random secret;
  import creates a separate vault. The browser downloaded exact PSBT bytes and
  completed export, wrong-secret rejection and import. Bitcoin Core rejected
  the deliberately unfunded preflight transaction for missing inputs.
- **Credit:** verified agreements can record repayment outpoints with atomic
  allocations, replay protection and an accounting outbox. The interface clearly
  distinguishes loading, empty, unavailable and recorded states.
- **Complimentary tickets:** issuer events, attendee grants, credential rotation
  and online check-in use durable ownership and version checks. Real browser
  downloads, one-admission behavior, retries and owner isolation passed. These
  checks do not establish paid admission or offline uniqueness.
- **Lightning:** authenticated owners can refresh actual pinned-TLS LND node
  readiness and export native backup bytes. Empty channels and a 45-byte backup
  remain explicitly empty; they do not prove funded recovery.
- **Bitcoin Layers:** durable unfunded intents and separate Bitcoin and Rootstock
  Testnet wallet proofs passed native readback. Ownership verification does not
  enable bridging, destination delivery or recovery.
- **Nostr and Event Oracle:** canonical signatures and durable records survive
  reload. A separate isolated relay accepted the actual signed Nostr event.
  The Oracle observed a genuinely future Signet block. These are author
  statements and oracle observations, not independent truth or DLC settlement.
- **Blockspace:** real Bitcoin Core package rejection and read-only block
  templates are displayed with network, observation and no-broadcast status.
  Changing the network clears the previous result.
- **Runes:** corrected Mint tags and integer bounds match an independent native
  decoder. Historical signed transactions remain unchanged.

The affected workspace controls were reviewed at 1,440, 390 and 320 pixels.
Repairs include light-theme readability, clear selection and loading states,
accessible Rune inputs, compact mobile controls, readable layer errors and
scoped results after account or network changes. The Composer receipt now fits
narrow screens. These UI checks do not replace missing funded journeys.

## Remaining limitations

Borrowing, lender funding, collateral release, funded channel restoration,
bridge transfers, paid entitlement, positive funded package acceptance and
complete Composer journeys remain unverified or unavailable. Custody recovery
restores policy metadata; it does not establish restored funds or hardware keys.

Native Charms compilation and spell checks passed. A bounded optimized proof
attempt timed out without proof bytes, so no proof-verification success is
claimed. A separate native chain-fork rejection drill is still in progress.

Original audit records, synthetic evidence quarantine and revision-bound native
runs are preserved. Evidence from an older commit is not relabeled as current
release evidence. See [release evidence](release-evidence.md) for release
identification and production verification requirements.
