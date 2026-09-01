---
title: Etch a rune
description: Create a new rune with Runes or Mezcal, mint an open rune, and split a rune balance across outputs. What etching commits to permanently and how the two protocols differ.
protocols: [runes, mezcal]
operations: [etch, mint, transfer]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable, ungated
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone creating a new rune, or minting and moving an existing one.

**Goal.** A rune etched with the name, supply and mint terms you intended, or a minted
balance you hold.

Etching is the Runes word for what other protocols call a deploy. It is the same idea: you
bring a new asset into existence and fix its rules.

## Two protocols, one idea

| Property | Runes | Mezcal |
| --- | --- | --- |
| Workspace | `/runes` | `/mezcal` |
| Released | Ungated | Ungated |
| Operations | etch, mint, transfer | etch, mint, transfer |
| How it is written | Runestones, the Runes protocol encoding | JSON records in OP_RETURN rather than runestones |
| Service fee | The flat 1,500 satoshis | Mezcal quotes its own amount |

Mezcal is a separate protocol with its own index, not a variant of Runes. A name etched on
one is not the same asset as the same name on the other.

## What etching fixes permanently

An etch commits to the rune identity and its mint terms. None of it can be changed
afterwards:

- **The name.** Runes names are spaced uppercase letters, and shorter names are subject to
  the protocol unlocking schedule.
- **Divisibility**, which is how many decimal places the rune has.
- **The mint terms**, if you allow minting at all: the amount per mint, the cap on how many
  mints, and any block height or offset window during which minting is open.
- **The premine**, the amount you allocate to yourself at etch time.

Get these wrong and the only remedy is etching a different rune.

## Prerequisites

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet |
| Workspace | `/runes` or `/mezcal` |
| Wallet | Universe, UniSat, Xverse, OKX or Wizz |
| Funds | Spendable bitcoin at your payment address |
| Reversible? | No |

## Safety considerations

- **Check the name is available** in the workspace before you pay. A name already etched
  cannot be taken.
- **Decide on divisibility deliberately.** Zero decimals makes a rune indivisible forever.
- **Mint terms are the whole economics.** Amount, cap and the open window together decide
  how the supply is distributed. Model it before you sign.
- **A premine you did not intend is permanent.** Check the field even if you left it at
  zero.

## Steps: etch a rune

<ol class="steps">

<li>

**Open `/runes`** (or `/mezcal`) and connect your wallet.

</li>

<li>

**Browse existing runes** and confirm your name is free.

</li>

<li>

**Fill the Etch form.**

Name, divisibility, premine, and the mint terms if you want the rune to be mintable. Read
each field back before continuing; this is the set of values you cannot change.

</li>

<li>

**Set the fee rate.**

An etch is a small transaction. **Normal** is selected and marked Recommended.

Runes rounds fee rates to whole satoshis in some conditions, which is one reason Normal and
Fast can show the same number. That is not an error.

</li>

<li>

**Review the confirmation screen.**

Check the name, divisibility, premine and mint terms one final time, then the cost lines
and the total. Mezcal shows its own service fee amount here rather than the flat 1,500.

</li>

<li>

**Confirm and pay.**

*Expected wallet screen:* one send to the commit address for the Total Cost shown. One
signature.

</li>

<li>

**Verify in the rune list.**

When the order reaches **Wallet visible**, find the rune in the workspace list. That proves
the Runes index parsed your etch, which a confirmed transaction alone does not.

</li>

</ol>

## Minting an open rune

Open mints are first come, first served against the cap. The workspace lists runes that are
currently mintable.

The mint flow is the same shape as the etch: choose the rune, set the fee rate, review the
total, pay once. On a contested mint the fee rate decides whether you get in before the cap
fills. See [mint a token](/docs-inscribe/create/mint-a-token/) for why a confirmed mint can
still claim nothing.

## Splitting a rune balance

The Runes workspace can split a rune balance across outputs. This is genuinely useful and
worth doing deliberately:

- A single output holding your whole balance has to be spent whole every time you move any
  of it.
- Several outputs let you send part of a balance without disturbing the rest.

Splitting shows the asset report for each output before you sign. See
[advanced transaction tools](/docs-inscribe/manage/advanced-transactions/).

## Expected result

Your rune etched with the exact terms you set, visible in the workspace rune list, with a
transaction id verifiable on any explorer.

## How to verify

1. The order reaches **Wallet visible**.
2. **The rune list in the workspace** shows your rune with the terms you set. Check the
   divisibility and mint terms here, not just the name.
3. Any Bitcoin explorer confirms the transaction independently.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| The name is rejected | Already etched, or not valid under the Runes name rules | Choose another |
| Confirmed, but the rune is not listed | The index has not read that block, or the etch was invalid | Check the service status panel first |
| Normal and Fast quote the same rate | Blocks have room, or the protocol rounds to whole satoshis | Nothing to fix. Paying more would buy nothing |
| The mint says the cap is reached | The supply was exhausted before your transaction | Nothing to do. The fee is spent |
| Still awaiting payment | The payment has not reached the commit address | Wait. Do not pay again |

## Recovery route

See [recovery routes](/docs-inscribe/manage/recovery/). There is no recovery from etching
the wrong terms.

## Related

- [Mint a token](/docs-inscribe/create/mint-a-token/)
- [Deploy a token](/docs-inscribe/create/deploy-a-token/)
- [Runes family](/docs-inscribe/protocols/runes-family/)
