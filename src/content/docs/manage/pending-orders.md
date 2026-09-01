---
title: Orders you started
description: How Inscribe gets you back to an order after a closed tab or a reload, what the browser remembers, what it deliberately does not, and why the list shows no status.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

An order interrupted by a closed tab is not lost. Home lists the orders this browser
started.

## Why a reload loses access

Access to an order is a secret Inscribe keeps in the browser memory and never writes to
storage.

That is a deliberate trade. Keeping it in memory is what stops another site reading it. The
cost is that a reload lets it go, and the order page then has to ask who you are again.

**An order id proves nothing on its own.** Knowing the id does not grant access, which is
why a list of ids is safe to keep and a status is not.

## What Home remembers

Under "Orders you started in this browser", newest first:

- the workflow, so you can tell one order from another;
- a truncated order reference;
- how long ago this browser recorded it;
- a link to the order;
- a control to forget the entry.

**What it holds:** an order id, its workflow, and the time this browser saw it.

**What it never holds:** the order secret, an address, an amount, a draft transaction, a
transaction id, or anything about your wallet. It is not sent anywhere.

**Bounds:** the 50 most recent orders, and 30 days. An order that finishes drops off on its
own, and you can forget any entry at any time.

## Why there is no status column

Reading an order status requires the secret. The list does not have it, so any status shown
there would be invented.

The list tells you the order exists and how to reach it. The status page, after the
ownership check, tells you where the order stands. That division is the honest one.

## Entries with no time

An order started before this list existed still appears, because its reference was already
in the browser.

Those entries carry no time and **say so**, rather than showing an age that would be wrong.
Stamping them with the moment they were found would report a months-old order as new.

## Getting into an order

Open one and Inscribe asks your wallet to prove it owns the order before showing any
payment detail. It also accepts an encrypted recovery kit if you saved one at creation.

Four routes exist in total, covered in
[recovery routes](/docs-inscribe/manage/recovery/#you-lost-the-order): the order URL, this
list, a recovery kit, and a wallet signature.

## Activity

**Activity** is the fuller view: orders this browser has started, and the recovery tools for
them. It carries a recovery queue that ranks anything needing attention and offers one
action per item.

Unlike Home list, Activity requires a connected wallet to have signed an authorization
before it shows saved orders. That is why Home carries the lighter list: it works when you
have nothing but the browser you paid from.

## When a release lands while your tab is open

Every screen in Inscribe loads as its own file, and a release replaces those files. A tab
open across a release asks for a file that is no longer on the server, and the screen you
clicked does not open.

Inscribe recognises this and says so rather than reporting a crash: a new version was
released, reload to fetch it. A dropped connection produces the same failure and the same
fix, so the message covers both rather than guessing between them.

**Nothing you started is lost by the reload.** The orders this browser recorded are listed
on Home when it comes back, and your wallet reconnects the way it did before. Reopening an
order still asks your wallet to prove ownership, as it does after any reload.

## What keeps running without you

Everything after your payment. Universe watches the commit address, builds and broadcasts
the reveal, and retries a failed broadcast, whether or not your browser is open.

Closing the tab does not cancel a paid order, and there is no way to cancel one by closing
it.

## Related

- [Recovery routes](/docs-inscribe/manage/recovery/)
- [The life of an order](/docs-inscribe/concepts/order-lifecycle/)
- [Order states](/docs-inscribe/reference/order-states/)
