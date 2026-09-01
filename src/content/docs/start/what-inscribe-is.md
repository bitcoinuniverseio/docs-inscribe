---
title: What Inscribe is
description: What Universe Inscribe does, who it is for, how it relates to Core and the rest of Bitcoin Universe, and what it deliberately does not do.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin, and Dogecoin protocols behind a release gate
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

Inscribe is one workspace for creating, minting, managing and recovering Bitcoin-native
assets, from a first inscription to advanced transaction construction.

## What you can do with it

- **Create inscriptions** from text or files, one at a time or in batches, with the full
  cost laid out for review before you sign.
- **Deploy, mint and transfer tokens** across the protocols Inscribe implements: BRC-20,
  SRC-20, TAP, BLOCK-20, DUST-20, OP-20, OP_DROP, ARC-20 and others.
- **Etch and mint runes**, and split a rune balance across outputs.
- **Register names**, including `.sats` and `.btc` domains through SRC-101 and OP Names.
- **See everything an address holds** in one portfolio that separates spendable bitcoin
  from asset-bearing satoshis.
- **Build, split and repair transactions** with per-output asset classification before you
  sign.
- **Recover satoshis** locked in inscription padding, and get back to orders your browser
  started even after closing the tab.

The full list is in the [coverage matrix](/docs-inscribe/protocols/coverage/) and the
[workspace map](/docs-inscribe/reference/workspaces/).

## Who it is for

- **People making their first inscription.** Start at
  [your first inscription](/docs-inscribe/start/first-inscription/).
- **People launching a token or a collection.** Start at
  [deploy a token](/docs-inscribe/create/deploy-a-token/) or
  [create a collection](/docs-inscribe/create/collections/).
- **People who already hold assets** and need to move, split or rescue them. Start at
  [advanced transaction tools](/docs-inscribe/manage/advanced-transactions/).

You do not need to connect a wallet to explore the app, read live protocol data, or
understand what anything costs. A wallet is asked for only when an action needs a
signature.

## How it fits with the rest of Bitcoin Universe

Bitcoin Universe has a creation half and a trading half.

| Question | Inscribe | Core |
| --- | --- | --- |
| What it is for | Making assets | Discovering and trading them |
| This site covers | Yes | No, see the central platform |

**These are independent.** A protocol you can create in Inscribe may not be tradeable in
Core, and a protocol that trades in Core may have no creation workspace here. The coverage
matrix on this site describes creation only, and it never borrows marketplace availability
to imply something about creation. Of the 27 protocols with a creation surface, the
registry records marketplace availability ranging from enabled through read-only to
feature-gated, and none of that changes what you can make.

The central platform is at
[docs.bitcoinuniverse.io](https://docs.bitcoinuniverse.io).

## What the product promises

- **Your assets are not fee fuel.** No automatic funding flow picks an output holding an
  inscription, Rune or token balance to pay a network fee.
  [How that works](/docs-inscribe/concepts/asset-safety/).
- **A source being down is never shown as an empty wallet.** Every read names its source,
  and the app tells you which source did not answer instead of showing you nothing.
  [The six data states](/docs-inscribe/concepts/source-freshness/).
- **Costs are shown before the wallet opens.** Itemised, then totalled.
  [Read a quote](/docs-inscribe/concepts/what-it-costs/).
- **Universe-operated infrastructure.** Blockchain reads come from Universe-owned nodes
  and indexes, not public third-party APIs, so the data path is accountable end to end.
- **Verifiable releases.** Every production release is built from an exact commit with
  recorded evidence, and the footer of every page names the build you are looking at.
  [Release evidence](/docs-inscribe/about/release-evidence/).

## What it deliberately does not do

- **It does not claim success at broadcast.** An order stays "in progress" until the
  indexer and your wallet agree the asset exists.
- **It does not treat unknown as safe.** An output whose contents could not be established
  is reported as unverified, never as clear.
- **It does not fall back to public explorers.** If the private source cannot answer, the
  app says so rather than quietly asking someone else.
- **It does not block you from spending your own assets on purpose.** One surface, the
  Advanced TX Builder, lets you spend an asset-bearing output deliberately. It labels them
  and leaves the choice to you.
- **It does not hold your assets.** Nothing is custodial. Your wallet signs what moves your
  money, and the one key Inscribe holds exists for a single order and is scoped to
  completing it.

## Language

The interface is available in English and Chinese. The Chinese catalogue does not yet
cover every string, and falls back to English where it does not.

## Related

- [Before you spend anything](/docs-inscribe/start/before-you-spend/)
- [Status and lifecycle](/docs-inscribe/start/status/)
- [Workspace map](/docs-inscribe/reference/workspaces/)
