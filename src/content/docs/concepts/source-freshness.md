---
title: Where the data comes from
description: The six states a data source can be in, what a source that is down or catching up affects, why an empty result is never shown as an answer, and why writes keep working.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

Inscribe keeps protocol construction tools separate from live discovery data. A provider
problem in one protocol does not disable unrelated pages, wallet access, or inscription
workflows.

The rule underneath every state on this page: **a source that did not answer is never
reported as a source that answered with nothing.**

## The six states

A data source is in exactly one of these:

| State | What it means |
| --- | --- |
| **Live** | Answering, and current with the chain |
| **Live, currency unverified** | Answering, but it reports no height, so how current it is cannot be checked |
| **Tip not verified** | Answering with a height, but the chain tip could not be read, so the two cannot be compared |
| **Behind** | Answering with a height that trails the chain tip |
| **Unavailable** | Not answering |
| **Unknown** | The payload named a source but not a state this build understands |

Two of those exist because a plain HTTP success is not proof of anything. A source can be
up, reachable and returning valid data while being a thousand blocks behind, and a source
can report a height while the chain tip it should be compared against is unreadable.
Calling either one "healthy" would be false.

Separately from all six, a capability an operator has switched off is reported as
**switched off by the operator**, not as a source being down. They are different problems
with different fixes, so they are never shown as the same thing.

## What a slow or missing source affects

Nothing in the app's top bar or banners announces a source that is down or catching up.
The effect shows only where you read that source.

- **Reads from that source may be missing or out of date.** Balances, token lists and
  search results can trail the chain until the index reads the latest blocks. A workspace
  can still say that a particular read failed.
- **Writes keep working.** Minting, inscribing, etching, deploying, transferring and every
  other write stay available. None of them waits for an index to catch up or come back.
- **Fee funding never spends what it cannot check.** When Inscribe picks outputs to pay
  fees, it never spends an output whose inscriptions, runes or Atomicals it cannot verify.
  If an index has not reached the block that created an output, that one output is
  skipped. Other outputs still pay.
- **A ChainBloom contribution does not wait for its index.** The index reads each block a
  few seconds after the node sees it, and a contribution can go ahead while it is still
  catching up. The inputs it spends are checked against the Bitcoin node.

A workspace stays visible even when the index behind it is down or catching up, because a
missing workspace looks like a product that never had the feature.

## What the portfolio shows while a source is down

The portfolio reads several independent sources: the Bitcoin node for your balance, the
Ordinals index for inscriptions and Runes, and separate indexes for Mezcal, SRC-20,
OP_DROP and OP_RETURN names. One of them being down does not empty the page; the rest
still answer and what they report is still shown.

When a source does not answer, a notice above your holdings says that some of them could
not be loaded, so they are missing from this page, and that nothing you own has changed.

An empty portfolio is never presented as an answer while a source is silent. The page says
that nothing was found in the sources that answered, and that this is not a complete
picture of what the address holds. "No assets found for this address" appears only when
every source answered.

This applies per source. If only the Ordinals index is behind, your Mezcal, SRC-20 and
OP_DROP balances are still real numbers from indexes that answered.

## Where the reads come from

Blockchain reads come from Universe-operated nodes and indexes rather than public
third-party APIs, so the data path is accountable end to end. Public blockchain providers
are not used as a fallback: if the private source cannot answer, the app says so instead
of quietly asking someone else.

Browser requests for fees, transactions, addresses and outputs stay on the Inscribe origin.
The API relays only reviewed read paths onward, so wallet and payment screens never connect
to an indexer or a public explorer directly.

Two things follow from that, and both are stated rather than hidden:

- **A missing indexed height is never filled in from somewhere else.** If the authoritative
  height cannot be read, the report carries no height and says it is not synchronised. It
  does not borrow a number from the node or an explorer to make the shape look complete.
- **Readiness tolerates a small lag and no more.** The index is expected to sit a block or
  two behind a moving chain tip. Beyond the configured tolerance, or with a negative or
  unreadable lag, readiness fails rather than rounding in its own favour. This changes
  what the health report says about reads. It does not stop writes.

Some protocols require more than one independent source to agree before they are treated as
ready. Where two verifiers disagree about a finalized block, readiness stays unavailable
rather than picking one.

## Safety gates

Some research protocols remain visible for documentation or controlled-network work while
production actions stay disabled. Universe does not turn these on merely to make a status
page look healthy. Mainnet writes require the protocol's network profile, independent
authorization, an authoritative index, transaction safety checks, and a verified readiness
canary.

CAT-20 transaction features remain fail-closed when the required Fractal data and signing
dependencies are unavailable. A CAT tracker that is only catching up does not block
minting. Market discovery reports that dependency state directly instead of returning a
misleading empty market.

## Fee data specifically

Fee rates refresh every 30 seconds. If the source stops answering, the fee control shows
**Cached fees** in place of the refresh countdown, so a stale number is visibly stale.

On a network where a fabricated rate would be worse than no rate, Inscribe refuses to quote
and reports the service as unavailable rather than serving a fallback price.

## Related

- [Failure states](/docs-inscribe/troubleshooting/failure-states/)
- [What a transaction costs](/docs-inscribe/concepts/what-it-costs/)
- [Asset safety](/docs-inscribe/concepts/asset-safety/)
