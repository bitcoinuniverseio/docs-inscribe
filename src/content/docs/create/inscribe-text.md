---
title: Inscribe text
description: Write text onto Bitcoin as an Ordinals inscription, an OP_RETURN record or a Drop, with the size limits, the cost and how to find it again afterwards.
protocols: [ordinals, op_return, drops, chainbloom]
operations: [inscribe]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Ordinals and OP_RETURN are released and ungated. Drops and ChainBloom are released but a deployment must switch them on
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone wanting a line of text, a message, or a small JSON document
permanently on Bitcoin.

**Goal.** Text inscribed at an address you control, findable by its content afterwards.

## Prerequisites

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet |
| Workspace | **Inscribe**, at `/inscribe`, the **Text** sub-tab. This is the tab the workspace opens on |
| Wallet | Universe, UniSat, Xverse, OKX or Wizz |
| Funds | Spendable bitcoin at your payment address. Text is small, so this is usually the cheapest thing you can inscribe |
| Reversible? | No |

## Where the text can go

| Destination | Limit | What it is for |
| --- | --- | --- |
| **Ordinals** | No protocol cap | The default. A normal inscription you own, transfer and see in your portfolio |
| **OP_RETURN** | 34,000 bytes | A free-form record in an OP_RETURN output, with an optional file |
| **Drops** | 256 bytes | A confirmed data artifact with a stable ID and on-chain proof. A deployment must switch it on |
| **ChainBloom** | Its own flow | A contribution to a shared world. A deployment must switch it on |

For anything you want to hold, transfer, or see in your wallet, use Ordinals.

## Safety considerations

- **Text is public and permanent.** Anyone can read it, forever. Do not inscribe anything
  you would not publish under your own name.
- **Check spelling before you sign.** There is no edit.
- **Fund from an address holding only bitcoin** where you can. See
  [asset safety](/docs-inscribe/concepts/asset-safety/).

## Steps

<ol class="steps">

<li>

**Open `/inscribe`.**

It opens on the **Text** sub-tab. Connect your wallet.

</li>

<li>

**Type or paste your text.**

One line or many. The character count and the resulting size drive the network fee.

</li>

<li>

**Pick the destination.**

Ordinals unless you specifically want one of the others.

</li>

<li>

**Read the preview.**

Check the exact characters, including trailing spaces and line breaks, and check any JSON
is valid if you meant it to be.

</li>

<li>

**Set the fee rate.**

**Normal** is selected and marked Recommended. Text is small, so the network fee is
usually a small part of the total. The flat 1,500-satoshi service fee will often be the
largest line.

</li>

<li>

**Review the confirmation screen and pay.**

Compare the amount in your wallet against the **Total Cost** on the confirmation screen.

*Expected wallet screen:* one send, to the commit address, for the total. One signature.

</li>

<li>

**Verify.**

When the order reaches **Wallet visible**, find it in **Portfolio**. Text inscriptions can
also be found by their content in **Search Txt**, which searches text inscriptions by what
they say.

</li>

</ol>

## Expected result

A text inscription on a 546-satoshi output at your Ordinals address, with a reveal
transaction id you can look up on any explorer.

## How to verify

1. **Portfolio** shows it under your wallet.
2. **Search Txt** finds it by its content.
3. Any Bitcoin explorer, using the reveal transaction id, confirms the output at your
   address independently of Inscribe.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| The text exceeds the destination limit | OP_RETURN and Drops have hard caps | Shorten it, or use Ordinals |
| Still **Awaiting payment** | The payment has not reached the commit address | Wait. Do not pay again |
| Payment below the quote | You sent less than the total | Top the same address up to the quoted amount |
| The payment will not confirm | Fee rate too low for current conditions | **Fix My Payment** or **Bump Stuck TX** |
| The hour ran out | The price quote expired | Start a fresh order. If you already paid, see recovery |

## Recovery route

See [recovery routes](/docs-inscribe/manage/recovery/). An unpaid or partly paid order is
not lost, and its signing key is not discarded.

## Related

- [Inscribe a file](/docs-inscribe/create/inscribe-a-file/)
- [Inscribe in a batch](/docs-inscribe/create/batch/), for many lines at once
- [What a transaction costs](/docs-inscribe/concepts/what-it-costs/)
