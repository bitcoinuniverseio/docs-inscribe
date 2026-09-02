---
title: Before you spend anything
description: The four ways people lose Bitcoin-native assets, what Inscribe does about each, and the two minutes of reading that prevent most of them.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

Everything on this page is about one property of Bitcoin: **a transaction that confirms
cannot be undone.** No support request, no operator, and no part of Inscribe can reverse
one. That is what makes the minutes before you sign the ones that matter.

## 1. Paying a fee with an asset

**How it happens.** Bitcoin spends an output whole. An output holding an inscription or a
token balance looks exactly like ordinary bitcoin to software that only checks the amount.
Pick it to cover a fee and the asset goes with the change.

**What Inscribe does.** No automatic funding flow picks an output holding an inscription,
Rune or token balance. Outputs proven to be plain bitcoin are used first; outputs nothing
could be established about are used only after those; outputs with a detected asset are
not used at all.

**What it cannot do.** When you send from your wallet's own send screen, your wallet picks
the outputs. Inscribe warns you and lists what is at risk, then gets out of the way,
because it cannot change that selection.

**What you do.** Fund orders from an address holding only bitcoin where you can. If you
see the warning before your wallet opens, read it rather than clicking through it.

[Asset safety in full](/docs-inscribe/concepts/asset-safety/).

## 2. Confusing the two addresses

**How it happens.** Your wallet has a payment address for spendable bitcoin and a Taproot
Ordinals address for what you own. Sending an asset to the wrong one, or expecting to
spend the satoshis sitting under your inscriptions, both come from treating them as one
balance.

**What Inscribe does.** It reads both, keeps them apart, never adds the two balances
together, and signs each action from the address that actually holds what it moves.

**What you do.** Check the receiving address on the confirmation screen. It is named
there for this reason.

[Wallets and the two addresses](/docs-inscribe/concepts/wallets-and-addresses/).

## 3. Not reading the total

**How it happens.** A quote has three lines and only two of them are fees. People compare
the wrong number, or assume a bigger file costs the same as a small one.

**What Inscribe does.** It itemises the network fee, the service fee and the inscription
output, totals them, and shows that total before your wallet opens. The wallet is then
asked for exactly that amount.

**What you do.** Compare the amount in your wallet's send screen against the Total Cost
you just read. If they differ, reject it.

[What a transaction costs](/docs-inscribe/concepts/what-it-costs/).

## 4. Paying twice

**How it happens.** A payment does not seem to register, so it gets sent again. Now two
payments exist and only one is the order.

**What Inscribe does.** It watches the commit address every ten seconds and accepts an
unconfirmed payment, so the usual cause is impatience rather than a lost payment. If
several payments land, it uses the one matching the quote, or the smallest that covers it,
specifically so an accidental second payment is not swallowed. Overpayment is returned to
the address that funded the order where it is large enough to send back.

**What you do.** Never pay a second time to fix a first. Go to
[recovery routes](/docs-inscribe/manage/recovery/).

## Three things that are not emergencies

- **The status still says "in progress" after your transaction confirmed.** That is
  correct. Inscribe waits for the indexer and your wallet to agree before it calls an
  order done.
- **You closed the tab.** The work continues without your browser. Home lists the orders
  this browser started.
- **The hour ran out.** That hour is the life of the price quote, not the life of the
  order. Nothing is cancelled and no key is discarded.

## Two things that genuinely need action

- **Your payment is not confirming.** The fee rate is too low for current conditions. Use
  **Fix My Payment** or **Bump Stuck TX**.
- **You sent less than the quote.** Top the same address up to the quoted amount.

## The one thing with no recovery route

A transaction you signed and broadcast that did what you told it to. If you deliberately
spent an asset-bearing output in the Advanced TX Builder, or approved a wallet send from
an address holding assets after being warned, the result is final. The fee is spent and
the asset has moved.

Everything else on this site has a route back. That one does not.

## Related

- [Your first inscription](/docs-inscribe/start/first-inscription/)
- [Recovery routes](/docs-inscribe/manage/recovery/)
- [Common problems](/docs-inscribe/troubleshooting/common-problems/)
