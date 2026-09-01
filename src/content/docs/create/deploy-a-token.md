---
title: Deploy a token
description: Create a new token on Bitcoin. Which protocols support a deploy, what each one does differently, the shared workflow, and what a deploy does not give you.
protocols: [brc20, src20, tap, block20, dust20, op_return, op_drop, arc20]
operations: [deploy]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: BRC-20, SRC-20, TAP and OP-20 are released and ungated. BLOCK-20 and DUST-20 are released. ARC-20 and OP_DROP are released but a deployment must switch them on
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone launching a new fungible token on Bitcoin.

**Goal.** A token deployed on the protocol you chose, with a ticker nobody else can now
claim on that protocol.

## Which protocols support a deploy

The registry records Inscribe implementing a `deploy` operation for these:

| Protocol | Workspace | Released | What is distinctive |
| --- | --- | --- | --- |
| **BRC-20** | `/brc20` | Ungated | JSON text inscriptions. Supports 4-byte, 5-byte self-issuance, and brc2.0 |
| **SRC-20** | `/src20` | Ungated | Data lives in 330-satoshi P2WSH outputs. Your wallet signs pre-built transactions |
| **TAP** | `/tap` | Ungated | Transfers take two steps. Also mints DMT tokens claiming block numbers |
| **OP-20** | `/op-return` | Ungated | OP_RETURN based. The same workspace registers OP Names |
| **BLOCK-20** | `/block20` | Released | Each mint embeds the latest block hash, filled in at mint time |
| **DUST-20** | `/dust20` | Released | The mint output's satoshi value encodes the amount |
| **ARC-20** | `/arc20` | A deployment must switch it on | Coloured-sat tokens with direct wallet signing, and no payment-address step |
| **OP_DROP** | `/op-drop` | A deployment must switch it on | Every operation is a compact JSON inscription, funded wallet-only |

Two protocols support creating a new asset but call it something else:

- **Runes** and **Mezcal** use `etch` rather than `deploy`. See
  [etch a rune](/docs-inscribe/create/etch-a-rune/).
- **AVM** records a `deploy` in the registry, but the production contract classifies AVM
  as **not released**. Do not plan around it.

## Prerequisites

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet |
| Wallet | Universe, UniSat, Xverse, OKX or Wizz |
| Funds | Spendable bitcoin at your payment address |
| A ticker | Available on your chosen protocol. Check in the workspace before you pay |
| Reversible? | **No.** A deploy is permanent and a ticker cannot be un-deployed |

## Safety considerations

- **Check the ticker is free first.** Every workspace browses the existing token list.
  Deploying a ticker somebody already took wastes the fee and produces nothing useful.
- **Get the supply and limit right.** These are written into the deploy and cannot be
  changed afterwards. A mint limit that is too low makes your token painful to mint; a
  supply you regret is permanent.
- **A deploy is not a listing.** It creates the token on the protocol. It does not make it
  tradeable anywhere, and Inscribe does not claim otherwise. Creation and trading are
  independent surfaces.
- **The protocols are not interchangeable.** A BRC-20 ticker and a TAP ticker with the same
  letters are different tokens on different indexes.

## The shared workflow

Most protocol workspaces have one shape: browse the token list, fill a Deploy, Mint or
Transfer form, then pay through one checkout.

<ol class="steps">

<li>

**Open the workspace** for your protocol from the table above, and connect your wallet.

</li>

<li>

**Browse the existing tokens** and confirm your ticker is not taken. This is the step
people skip and regret.

</li>

<li>

**Fill in the Deploy form.**

Ticker, total supply, and per-mint limit are the usual fields. Read the workspace's own
field help: protocols differ in what they allow, particularly on ticker length and
decimals.

</li>

<li>

**Set the fee rate.**

**Normal** is selected and marked Recommended. A deploy is a small inscription, so the
flat 1,500-satoshi service fee is often the largest line in the total.

</li>

<li>

**Review the confirmation screen.**

It names the operation type, the token type, the fee rate, and the three cost lines
totalled. Check the ticker, the supply and the limit one more time here.

</li>

<li>

**Confirm and pay.**

*Expected wallet screen:* one send to the commit address for exactly the Total Cost shown.
One signature.

**ARC-20 is different:** it signs directly with your wallet and has no payment-address
step, so expect a transaction to sign rather than a payment to make.

</li>

<li>

**Wait, then verify.**

The order reaches **Wallet visible** when the indexer and your wallet agree. Then find the
token in the workspace's own token list, which is the check that matters: it means the
protocol's index recognised your deploy.

</li>

</ol>

## Expected result

Your ticker deployed on your chosen protocol, visible in that workspace's token list, with
a reveal transaction id you can verify on any explorer.

## How to verify

1. The order page shows **Wallet visible** and gives you the transaction id.
2. **The protocol workspace's token list** shows your ticker. This is the meaningful check:
   it proves the protocol index parsed your deploy, not just that a transaction confirmed.
3. Any Bitcoin explorer confirms the transaction independently of Inscribe.

A transaction that confirmed but does not appear in the token list means the protocol index
did not accept it, or has not read that block yet. Check the service status panel before
assuming the deploy failed.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| The ticker is rejected | Already deployed, or invalid for that protocol's rules | Choose another. Check length and character rules in the workspace |
| The transaction confirmed but the token is not listed | The protocol index has not read that block, or rejected the deploy | Check the service status panel. If the index is behind, wait. If it is current, the deploy was invalid |
| The workspace says its source is unavailable | The protocol index is down or catching up | Reads and drafts still work; writes stay paused. Nothing signed is at risk |
| The workspace is visible but refuses to act | Its release gate is off in this deployment | It is not a fault you can clear. See [status](/docs-inscribe/start/status/) |
| Still awaiting payment | The payment has not reached the commit address | Wait. Do not pay again |

## Recovery route

See [recovery routes](/docs-inscribe/manage/recovery/). A deploy order behaves like any
other: unpaid and underpaid orders are kept, keys are retained, and failed reveals are
retried.

There is no recovery from deploying the wrong parameters. That is why the confirmation
screen restates them.

## Related

- [Mint a token](/docs-inscribe/create/mint-a-token/)
- [Transfer an asset](/docs-inscribe/create/transfer-an-asset/)
- [Etch a rune](/docs-inscribe/create/etch-a-rune/)
- [Coverage matrix](/docs-inscribe/protocols/coverage/)
