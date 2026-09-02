---
title: Portfolio
description: What Portfolio shows, why the bitcoin balance and the asset balance are never added together, what Partial means, and how to see any address without a wallet.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

**Portfolio** shows everything your connected wallet holds, grouped by protocol.

## The three views

| View | What it shows | Wallet needed? |
| --- | --- | --- |
| **Portfolio** | Everything your connected wallet holds | Yes |
| **Explore** | The same view for any address you paste | No |
| **Watchlist** | Addresses you track without connecting them | No |

**Explore** is the one worth remembering. You can inspect any address, including your own,
without connecting anything.

## Two balances, never one

The bitcoin balance card reports the **payment address** on its own.

Satoshis sitting at an Ordinals address are carrying assets. They are not spendable from
there, and adding the two figures together would tell you that you can spend money you
cannot. So Inscribe does not.

Read [wallets and the two addresses](/docs-inscribe/concepts/wallets-and-addresses/) for
what each address is for.

## Where the numbers come from

Portfolio reads several independent sources:

| Source | What it supplies |
| --- | --- |
| The Bitcoin node | Your bitcoin balance and your outputs |
| The Ordinals index | Inscriptions and Rune balances |
| Separate indexes | Mezcal, SRC-20, OP_DROP and OP_RETURN names |

They fail independently, which is why the page can be partly right and says so.

## Live and Partial

The header reads **Live** when every source answered, and **Partial** when one did not.

When a source is silent, the page names it above your holdings and says three things:

- anything held there is missing from this page;
- what is shown is everything the sources that did answer reported;
- **nothing you own has changed**.

That last line matters. A missing index is a reporting problem, not a loss.

**An empty portfolio is never presented as an answer while a source is silent.** The page
says nothing was found in the sources that answered and that this is not a complete
picture. "No assets found for this address" appears only when every source answered.

This applies per source. If only the Ordinals index is behind, your Mezcal, SRC-20 and
OP_DROP balances are still real numbers from indexes that did answer.

## What gets classified

Around thirty protocol categories are recognised, including BRC-20, ARC-20, CAT-20, Runes,
Ordinals, Bitmap, rare sats, Stamps, SRC-20, SRC-101, Atomicals, Alkanes, Mezcal, DMT, TAP,
UNAT, BLOCK-20, DUST-20, OP-20, OP Names, OP_RETURN, Drops, OP_DROP and Tandem.

Anything it cannot place shows as **Unclassified** rather than being dropped from the list.
A dropped item would look like an item you do not own.

Several of these are recognised here but not creatable in Inscribe. Bitmap, UNAT and DRC-20
are the clearest cases: you will see them in your portfolio and Inscribe will protect them
from being spent as fees, but there is no workspace for making or moving one.

## Privacy

Portfolio, Watchlist, Activity, order, payment-recovery and wallet views suppress social
preview images and are marked not to be indexed. A link preview never contains a wallet
address, a balance, a session, an account, an order payload or a draft transaction.

If you need to share a view, **Screenshot safe** in Settings hides balances and addresses.

## Media

Inscription images, text, HTML, audio and video load from Universe-operated infrastructure
rather than third-party explorers.

Thumbnails use small AVIF or WebP renders where the shared media service has one, and
otherwise the original bytes scaled to the tile. **The exact original bytes are never
altered**; derived previews are for display only. Video and audio in galleries do not
download until you open them.

Active content, meaning HTML, scripts, and SVG with scripts, always renders inside an
isolated sandbox.

## Related

- [Where the data comes from](/docs-inscribe/concepts/source-freshness/)
- [Asset safety](/docs-inscribe/concepts/asset-safety/)
- [Speed and media](/docs-inscribe/about/performance-and-media/)
