---
title: Common problems
description: The problems people actually hit in Inscribe, what each one means, and the shortest route to a fix. Ordered by how often they come up.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

If you have paid and something is wrong, go straight to
[recovery routes](/docs-inscribe/manage/recovery/). This page is the wider list.

**The rule that applies to most of these: do not pay again.**

## Payment and orders

### I paid but it still says awaiting payment

Wait two minutes. The commit address is checked every ten seconds and an unconfirmed
payment is enough, so a payment that is genuinely there usually appears quickly.

Then check on an explorer that your payment went to the commit address the order gave you.
A payment to a different address is a different problem.

[Full steps](/docs-inscribe/manage/recovery/#payment-not-detected).

### I sent less than the quote

Top the same commit address up to the quoted amount. The flow resumes on its own. Nothing
is cancelled.

### I sent more than the quote

The surplus comes back automatically in the reveal transaction, provided it is big enough
to cover the extra bytes and still clear the dust threshold. If it is not, it is added to
your inscription output, where you still own it.

### My transaction is not confirming

The fee rate was too low for conditions. Two tools:

- **Fix My Payment** at `/fix-payment`, when the stuck transaction is your payment to a
  commit address.
- **Bump Stuck TX**, for any transaction of yours, comparing RBF against CPFP.

Neither charges a service fee.

### The hour ran out

That hour is the life of the price quote, not the order. If you have not paid, start a fresh
order at a current price. If you have paid, do not pay again: the address keeps being
checked and a late payment is still found.

### I closed the tab and cannot find my order

Go to Home. Orders this browser started are listed under "Orders you started in this
browser". Opening one asks your wallet to prove it owns the order.

[The four routes back](/docs-inscribe/manage/recovery/#you-lost-the-order).

### It has said "in progress" for a long time after confirming

That is correct behaviour, not a stall. Inscribe waits for the indexer and your wallet to
agree the asset exists before it calls an order done.

If the indexer is behind, the service status panel says so and gives you the height it has
reached against the chain tip.

## Money and fees

### Normal and Fast show the same price

Expected. Either blocks have room, or the protocol rounds to whole satoshis, or a protocol
minimum lifted both. Two prices that are the same number are the same purchase, and the app
says so on both tiers rather than selling one as faster.

### It says "Cached fees"

The rate source is not answering, so the number in front of you is not fresh. It is shown as
stale rather than presented as live. Wait for it to recover before committing to a rate that
matters.

### The total is more than I expected

Check which of the three lines grew. The network fee scales with the size of what you are
inscribing; the service fee is flat; the inscription output is not a fee at all and stays
yours.

[Read a quote](/docs-inscribe/concepts/what-it-costs/).

### Inscribe says I do not have enough bitcoin, but I do

Outputs holding assets were held back from fee funding. The message tells you how many
outputs were withheld and how many satoshis they hold.

Send plain bitcoin to your payment address, or lower the fee rate.

## Assets and wallets

### My portfolio looks empty or incomplete

Check the header. If it reads **Partial**, at least one source did not answer, and the page
names which one. Nothing you own has changed.

"No assets found for this address" appears only when every source answered.

### My wallet will not stay connected

If you use UniSat, sessions are dropped rather than revived when the extension cannot
confirm a live active account. Reconnect. This is deliberate: you never act against an
address the wallet has not just confirmed.

### A flow behaves oddly with Wizz

Wizz exposes a single active address. A flow that needs two distinct addresses behaves
differently, and Inscribe does not invent a second address to fill the gap.

### I got a warning that my address holds assets

Your wallet, not Inscribe, chooses which outputs pay for a wallet send. The warning lists
what is at risk and then lets you proceed.

Pay from an address holding only bitcoin, or pick the inputs yourself in your wallet before
approving.

## The app itself

### The screen I clicked will not open

A release landed while your tab was open, or your connection dropped. Both produce the same
failure and the same fix.

**Reload.** Nothing you started is lost. Your orders are listed on Home and your wallet
reconnects.

### A workspace is visible but refuses to act

Its release gate is off in this deployment. It is not a fault you can clear, and the
workspace stays visible on purpose so a switched-off feature does not look like a feature
that never existed.

[Which workspaces are gated](/docs-inscribe/start/status/).

### I got a 404 on Recover Sats or the Dogecoin BlockPad

Those are the only two surfaces that return the 404 page when their feature is switched off,
rather than loading and refusing. A 404 there is a switched-off feature, not a broken link.

### Text is too small, or contrast is poor

Settings carries display controls: High contrast, Large text, Reduced motion, Density,
Enhanced focus rings, Screenshot safe, and Colour-blind safe.

[Accessibility](/docs-inscribe/about/accessibility/).

## Things that are not problems

| What you see | Why it is fine |
| --- | --- |
| "Creation in progress" after confirmation | Inscribe waits for indexer and wallet evidence |
| Two fee tiers at the same price | They are the same purchase |
| An order with no age on Home | It predates the list, and says so rather than showing a wrong age |
| A workspace showing Degraded | Reads still work; the page names what is missing |
| An output marked Unclassified | Recognised as present but not placeable. Shown rather than dropped |

## Still stuck

[Open an issue](https://github.com/bitcoinuniverseio/docs-inscribe/issues). Say what you
were doing, what you expected, and what you saw. If it is an accessibility barrier, say what
you browse with; that is more useful than a rule number.

## Related

- [Recovery routes](/docs-inscribe/manage/recovery/)
- [Failure states](/docs-inscribe/troubleshooting/failure-states/)
- [Before you spend anything](/docs-inscribe/start/before-you-spend/)
