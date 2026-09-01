---
title: Changelog
description: What changed in this documentation, and where to find the changelog for the Inscribe product itself.
provenance:
  owner: bitcoinuniverseio/docs-inscribe
  chain: Bitcoin
  network: mainnet
  release: This documentation site
  lifecycle: Stable
  lastVerified: 2026-09-01
---

This is the changelog for **this documentation**, not for the Inscribe product.

Inscribe itself is released continuously from verified commits and does not carry a version
number to quote. What identifies a build is its commit, and the footer of every page in the
app names the build you are looking at. See
[release evidence](/docs-inscribe/about/release-evidence/).

## 2026-09-01: rebuilt as a documentation site

The repository was a set of flat Markdown files. It is now a built site with search,
navigation and per-page provenance.

### Added

- A structure separating tutorials, task guides, concepts, protocol reference,
  troubleshooting and safety, in place of one directory of files.
- Nine task guides covering inscribing files and text, batches, collections, deploys, mints,
  etches and transfers, each stating its prerequisites, wallet support, network, costs,
  safety considerations, exact steps, the wallet screen to expect, verification and a
  recovery route.
- A [coverage matrix](/docs-inscribe/protocols/coverage/) generated from the Bitcoin
  Universe protocol registry, plus seven protocol family pages.
- [The life of an order](/docs-inscribe/concepts/order-lifecycle/), documenting commit and
  reveal, payment detection, and what the four order states cover.
- [Recovery routes](/docs-inscribe/manage/recovery/), collecting every route back from an
  unpaid, underpaid, stuck or interrupted order, and naming the one situation that has none.
- [Wallets and the two addresses](/docs-inscribe/concepts/wallets-and-addresses/) and a
  [wallet matrix](/docs-inscribe/reference/wallets/) recording the known limitations of each
  integration.
- Reference pages for [fee tiers](/docs-inscribe/reference/fee-tiers/),
  [order states](/docs-inscribe/reference/order-states/) and a
  [glossary](/docs-inscribe/reference/glossary/).
- Local search, dark and light themes, and source provenance on every material page.

### Corrected

- **Order expiry.** Earlier text said an order with no payment inside one hour expires.
  It does not. The hour is the life of the price quote; the order is not deleted, the
  signing key is not discarded, and a late payment is still detected and reconciled. This
  was the most consequential error in the previous text, because it would have encouraged
  someone who had already paid to pay again.
- **Asset safety scope.** The claim that no Inscribe flow will spend an asset-bearing output
  is now stated precisely: no **automatic** funding flow will. The Advanced TX Builder
  deliberately lets you spend one after labelling it, and that is now documented rather than
  omitted.
- **Release state.** Protocol availability is now taken from Inscribe production contract
  rather than from what exists in the interface. Four workspaces present in the app are
  recorded as not released, and the pages say so.

### Removed

- Operational detail that belongs in private engineering documentation rather than in a
  public product site: database migration procedure, and infrastructure topology beyond what
  a reader needs to understand where their data comes from.

## Before 2026-09-01

The repository history carries 44 commits of incremental documentation, beginning 2026-08-19
with the Control Center guide. The substance of every accurate page from that period has been
preserved here rather than rewritten. The most significant entries:

| Date | What was documented |
| --- | --- |
| 2026-08-31 | The unread chain-tip health state |
| 2026-08-30 | The theme architecture, and how contrast is checked |
| 2026-08-29 | What a transaction costs; the warning shown before a wallet payment; the workspace map; what happens when a release lands under an open tab |
| 2026-08-28 | Getting back to an order after closing the tab; what the portfolio shows while a source is down; the production preload budget |
| 2026-08-27 | Index height health states |
| 2026-08-26 | Asset safety; same-origin Bitcoin data relay |
| 2026-08-22 | Delivery performance, response caching and the media gateway |
| 2026-08-19 | The Control Center |

Full history:
[github.com/bitcoinuniverseio/docs-inscribe/commits/main](https://github.com/bitcoinuniverseio/docs-inscribe/commits/main).

## Where pages moved

Every page from the previous structure has a new home. See
[where pages moved](/docs-inscribe/about/migration/).

## Related

- [Release evidence](/docs-inscribe/about/release-evidence/)
- [Status and lifecycle](/docs-inscribe/start/status/)
