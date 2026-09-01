---
title: Create a collection
description: The three ways Inscribe groups inscriptions into a collection, gallery, parent and child, and delegate, with the limits on each and when to use which.
protocols: [ordinals]
operations: [inscribe, transfer]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable, ungated
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone launching a set of inscriptions that belong together.

**Goal.** A collection whose membership is provable from the chain rather than from a
list someone maintains.

## The three approaches

Inscribe offers three sub-tabs in the **Inscribe** workspace, and they solve different
problems. Pick before you start; converting later means inscribing again.

| Approach | Sub-tab | What it gives you | Limit |
| --- | --- | --- | --- |
| **Gallery** | Gallery | A set defined by a JSON manifest you upload | **500 items**, manifest file up to 512 KB |
| **Parent and child** | Parent/Child | Each item provably inscribed under a parent you own, verified on chain | One parent per child |
| **Delegate** | Delegate | Many inscriptions pointing at one piece of content, so the bytes are stored once | Same as an ordinary inscription |

**Gallery** is the straightforward route for a numbered set.

**Parent and child** is the strongest claim: the child's provenance comes from spending
the parent, so nobody can add themselves to your collection. It costs more and needs a
second signature.

**Delegate** is the cheap route for many items sharing one artwork. It does not store the
content again, so a 1,000-item delegate set costs a fraction of 1,000 full inscriptions.

## Prerequisites

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet |
| Workspace | **Inscribe** at `/inscribe` |
| Wallet | Universe, UniSat, Xverse, OKX or Wizz |
| For parent and child | You must already own the parent inscription |
| Reversible? | No |

## Parent and child: what is different

This is the only common flow that asks for **two signatures**, and the reason is worth
understanding.

The reveal transaction has to spend the parent inscription you already own. Only your
wallet can authorise that, so the order pauses in a waiting-for-signature state and
presents a prepared transaction for you to sign. That prepared transaction is good for
**15 minutes**.

There is a check on top of it. Before accepting your parent, the server re-derives the
parent's output script and refuses it unless it matches what the chain indexer currently
reports for that inscription. **A parent that has moved since you loaded the page is
rejected rather than spent.** If you see that rejection, reload the workspace so the
current location of the parent is picked up.

Cost note: the parent input and its return output add about **101 virtual bytes** to the
reveal, which shows up in the network fee line.

## Steps: a gallery

<ol class="steps">

<li>

**Prepare the manifest.**

A JSON file describing your items. It can be uploaded or pasted. The manifest itself is
capped at 512 KB and the set at 500 items.

</li>

<li>

**Open `/inscribe` and select the Gallery sub-tab.**

Connect your wallet. Upload or paste the manifest.

</li>

<li>

**Check the item count and the preview.**

Confirm the count matches what you intended before you look at any price.

</li>

<li>

**Set the fee rate and output size.**

Both apply per item, so at 500 items the totals move quickly. Look at the total, not the
per-item figure.

</li>

<li>

**Review the confirmation screen and pay.**

*Expected wallet screen:* one send to the commit address, for the total shown.

Note that the gallery flow quotes a price good for **24 hours** rather than the usual one
hour.

</li>

<li>

**Verify.**

**Portfolio** should list the set. Check the count, then verify a sample of reveal
transaction ids on an explorer.

</li>

</ol>

## Steps: parent and child

<ol class="steps">

<li>

**Open `/inscribe` and select the Parent/Child sub-tab.**

Connect the wallet holding the parent inscription.

</li>

<li>

**Choose the parent** from the inscriptions your wallet holds, and add the child content.

</li>

<li>

**Review the confirmation screen and pay the commit address.**

*Expected wallet screen (first signature):* one send to the commit address for the total.

</li>

<li>

**Sign the reveal when asked.**

Once the payment is seen, the order moves to a waiting-for-signature state and presents a
prepared transaction.

*Expected wallet screen (second signature):* a transaction spending your parent
inscription and returning it to you, alongside the commit input. Check the parent is
returned to an address you control.

**You have 15 minutes.** If it lapses, the order asks again rather than losing anything.

</li>

<li>

**Verify.**

Confirm on an explorer that the parent came back to your address and the child exists.
That the parent returned is the check that matters.

</li>

</ol>

## Safety considerations

- **Decide the approach first.** Gallery, parent and delegate produce different provenance
  and you cannot convert between them afterwards.
- **A parent must be spent to be used.** It is returned to you in the same transaction, but
  it does move. Verify it came back.
- **Check the manifest before paying.** At 500 items, a systematic error is 500 errors.
- **Delegates depend on their target.** If the content you delegate to is what people
  actually want, keep it inscribed and reachable.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| The parent is rejected | The parent has moved since the page loaded, and the server checks that | Reload the workspace and start again |
| The 15-minute signing window lapsed | The prepared reveal expired | The order asks again. Nothing is lost |
| The manifest is refused | Over 500 items, or over 512 KB, or not valid JSON | Split the set or fix the file |
| Item count is not what you expected | The manifest has duplicates or blanks | Fix it before paying |
| Still awaiting payment | The payment has not reached the commit address | Wait. Do not pay again |

## Recovery route

See [recovery routes](/docs-inscribe/manage/recovery/). A parent-and-child order waiting
for your signature is not lost, and neither is a paid gallery order.

## Related

- [Inscribe in a batch](/docs-inscribe/create/batch/)
- [Inscribe a file](/docs-inscribe/create/inscribe-a-file/)
- [Ordinals family](/docs-inscribe/protocols/ordinals-family/)
