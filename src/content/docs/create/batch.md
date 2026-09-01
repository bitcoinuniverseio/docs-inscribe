---
title: Inscribe in a batch
description: Inscribe up to 1,000 items in one job, how the payment is fanned out, why bigger batches wait for confirmations, and what the service fee does across a batch.
protocols: [ordinals]
operations: [inscribe]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable, ungated
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone inscribing many items at once: a numbered series, a word list,
a set of files.

**Goal.** Many inscriptions from one payment and one signature.

## Prerequisites

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet |
| Workspace | **Inscribe**, at `/inscribe`, the **Text** sub-tab in bulk mode |
| Destination | **Ordinals only.** Drops, OP_RETURN and Stamps force single-item mode |
| Wallet | Universe, UniSat, Xverse, OKX or Wizz |
| Maximum | **1,000 inscriptions per bulk job** |
| Reversible? | No, and a batch multiplies the consequence |

## How bulk text works

One line per inscription. Each non-empty line in the box becomes its own inscription, and
empty lines are skipped.

That is the whole rule. It means a list you already have, pasted in, is a batch.

## What it costs

The batch is one order with one payment, so the pricing is not simply the single-item cost
times the number of items.

<div class="receipt">
<p class="receipt-title">How a batch is priced</p>
<table>
<thead>
<tr><th scope="col">Line</th><th scope="col">How it scales</th></tr>
</thead>
<tbody>
<tr>
<th scope="row">Network fee</th>
<td>Per item, plus the fan-out transaction that distributes your payment</td>
</tr>
<tr>
<th scope="row">Service fee</th>
<td><strong>Once for the whole batch</strong> in the default single-transaction mode</td>
</tr>
<tr class="not-a-fee">
<th scope="row">Inscription outputs</th>
<td>Per item, at your chosen output size</td>
</tr>
</tbody>
</table>
</div>

The service fee is the line worth understanding. In the default mode you pay the flat
1,500 satoshis once, no matter how many items. If you choose the **separate outputs** mode,
where each inscription is funded independently, the fee is charged per output instead.

Choose separate outputs only when you need the independence. It costs meaningfully more.

## Batch size changes the mechanics

Larger batches distribute your payment across temporary addresses first, and a fan-out
that gets reorganised would strand the whole job. So the job waits for confirmations
before it proceeds:

| Items | How it is funded | Confirmations before it proceeds |
| --- | --- | --- |
| Up to 22 | Fanned out directly from your payment | **None.** It starts as soon as the payment is visible |
| 23 to 500 | Temporary addresses | **1** |
| More than 500 | Temporary addresses | **2** |

That is why a 30-item batch feels slower to start than a 20-item one. It is waiting for a
block, on purpose.

Reveals are then broadcast in chunks of no more than 24, because Bitcoin's mempool refuses
a chain of more than 25 related unconfirmed transactions.

## Safety considerations

- **A mistake is repeated 1,000 times.** Proofread the list. A trailing space or a stray
  blank entry is cheap to fix now and impossible to fix later.
- **Budget properly.** A 500-item batch at 546 satoshis per output is 273,000 satoshis in
  outputs alone, before any fee.
- **Do not close the tab expecting to cancel.** Closing the tab does not stop a paid job.

## Steps

<ol class="steps">

<li>

**Open `/inscribe` on the Text sub-tab and switch to bulk.**

The destination must be Ordinals. Connect your wallet.

</li>

<li>

**Paste your list, one item per line.**

Empty lines are skipped, so you do not need to tidy them. Check the item count the app
reports against what you expected. If they differ, your list has a problem.

</li>

<li>

**Choose the funding mode.**

The default single-transaction mode charges the service fee once. Separate outputs charges
it per output and costs considerably more. Take the default unless you know you need the
other.

</li>

<li>

**Set the fee rate and output size.**

Both apply to every item. At batch scale, the difference between output sizes and between
fee tiers is multiplied by your item count, so look at the total rather than the per-item
figure.

</li>

<li>

**Review the confirmation screen.**

Check the item count, the total, and the receiving address. The total is what your wallet
will be asked for.

</li>

<li>

**Confirm and pay.**

*Expected wallet screen:* one send, to one commit address, for the whole batch total. One
signature covers the entire job.

</li>

<li>

**Wait.**

Depending on size, the job may wait for one or two confirmations before it fans out, then
reveal in chunks. The status page reports progress. You can close the tab.

</li>

<li>

**Verify.**

**Portfolio** should list the full set once the indexer and your wallet agree. Compare the
count against what you submitted. Check the reveal transaction ids on an explorer for a
sample.

</li>

</ol>

## Expected result

One inscription per non-empty line, all at your Ordinals address, from one payment and one
signature.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| The item count is not what you expected | Blank lines, duplicates, or an unintended line break in your source | Fix the list before paying |
| More than 1,000 items refused | Over the bulk cap | Split into several jobs |
| The job sits waiting after payment | A batch over 22 items is waiting for its confirmations | Wait for the block. This is by design |
| Some items completed, some did not | Reveals are broadcast in chunks and one chunk failed | Failed reveals are retried automatically with backoff. See recovery |
| Bulk mode is unavailable | You have a non-Ordinals destination selected | Switch the destination to Ordinals |

## Recovery route

A partly completed batch is not abandoned. Failed reveals retain their signed transaction
and key and are retried with backoff, so a retry can only ever resend the same transaction
rather than spend your money again. **Activity** carries a recovery queue that ranks
anything needing attention and offers one action per item.

See [recovery routes](/docs-inscribe/manage/recovery/).

## Related

- [Create a collection](/docs-inscribe/create/collections/), for a gallery of up to 500
- [The life of an order](/docs-inscribe/concepts/order-lifecycle/)
- [Orders you started](/docs-inscribe/manage/pending-orders/)
