---
title: Order states
description: The four states an Inscribe order shows you, what each one covers, why there is no cancelled or expired state, and what confirmations are required at each batch size.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

An order shows you one of four states. They are deliberately coarse: the underlying machine
has more steps, and most of them are not decisions you can act on.

## The four states

| State | What it covers | Do you need to do anything? |
| --- | --- | --- |
| **Awaiting payment** | The order is quoted and waiting for the commit address to be funded | **Yes.** Pay it, or the order sits here |
| **Creation in progress** | Payment seen, reveal built, broadcast, confirmed, being indexed | No. This runs without you |
| **Wallet visible** | The indexer and your wallet both agree the asset exists | No. This is done |
| **Failed** | Something needs attention | **Yes.** See [recovery routes](/docs-inscribe/manage/recovery/) |

The full status line for the middle state says what it is waiting on:

> Creation in progress, waiting for chain, indexer, and wallet evidence.

## Why "in progress" outlasts your confirmation

Broadcast, confirmed and indexed are all still **Creation in progress**. The order only
reaches **Wallet visible** when the indexer and your wallet agree the asset exists.

Claiming success at broadcast would be right most of the time and wrong in exactly the cases
where being wrong costs you the most. A transaction that confirmed but was not credited by a
protocol index is the clearest example: the chain agrees, and you still do not have the
token.

## There is no cancelled or expired state

Inscribe orders do not have one.

The hour on the screen is the life of the **price quote**. When it passes, the quote is no
longer good and you should start a fresh order at a current price. What does not happen:

- the order is not deleted;
- the signing key is not erased;
- the commit address stops being checked.

The address keeps being checked on a slowing schedule, so a payment that arrives late is
still detected and reconciled.

A signing key is discarded in only two situations: after a confirmed successful spend, or
after an explicit recovery that hands control elsewhere. Never because a provider timed out,
a lookup returned nothing, a retry limit was reached, or an hour passed.

## Payment detection

| Property | Value |
| --- | --- |
| Check interval | Every 10 seconds |
| Confirmations needed for a standard single inscription | **Zero.** An unconfirmed payment is enough |
| Which payment is used if several arrive | The one matching the quote exactly, then the smallest that covers it |

Preferring the smallest sufficient payment is deliberate: taking the largest would swallow
an accidental overpayment that belongs to you.

## Confirmations required by batch size

Bulk jobs fan a payment out across many addresses first, and a fan-out that gets reorganised
would strand the whole job.

| Items | Confirmations before the job proceeds |
| --- | --- |
| Up to 22 | None |
| 23 to 500 | 1 |
| More than 500 | 2 |

Reveals are then broadcast in chunks of no more than **24**, because Bitcoin mempool refuses
a chain of more than 25 related unconfirmed transactions.

## Quote lifetimes

| Flow | Quote good for |
| --- | --- |
| Most flows | 1 hour |
| Gallery | 24 hours |
| A prepared parent-and-child reveal, waiting for your signature | 15 minutes |

## Underpayment and overpayment

**Underpaid.** The order records it and keeps checking. Top the same address up to the
quoted amount and the flow resumes.

**Overpaid.** The reveal adds an output returning the surplus to the funding address, where
the surplus is large enough to cover the extra bytes and still clear the dust threshold.
Where it is not, the surplus is added to your inscription output instead.

## Broadcast retries

A reveal that fails to broadcast is retried with backoff, from 30 seconds upward.

The exact signed transaction is written down before the first network call is made, so a
retry can only ever resend the same transaction. There is no version of the retry that
spends your money twice.

## Related

- [The life of an order](/docs-inscribe/concepts/order-lifecycle/)
- [Orders you started](/docs-inscribe/manage/pending-orders/)
- [Recovery routes](/docs-inscribe/manage/recovery/)
