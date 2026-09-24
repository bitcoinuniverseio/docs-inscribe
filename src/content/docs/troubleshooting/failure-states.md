---
title: Failure states
description: Every way Inscribe reports that something is wrong, what each state affects, what keeps working, and how to tell a switched-off feature from a broken one.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

A reference for reading what Inscribe is telling you. For fixes, see
[common problems](/docs-inscribe/troubleshooting/common-problems/).

## The distinction that matters most

Three different things can look like a broken workspace, and each has a different fix:

| It looks like | It actually is | What fixes it |
| --- | --- | --- |
| A workspace that will not act | Its release gate is off in this deployment | Nothing you can do. It is not broken |
| A workspace that will not act | The protocol is not released | Nothing. The work is unfinished |
| A balance or list that is missing or out of date | Its data source is down or catching up | Wait for the index to read the latest blocks, then refresh the workspace. Writes keep working meanwhile |

Inscribe reports these separately rather than collapsing them into one word, because they
are different problems. A data source that is down or catching up never stops a workspace
from acting. It only affects what the workspace can read.

## Data source states

A source is in exactly one of six states:

| State | What it affects |
| --- | --- |
| **Live** | Nothing |
| **Live, currency unverified** | Nothing directly, but how current its reads are cannot be checked |
| **Tip not verified** | How current its reads are cannot be checked until the comparison is available |
| **Behind** | Reads from that source may be missing the latest blocks |
| **Unavailable** | Reads from that source. Never shown as an empty result |
| **Unknown** | Its reads are treated as not usable |

None of these states stops a write.

Separately: **switched off by the operator** is reported as its own thing, not as a source
being down.

## What a source outage does and does not stop

**Keeps working:**

- minting, inscribing, etching, deploying, transferring and every other write;
- drafting;
- your wallet connection;
- every workspace that does not read the affected source;
- anything already signed or broadcast, which is never at risk.

**Affected:**

- reads from that source, such as balances, token lists and search results, which may be
  missing or out of date. A workspace can still say that a particular read failed.

Nothing in the app's top bar or banners announces a source outage. The effect shows only
where you read that source.

One fund-safety rule stays in force. When Inscribe picks outputs to pay fees, it never
spends an output whose inscriptions, runes or Atomicals it cannot verify. If an index has
not reached the block that created an output, that one output is skipped. Other outputs
still pay.

## Portfolio failure states

| Header | Meaning |
| --- | --- |
| **Live** | Every source answered |
| **Partial** | At least one did not. The page names it and says what is missing |

An empty portfolio is never presented as an answer while a source is silent. "No assets
found for this address" appears only when every source answered.

## Order failure states

| State | Meaning | Action |
| --- | --- | --- |
| **Awaiting payment** past the hour | The quote expired. The order did not | Start fresh if unpaid. If paid, see recovery |
| Payment below the quote | Underpaid | Top up the same address |
| **Failed** | Needs attention | [Recovery routes](/docs-inscribe/manage/recovery/) |
| A reveal that will not broadcast | Retried automatically with backoff from 30 seconds | Nothing. The same signed transaction is resent, never a new one |

There is no cancelled or expired order state, and a signing key is never discarded because a
provider timed out, a lookup returned nothing, a retry limit was reached, or an hour passed.

## Application failure states

### A release landed under your tab

Every screen loads as its own file, and a release replaces those files. A tab open across a
release asks for a file that is no longer there.

Inscribe recognises this and says a new version was released, offering reload as the primary
action. A dropped connection produces the same failure and the same fix, so the message
covers both rather than guessing.

Nothing you started is lost by the reload.

### A 404 where you expected a workspace

Two surfaces return the 404 page when their feature is off rather than loading and refusing:
**Recover Sats** and the **Dogecoin BlockPad**. Everywhere else, a gated workspace loads.

## Protocol-specific failure behaviour

| Protocol | Behaviour |
| --- | --- |
| **CAT-20** | Transaction features stay fail-closed when Fractal data and signing dependencies are unavailable. A CAT tracker that is only catching up does not block minting. Market discovery reports the dependency state instead of an empty market |
| **Drops and OP_DROP** | Require two independent verifiers to agree on the finalized block hash. Disagreement or unavailability keeps readiness unavailable rather than falling back to a public provider |
| **Research protocols** | Stay visible for documentation or controlled-network work while production actions stay disabled |

Mainnet writes require the protocol network profile, independent authorization, an
authoritative index, transaction safety checks, and a verified readiness canary. Universe
does not switch a protocol on to make a status page look healthy.

## Asset screening failure states

| What happens | Why |
| --- | --- |
| Funding stops with an error rather than returning outputs | The screening infrastructure could not answer. Failing closed is deliberate |
| An output is listed as **Unverified** | The scan did not complete, was truncated, or could not answer. Not the same as safe |
| A count is marked as a lower bound | A lookup hit a cap on items or groups. The limit is stated rather than a truncated list being shown as complete |
| You are told outputs were withheld | Asset-bearing outputs were kept out of fee funding. The message gives the count and the satoshis |
| An output is skipped as a fee input | The index has not yet read the block that created it, so its contents cannot be verified. Other outputs still pay |

## Retry behaviour

Retry controls repeat read-only requests only. **They never replay a mint, transfer, deploy,
signing or broadcast action.**

That is why retrying is always safe from the interface: the actions that spend money are not
what a retry control touches.

## Related

- [Common problems](/docs-inscribe/troubleshooting/common-problems/)
- [Where the data comes from](/docs-inscribe/concepts/source-freshness/)
- [Order states](/docs-inscribe/reference/order-states/)
