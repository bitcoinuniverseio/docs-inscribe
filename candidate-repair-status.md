# Candidate workspace repairs

**September 17, 2026: RGB native execution.**

Branch `agent/rgb-go-20260917` implements the 17 September RGB audit. The
in-memory stand-in engine is gone. A Universe-operated companion gateway (rgb-api
0.11.1, the stable RGB line, Apache-2.0) holds each owner's private stock and
serves issuance, invoices, transfer preparation, consignment validation and
acceptance, stash reads and encrypted stock export and restore. The Bitcoin
witness is returned as a PSBT for the owner's wallet; the companion never
holds a Bitcoin key and accepts a signed transaction only when its id matches
the reviewed PSBT. The vault stores a versioned AES-256-GCM envelope bound to
the owner and chain, rejects stale revisions and plaintext, and stays
readable while execution is unavailable. The `/rgb` workspace binds the
companion wallet, issues every offered class, receives, sends, accepts,
backs up and restores; each panel that cannot run names its reason.

Evidence on Bitcoin Signet through the candidate API: five contract classes
issued, a 250,000-unit transfer (witness `3e889549`, block 322468) validated
and accepted by the recipient with a receipt, an encrypted vault backup and a
device-loss restore, an onward spend from the restored stock (witness
`04e151d1`), a Composer DAG that issued a contract and consigned a transfer
through the same jobs (witnesses `b9c4f0e4` and, after a seal-selection fix,
`6400de4a`), and the legacy `/rgb` routes bridged onto the same companion
(witness `5980c880`). PFA transfers are
reported unavailable because the issuer signature is not collected. No
mainnet transaction ran; this candidate has not been deployed.

**September 17, 2026: Taproot Assets studio tools and readiness.**

