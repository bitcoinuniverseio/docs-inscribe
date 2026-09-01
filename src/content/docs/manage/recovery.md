---
title: Recovery routes
description: Every route back from an unpaid, underpaid, stuck or interrupted order, the two dedicated repair tools, and the one situation with no recovery at all.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable. Fee bumping is marked Beta in the app
  lastVerified: 2026-09-01
---

Start here when something has gone wrong after you paid.

**The first rule: do not pay again.** Almost every problem on this page is made worse by a
second payment, and none is fixed by one.

## Find your situation

| What happened | Where to go |
| --- | --- |
| You paid, but the order still says awaiting payment | [Payment not detected](#payment-not-detected) |
| You sent less than the quote | [You underpaid](#you-underpaid) |
| You sent more than the quote | [You overpaid](#you-overpaid) |
| Your payment is not confirming | [The payment is stuck](#the-payment-is-stuck) |
| You closed the tab and lost the order | [You lost the order](#you-lost-the-order) |
| The hour ran out | [The quote expired](#the-quote-expired) |
| Satoshis are trapped in inscription padding | [Recover padding satoshis](#recover-padding-satoshis) |
| You sent an asset to the wrong address | [No route](#the-situation-with-no-route) |

## What is never thrown away

Before the individual cases, the guarantee they all rest on.

An order signing key is discarded in exactly two situations: after a confirmed successful
spend, or after an explicit recovery that hands control somewhere else.

It is **never** discarded because:

- a data provider timed out;
- a lookup returned nothing;
- a retry limit was reached;
- an hour passed.

There is no expired or cancelled state for an inscribe order. An order that looks dead on
screen still has its key.

## Payment not detected

**What is happening.** Universe checks the commit address every ten seconds and accepts an
unconfirmed payment, so a payment that is genuinely there usually appears within a minute.

**What to do.**

<ol class="steps">

<li>

**Wait two minutes.** The most common cause is impatience.

</li>

<li>

**Check where your payment actually went.** Look up your transaction on any explorer and
compare the recipient against the commit address the order gave you. A payment to a
different address is a different problem, and no amount of waiting fixes it.

</li>

<li>

**Check the service status panel.** If the source that reads addresses is unavailable or
behind, detection is delayed rather than broken.

</li>

<li>

**Do not send a second payment.** If several payments land on the address, Inscribe uses
the one matching the quote, or the smallest that covers it. Your second payment is not
consumed and is not automatically returned either.

</li>

</ol>

## You underpaid

The order is not lost. It records that the payment was below the quote and keeps checking.

**Top the same commit address up to the quoted amount.** The flow resumes on its own.
Nothing is cancelled and no key is discarded.

If you can no longer reach the order page, recover access first: see
[you lost the order](#you-lost-the-order).

## You overpaid

The surplus comes back to you automatically. The reveal transaction adds an output sending
the extra to the address that funded the order.

Two conditions apply, and they are about physics rather than policy:

- The surplus must be large enough to cover the extra bytes the refund output costs.
- What remains must clear the dust threshold for the address type.

If the surplus is too small to send back, **it is added to your inscription output
instead**, where you still own it. Nothing is kept.

## The payment is stuck

Your transaction is broadcast but not confirming, because the fee rate was too low for
conditions at the time.

Inscribe has two tools, and they solve different halves of the problem.

### Fix My Payment

At `/fix-payment`. Use this when the payment to the commit address is the transaction that
is stuck.

**No service fee is charged.** You are paying to repair something, not to buy something.

<ol class="steps">

<li>

**Enter the order ID** and prove ownership.

</li>

<li>

**Review the diagnosis.** The tool reads the current state of your payment and says what is
wrong with it.

</li>

<li>

**Choose the repair** it offers for your case.

</li>

<li>

**Set a fee rate that reflects current conditions**, not the one that failed.

</li>

<li>

**Sign the repair transaction.**

*Expected wallet screen:* a transaction fixing the original payment. Check the amount and
the recipient before approving.

</li>

</ol>

### Bump Stuck TX

The fee-bumping workspace. Use this for a transaction of your own that is not confirming.

It compares **RBF** (replace-by-fee, sending a replacement of the same transaction at a
higher rate) against **CPFP** (child-pays-for-parent, spending an output of the stuck
transaction at a high enough rate to pull the parent in), and shows the asset report for
every output before you sign.

The workspace is **marked Beta in the app**. It is released and reachable, and that label
is the product own assessment rather than something this documentation is adding.

RBF only works if the original transaction signalled that it could be replaced. Where it
did not, CPFP is the route, and the tool says which applies.

## You lost the order

Access to an order is a secret Inscribe keeps in the browser memory and never writes to
storage. That is what stops another site reading it, and it means a reload lets it go.

There are four routes back.

| Route | What you need |
| --- | --- |
| **The order URL** | The exact `/inscribe/<id>` link, if you still have it |
| **Home** | Nothing. Home lists the orders this browser started |
| **A recovery kit** | The encrypted kit, if you saved one when the order was created |
| **Wallet signature** | The order id, plus the same wallet and network used at creation |

**Start with Home.** Under "Orders you started in this browser" it lists them newest first,
with the workflow, the order reference, and how long ago it was recorded. Opening one takes
you to its status page.

Reopening an order asks your wallet to prove it owns the order before any payment detail is
shown. That check runs after any reload, because the order secret only ever lives in
memory.

The list holds an order id, its workflow, and when this browser saw it. Never a key, an
address, an amount, or anything about your wallet, and it is not sent anywhere. It keeps
the 50 most recent orders, for 30 days.

It does not show a status, because reading one requires the secret and any status shown
there would be invented.

See [orders you started](/docs-inscribe/manage/pending-orders/) for more.

## The quote expired

The hour on the screen is the life of the **price**, not the life of the order.

**If you have not paid:** start a fresh order at a current price. The old fee rate may no
longer get your transaction mined.

**If you have already paid:** do not pay again and do not start a new order. The address
keeps being checked on a slowing schedule, so a late payment is still found and reconciled.
Go to the order and, if it needs help, use Fix My Payment.

## Recover padding satoshis

At `/recover-sats`. Inscriptions sit on outputs with satoshis in them, and some of those
satoshis can be reclaimed without disturbing the inscription.

**No service fee is charged.**

<ol class="steps">

<li>

**Connect your wallet.**

</li>

<li>

**Let it scan** for recoverable padding across your holdings.

</li>

<li>

**Review what it found.** It validates the chain and mempool state before offering anything
as recoverable, so a candidate here has been checked rather than guessed at.

</li>

<li>

**Select what to recover** and set a fee rate.

</li>

<li>

**Sign.**

*Expected wallet screen:* a transaction reclaiming the padding. Check that your inscription
outputs are preserved in the outputs list.

</li>

<li>

**Verify** that the inscriptions are still at your address afterwards.

</li>

</ol>

If this route returns the 404 page, the feature is switched off in this deployment. It is
one of only two surfaces that 404 rather than loading and refusing.

## The recovery queue

**Activity** carries a recovery queue that ranks anything needing attention across your
orders and offers one action per item. It is the right place to look when you are not sure
what state something is in.

## Failed reveals

You do not need to do anything about these. A reveal that fails to broadcast is retried
with backoff, from 30 seconds upward.

The safety property that makes automatic retry acceptable: **the exact signed transaction
is written down before the first network call is made**, so a retry can only ever resend
the same transaction. There is no version of the retry that spends your money twice.

## The situation with no route

**A transaction you signed that did what you told it to.** If you sent an asset to the
wrong address, deliberately spent an asset-bearing output in the Advanced TX Builder, or
approved a wallet send from an address holding assets after being warned, the result is
final.

The fee is spent, the asset has moved, and no operator can reverse it. This is a property
of Bitcoin, not a limitation of Inscribe.

## Related

- [Orders you started](/docs-inscribe/manage/pending-orders/)
- [The life of an order](/docs-inscribe/concepts/order-lifecycle/)
- [Advanced transaction tools](/docs-inscribe/manage/advanced-transactions/)
- [Common problems](/docs-inscribe/troubleshooting/common-problems/)
