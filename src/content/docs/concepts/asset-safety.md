---
title: Asset safety and UTXO classification
description: How Inscribe decides which outputs it may spend on your behalf, the three classification states, why unknown is never treated as safe, and the one surface that deliberately lets you spend an asset.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

Inscribe will not pay a fee with an output that holds your assets.

## Why this matters

Bitcoin spends an output whole. An output holding an inscription, a Rune balance or a
token balance looks identical to ordinary bitcoin to software that only checks the amount.
If a tool picks that output to cover a network fee, the asset goes with it, and there is
no way back.

This is not a rare edge case. Trust Wallet dropped inscription support in March 2026 and
warned its users that bitcoin sent from an address holding inscribed outputs could spend
those outputs by accident.

## The three states an output can be in

Every output Inscribe looks at is classified, and the classification has three values
rather than two. The third one is the important one.

| State | What it means | Used to pay a fee? |
| --- | --- | --- |
| **Assets detected** | An index positively reported an inscription, Rune balance or token balance on this output | Never automatically |
| **No known risk** | A complete, untruncated scan read this output and found nothing on it | Yes, and these are used first |
| **Unverified** | The scan did not complete, was cut short, or the source could not answer for this output | Yes, but only after the cleared ones |

Each classification carries its own receipt: which index answered, when it answered, and
which network the answer describes. A stale or wrong-network answer is not treated as an
answer.

The state that does the work is the first one. The product's own wording for the third is
the sentence to remember:

> Unknown is not the same as safe.

"No known risk" is only awarded when detections came back empty **and** the core metadata
was actually present **and** nothing was truncated **and** every outpoint was covered.
Anything short of that is unverified, not clear. Absence of evidence is never recorded as
evidence of absence.

## What Inscribe does with that

Every flow that chooses funding outputs for you asks what each output holds before it
picks anything.

- An output reported as holding an asset is **never** chosen automatically.
- An output with a complete scan showing plain bitcoin is chosen **first**.
- An output nothing could be established about is chosen **only after** those.

Everyday flows go further than ranking: they fund fees from plain-bitcoin outputs only.
UTXO Split lists only plain bitcoin outputs large enough to cover the outputs, the network
fee and the service fee. Sending an inscription pulls in only plain bitcoin outputs to
cover its fee.

Nothing here stops you from spending an asset-bearing output on purpose. It stops Inscribe
from doing it on your behalf.

## The one place this is deliberately left to you

The **Advanced TX Builder** has an inscription-output picker, and it will let you spend an
output carrying an inscription or a Rune. It labels them, with a badge naming the
inscription number and a badge marking a Rune, and then it lets you proceed.

That is a decision, not a gap. The builder exists for people who need to place a specific
satoshi in a specific position, which is not something a safety rule can do for you. Where
the satoshi ends up is your responsibility on that screen.

Every other surface that lets you choose outputs shows the asset report for each one
first:

- **Split UTXO** shows a full asset preflight report per output.
- **Custom transaction** lists your outputs with their classification.

## When funding is short

If Inscribe holds outputs back and the remaining balance cannot cover the action, it tells
you how many outputs were held back, how many satoshis they hold, and why. You are never
told to add bitcoin you already have.

To free the balance, send plain bitcoin to the address, or lower the fee rate.

## What Inscribe does not claim

It reports what the asset index knows. Where the index has no answer for an output,
Inscribe says so rather than calling the output safe. A selection is never described as
"safe": the screening removes outputs the index flagged, and it does not prove the rest
are clean.

Coverage has stated limits rather than hidden ones. When a lookup hits a cap on how many
items or groups it will read, the count is marked as a lower bound and the reason says so,
instead of a truncated list being presented as the whole picture.

If the private infrastructure cannot answer at all, the funding flow stops with an error
rather than returning an unscreened list of outputs. Failing closed is the point.

## The warning before a wallet payment

When you send bitcoin through your wallet's own send screen, your wallet chooses the
outputs, not Inscribe. Immediately before your wallet opens, Inscribe scans the address the
payment will come from and lists any outputs that hold assets:

> **The address you are paying from holds assets.** Your wallet chooses which outputs pay
> for this. If it spends one of these, the asset it carries goes with it, and Inscribe
> cannot bring it back. Pay from an address that holds only bitcoin, or pick the inputs
> yourself in your wallet before you approve.

It lists the outpoint and what each output carries. It does not stop you. The wallet owns
the selection, you may have a good reason to pay from that address, and an app that
blocked you would be wrong more often than it was right.

Only outputs the index positively identified appear. An output with an incomplete, stale,
or out-of-network scan is not listed, and is also never picked automatically.

## What can be detected

The asset inventory for an output recognises around thirty categories, including BRC-20,
ARC-20, CAT-20, Runes, Ordinals, Bitmap, rare sats, Stamps, SRC-20, SRC-101, Atomicals,
Alkanes, Mezcal, DMT, TAP, UNAT, BLOCK-20, DUST-20, OP-20, OP Names, OP_RETURN, Drops,
OP_DROP and Tandem. Anything it cannot place is shown as **Unclassified** rather than
dropped from the list.

Tandem state carriers get a firmer line than the rest: they cannot fund ordinary sends,
mints, replacements or recovery plans at all.

## A note on addresses

An Ordinals wallet keeps two addresses with different jobs, and the difference is the
reason none of this can be simplified into one balance. Read
[wallets and the two addresses](/docs-inscribe/concepts/wallets-and-addresses/).

## Related

- [Advanced transaction tools](/docs-inscribe/manage/advanced-transactions/)
- [Recovery routes](/docs-inscribe/manage/recovery/)
- [Where the data comes from](/docs-inscribe/concepts/source-freshness/)
