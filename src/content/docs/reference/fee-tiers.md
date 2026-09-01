---
title: Fee tiers
description: The tiers Inscribe offers, the accepted rate range, where the rates come from, how often they refresh, and every case where two tiers legitimately show the same number.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable. The Sub 1 control is marked Beta
  lastVerified: 2026-09-01
---

A reference table. For what the fee actually buys, read
[what a transaction costs](/docs-inscribe/concepts/what-it-costs/).

## The tiers

| Tier | Targets | Default? |
| --- | --- | --- |
| **Normal** | A place in the blocks mined over roughly the next half hour | Yes, and marked Recommended |
| **Fast** | A place in the next block, roughly ten minutes | No |
| **Custom** | Any rate you type, within the accepted range | No |
| **Sub 1** | Rates below 1 sat/vB. Marked Beta | No, and never becomes the default |

**The default is never the more expensive option.** Normal is what a form opens on.

## Accepted range

| Setting | Value |
| --- | --- |
| Minimum | 0.1 sat/vB |
| Maximum | 10,000 sat/vB |
| Refresh | Every 30 seconds |

A protocol can raise the floor above 0.1 or require whole satoshis, and the fee control uses
the protocol own minimum where it has one. So the rate you are charged is not always the
rate the quote returned.

## Where the rates come from

Universe-operated Bitcoin infrastructure, not a public provider. The upstream answers with
block targets, which map onto the tiers:

| Upstream target | Tier |
| --- | --- |
| Next block | Fast |
| About three blocks | Normal |
| Relay floor | The minimum |

## The waits are earned, not labelled

The wait shown on a tier is derived from the rate that tier actually quotes, not fixed in
advance.

- **Fast** always shows the next-block wait, because that is its target.
- **Normal** shows the half-hour wait **only while its rate is genuinely lower than Fast**.
  When the two are equal it shows the next-block wait instead.

Bitcoin block times are random, so all of these are averages rather than promises.

## When two tiers show the same number

This is expected in three situations, and the app explains it on both tiers rather than
printing a shorter wait next to the higher-sounding option:

| Cause | What is happening |
| --- | --- |
| **Blocks have room** | The rate that gets you into the next block is the same rate that would have got you in within half an hour |
| **Whole-satoshi rounding** | A protocol requiring whole satoshis collapses two different quotes onto one rate |
| **A higher relay floor** | A protocol minimum lifts both tiers to the same number |

The note reads:

> Blocks have room right now, so Normal costs the same as Fast and confirms just as soon.

Two prices that are the same number are the same purchase. Paying more for one of them
would buy nothing.

## Sub 1

Rates under one satoshi per virtual byte are real rates that real miners sometimes accept.
They can take a long time, or never confirm at all.

The control is marked **Beta**, shows the exact rate you have chosen, and never becomes the
default.

Do not use it for a contested mint, or for anything where a delay costs you the outcome.

## Stale rates

If the rate source stops answering, the fee control shows **Cached fees** in place of the
refresh countdown. A stale quote is never presented as a live one.

On a network where a fabricated rate would be worse than no rate, Inscribe refuses to quote
and reports the service as unavailable rather than serving a fallback price.

## Size estimation

Some figures that shape the network fee line:

| Case | Cost in virtual bytes |
| --- | --- |
| Inscribing a child under a parent | About 101 extra virtual bytes, for spending and returning the parent |
| The service fee output | A real output, so it costs bytes, already included in the total |

The figure shown before you create the order is a preview. The order the backend builds
carries the authoritative price.

## Accessibility

Each tier is a button whose accessible name carries the tier, its rate in satoshis per
virtual byte, and its wait, so the price is available without reading the visual card. The
recommended tier says that it is recommended.

## Related

- [What a transaction costs](/docs-inscribe/concepts/what-it-costs/)
- [Recovery routes](/docs-inscribe/manage/recovery/#the-payment-is-stuck), when a rate turns
  out to be too low