Branch `agent/taproot-go-20260917` (pull request #199) continues the
workspace access repair. The Overview lists each gateway capability with
the exact prerequisite it is missing, derived from live daemon probes rather
than configuration: daemon reads, Universe, proof export, native-funded
issuance, on-chain transfer, the wallet-signed builder and asset Lightning.
The Proofs tab lists the assets the operator daemon tracks, exports and
verifies the exact proof for a holding you name (asset, script key, anchor
outpoint) and verifies a proof file someone hands you; verdicts and bytes
come from the operator tapd and the anchor block is checked against the
operator Bitcoin node. The Universe tab reads issuance leaves and can pull an
asset's proofs from the federation Universe. The Lightning tab shows the
channels the operator node actually holds. Mint and transfer quotes are
priced from the operator node's fee estimate, and transfer recipients are
decoded before a quote.

A native-funded mint ran end to end on Signet through this candidate with a
real wallet authorization and a verified proof. Wallet-signed issuance,
on-chain transfers of assets held by an external key and asset Lightning
invoices, payments and channel opening remain unavailable; the workspace
names each reason instead of offering a control that cannot complete.

The workspace now uses plain sections (Overview, Mint, Send, Receive,
Lightning, Universe, Proofs). Each capability is shown as a short card with
the technical reason behind a "Why" disclosure, every listed asset has its
own Export proof button, and the mint form derives the asset key from your
wallet's Taproot public key so nothing has to be computed by hand. This
candidate is being deployed with the September 17 release.

**September 17, 2026: Taproot Assets workspace access.**

The repair candidate opens `/taproot-assets` and loads the service's current
status even when transactions are disabled. Retry refreshes that status, and
the page waits for a reported network instead of showing a guessed one.
The Universe panel can read assets independently of transaction readiness.
The native mint review names the actual network, including mainnet when the
configured service reports it.

Transaction controls still require the configured service and its network
authorization. External-wallet issuance, transfers and asset Lightning remain
unavailable until their native operations are connected and verified. These
page and configuration repairs do not establish complete Signet or mainnet
functionality. This candidate has not been deployed.

**September 16, 2026: mainnet-readiness repairs.**

Branch `agent/mainnet-readiness-20260916` (pull request #197) implements the
16 September read-only audit. The CI gates that had been red for weeks are
repaired at their root: every dashboard view keeps a visible heading on
phones, a busy control keeps its label readable, the throttled performance
gate runs against the same deterministic API as the browser suites, and the
admin mutation registry and AVM network specs assert the current source. The
service status panel names the data sources it actually checked and lists
the seven asset platforms (Taproot Assets, RGB, Spark, Babylon, Private
Payments, RGB++/Fiber, Nostr) with their own state instead of letting a green
core dot vouch for them. Private Payments health reports one state per rail;
the Silent Payments address codec follows the chain shown in the header.
Taproot Assets carries a reviewed mainnet chain entry that only an explicit
mainnet flag plus the operator's mainnet authorization can enable; no mainnet
mint has run. Twenty-seven more contracts are classified BLOCKED on their
named native authority (592 blocked contracts, zero unresolved).

Evidence at the candidate on Bitcoin Signet: 369 catalog identities PASS with retained run manifests (45 recorder runs and 324 resource-linked journey records from 22 write, restart and read cycles with 0 failures; two real Signet anchor transactions, `83c62264` and `9e3bcb4f`), 592 BLOCKED, 1,510 NOT TESTED, 0 FAIL at candidate `e8ce4ab52ce`. The
application is still **FUNCTIONAL NO-GO** as a whole: Spark, Babylon, RGB,
RGB++/Fiber, Cashu, Fedimint, the Payjoin bridge and NIP-47 Lightning
settlement remain blocked on authorities that do not exist on any Universe
host, and the Signet tapd holds a stalled batch that blocks a fresh native
mint at this candidate (the earlier Signet mints stay retained with their own
revision). Nothing was deployed and the production contract keeps the seven
asset platforms disabled. Full report: `docs/repair-mainnet-readiness-20260916.md`
in the application repository.

**September 16, 2026: asset platforms on Signet.**

Branch `agent/asset-platforms-20260915` (candidate `2b1da701f0d`, pull
request #196) implements the September 15 asset-platform handoff. Taproot
Assets now mints natively on Bitcoin Signet through the product: the
operator gateway fronts the Universe Signet tapd and lnd, and two assets were
issued with a real BIP-322 authorization, a Core-verified anchor fee, the
tapd proof checked against the canonical chain and the issuance root read
back through the Universe view (assets `ef7ddcd4...13fd` and
`cf6c8583...9c9a`). Protocol Assurance reports ready with a pinned compiler
and a durable issuer and accepts Signet artifacts. The Spark, Babylon and
RGB++/Fiber workspaces show the live authority readiness the API observes
instead of a fixed placeholder; their operations, RGB contracts, Lightning
payments, Cashu, Fedimint and the Payjoin bridge stay blocked on authorities
that do not exist on any Universe host, each named in the acceptance catalog
(565 blocked contracts, zero unresolved). Evidence records now bind each
journey step to the exact resource, owner and outcome it proves, and a
prepared or unpaid order can no longer stand for a native transaction.

Evidence at the candidate on Bitcoin Signet: 360 catalog identities PASS
with retained run manifests (44 recorder runs, 316 resource-linked journey
records), 565 BLOCKED, 1,546 NOT TESTED, 0 FAIL. The application is still
**FUNCTIONAL NO-GO** as a whole; nothing was deployed and the production
contract keeps the seven asset platforms disabled until their native
authorities exist. Full report: `docs/repair-asset-platforms-20260915.md`
in the application repository.

**September 15, 2026: eleven-lane repair, Signet journeys and deployment.**

Develop `f31b67d0952` (main `f976141225c`) merges the September 15 GO run.
Sat Control gained the inscribe plan path on the commit and reveal pipeline and
a real workspace; Nostr domain routes run against the isolated relay with
browser-held keys; Creator Rights got a verified-authority path (BIP-322
ownership through the ord authority or an issuer attestation); Product
Passports verify registry attestations and physical bindings on real evidence;
Launchpad continues a reservation into native ordinals, BRC-20 and Runes mints
with durable settlement; Cashu, Bitcoin Compute and the Launchpad native
authority carry explicit Signet identities; the acceptance catalog has zero
unresolved contracts (85 reviewed blocked contracts name their missing native
authority); the schema bridge branch is merged with a reviewed successor set
for all 16 pending migrations; nineteen product defects found by the journeys
were fixed with regression specs.

Evidence at gate revision `cc117aa91aa` on Bitcoin Signet: 820 catalog
identities PASS with retained run manifests and stage observations (42
recorder runs, 691 HTTP journey runs, 87 browser route renders), three real
Signet anchor transactions (`be984691`, `a1206017`, `721358cd`), 1,651
identities NOT TESTED of which 245 are BLOCKED on native authorities absent
from the host (Alkanes, BRC-2, Charms, OPNet, RGB, RGB++/Fiber, tapd/lnd, Ark,
Babylon, Spark, Lightning, DLC, credit custody, bridges) and the rest on
funded Signet wallets or mainnet-only data authorities. The application is
therefore still **FUNCTIONAL NO-GO** as a whole; the release was deployed on
the operator's explicit instruction.

**September 14, 2026: Rights, Compute and Authenticity on Signet.**

Pull request 192 on branch `agent/go-20260914` repairs Creator Rights signing
and credential issuance (BIP-322 party signatures, Bitcoin Core payment
evidence, Schnorr-signed credentials), replaces the Bitcoin Compute fixtures
with a real RISC-V execution engine and a Core plus ord funding authority, and
gives Content Authenticity wallet-funded anchor transactions, resilient
observation and fingerprint-based recovery of signed media. The Creator Rights
and Bitcoin Compute journeys passed end to end on Bitcoin Signet with wallet
signatures and confirmed transactions; the Content Authenticity anchor was
confirmed in a Signet block. No mainnet transaction was executed and nothing
was deployed. Accessibility and browser suites ran in CI on the Linux runner
fleet because the Windows build host terminates headless browsers by policy.
The application remains **FUNCTIONAL NO-GO** as a whole: the catalog still
holds operations without runtime evidence and two Composer actions without
native bindings.

## September 9 local continuation

The isolated `codex/continued-go-20260909` candidate adds native credential
inspection for JPEG, PNG, WebP, AVIF, MP4 and MP3. Submitted media and public URLs are checked by the official
C2PA verifier. Results distinguish valid signatures with an untrusted signer,
unsigned files, changed bytes and invalid credentials. Inspection does not
establish identity, factual truth, copyright ownership or a Bitcoin receipt.

Bitcoin payment URI generation now validates addresses and whole-satoshi
amounts. Payjoin review compares actual PSBTs and can check their inputs against
the configured Bitcoin node. It reports observations without authorizing a
payment. An isolated regtest check exercised real signatures, spendability and
spent-input rejection; this is not a completed Signet Payjoin payment.

Credential issuance uses a configured signer, actual media and wallet authorization
of an exact saved plan. Database tests verify concurrent issuance, retries and
reopening the signed media in a fresh process. Wallet browser completion remains
unverified; no trusted creator identity or Bitcoin receipt is claimed.
Immutable assertion redaction preserves the original and creates a separate
signed version. An optional pinned certificate-root policy allows explicit
signer trust checks; it does not establish creator identity or official certification.

Owner-scoped Bitcoin receipts can now verify an existing transaction against an
explicit native node. Regtest checks covered confirmation, a real reorg and
restoration and re-mining with prior receipt history preserved. Public Signet
acceptance remains open.
Silent Payments public-key address generation and validation use the native
BIP352 encoding; the browser reproduced a published vector. Scanning and payment
execution remain unavailable. Local privacy helpers explain validated reported
inputs without invented privacy scores or verified-protocol claims.

Launchpad project records, whitelists and reservation holds now use
authenticated, durable storage. Database and HTTP tests cover concurrent allocation,
retries, rollback and reconnect. A reservation does not mint an asset.

A Rune Composer mint now has a native adapter. An isolated test-chain run
confirmed the exact transaction and allocation through Bitcoin Core and Ord.
Ordinals data and asset commit/reveal also passed real Core/Ord content and
recipient checks. Both paths also passed authenticated HTTP and real SQL restart,
ownership, stale-artifact and replay checks through the full application. Five Composer
bindings remain unresolved. All original catalog identities
remain required; added redaction, receipt and address-validation routes bring
the current count to 2,373.

Exact chain selection now keeps Signet and Testnet4 separate from mainnet-backed
tools and sibling links. Browser checks verified those unavailable states and
the local byte tool's correct SHA-256 result across chain selections.

An independent JPEG checker verifies ES256 credential signatures, assertion
hashes and media binding without consuming the native verifier's report. Its
scope does not include every C2PA format, identity or timestamp policy.

These changes are local and have not been deployed. Full application GO remains
unverified. The source and live-release statements below belong to the earlier
checkpoint.

**September 8, 2026: consolidated source checkpoint.**

The application changes are on `main` and `develop` at
`039fa9862fc3eeabcb480adb5661525463d46378`. Check the live identity using
[release evidence](release-evidence.md). The full application remains **FUNCTIONAL NO-GO**: the catalog
contains 2,363 operations and eight Composer actions still lack exact native
bindings. Passing individual checks does not establish full readiness.

The authenticated SRC-101 receiver repair passed isolated MariaDB insert,
retry, transfer, rollback and concurrency checks. Those checks do not prove deployment;
durable transaction ordering and independent current-owner proof remain gaps.
The directory now isolates unsafe URLs and search text, with readable mobile
statistics, a visible Docs control and one clear-search control. Desktop and
mobile checks passed in both themes.

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

The final Mempool status remains compact and stable during delayed errors at
320 pixels. Accessibility checks wait for the real route content and completed
animations, with the original contrast and visibility requirements retained.
CI preserves verified application artifacts for reuse by schema checks,
browser integration and deployment; unchanged components need no second build.

Alkanes index failures now use one inline message with Retry; the request keeps
its current filters and pagination. Chainbloom Retry text retains full contrast.
Focused desktop and mobile error, retry and readback checks passed in both themes.
Backend compiler reuse requires authenticated prior output, identical source and
toolchain inputs, and complete output verification; other checks remain required.
Frontend compiler reuse also verifies that changed maintenance files produce no
new Tailwind CSS. Browser shards consume the authenticated production artifact;
the original compilation time and lineage remain recorded.

## Remaining limitations

Borrowing, lender funding, collateral release, funded channel restoration,
bridge transfers, paid entitlement, positive funded package acceptance and
complete Composer journeys remain unverified or unavailable. Custody recovery
restores policy metadata; it does not establish restored funds or hardware keys.

Native Charms compilation and spell checks passed. A bounded optimized proof
attempt timed out without proof bytes, so no proof-verification success is
claimed. A separate native chain-fork drill passed 19 component checks and an
independent verifier using historical public blocks in an isolated Bitcoin Core
replay. It does not establish a public-network reorganization or funded event
settlement.

Original audit records, synthetic evidence quarantine and revision-bound native
runs are preserved. Evidence from an older commit is not relabeled as current
release evidence. See [release evidence](release-evidence.md) for release
identification and production verification requirements.

## Spark native-client candidate, 17 September 2026

The development candidate opens the Spark workspace and reads its runtime configuration instead of stopping at a build-time disabled message. It adds a browser-held encrypted Spark identity, separate issuer identity, reviewed native operations and pending-operation tracking. The native SDK loads only when needed.

These changes do not establish working Spark transfers, withdrawals, Lightning, token issuance or liquidity settlement. Real Signet acceptance has not completed. Native services, legacy API compatibility, ambiguous-operation recovery, pool-removal bounds and unilateral exits still have unresolved requirements. Do not fund the candidate based on a visible control, a configured endpoint or a READY label.

Local checks cover native-client validation, encryption, quote and identity binding, blocked unsafe operations, dependency compatibility, build output and the unconfigured workspace. A native Signet workflow must also show its actual settlement, authoritative balance/state, and usable result after reload and reconnect. Component test totals are not end-to-end coverage.

No deployment or mainnet transaction formed part of this repair. This page describes development work, not a change to the live site's supported capabilities. Track the implementation and its exact remaining scope in `bitcoinuniverseio/inscribe` issue 202.
