---
title: 'What a transaction costs'
description: 'Network fee, service fee, and the output value that stays yours, piece by piece.'
category: create
lastVerified: 2026-09-01
---
# What a transaction costs

Every Inscribe action that writes to Bitcoin shows its full cost before your
wallet opens. Nothing is signed or paid until you approve the amounts on the
confirmation screen.

This page explains the numbers you see there.

## The three parts of a total

**Network fee.** What miners are paid to include your transaction. It is the
fee rate you pick, in satoshis per virtual byte, times the size of the
transaction. A larger inscription costs more because it is bigger, not because
Inscribe charges more for it.

**Service fee.** A flat 1,500 sats for most actions. Some flows differ and say
so on the confirmation screen: an `op_names` batch pays the flat fee once per
name, and Mezcal quotes its own amount. The confirmation screen always shows
the amount that applies to the action in front of you.

**The inscription output.** Your inscription lives on a satoshi, and that
satoshi has to sit in an output of its own. The default is 546 sats, and 330
sats is offered as the smaller standard size. This is not a fee. It stays with
your inscription, and you still own it.

The confirmation screen lists these separately and then adds them up. The total
is the amount your wallet will be asked to spend.

## Choosing a fee rate

Inscribe offers three tiers, quoted from Universe's own Bitcoin infrastructure
and refreshed every 30 seconds.

| Tier | What it targets |
| --- | --- |
| Normal | A place in the blocks mined over roughly the next half hour |
| Fast | A place in the next block, roughly ten minutes |
| Custom | Any whole rate you type |

Normal is selected when you arrive, and it is the tier marked Recommended. The
default is never the more expensive option.

The wait shown on each tier is the wait its rate has earned, not a label fixed
in advance. Bitcoin block times are random, so these are averages rather than
promises.

### When Normal and Fast cost the same

Blocks are not always full. When there is room in the next block, the rate that
gets you into it is the same rate that would have got you in within half an
hour, and both tiers quote the same number.

Inscribe says so, on both tiers, rather than printing a shorter wait next to
the higher-sounding option:

> Blocks have room right now, so Normal costs the same as Fast and confirms
> just as soon.

Two prices that are the same number are the same purchase. Paying more for one
of them would buy nothing, so the screen does not offer it as if it would.

Some protocols round fee rates up to whole satoshis or apply a higher relay
floor. That can also land both tiers on one rate, and the same note appears for
the same reason.

### Rates below 1 sat/vB

The **Sub 1** control accepts rates under one satoshi per virtual byte. These
are real rates that real miners sometimes accept, and they can take a long time
or never confirm. The control is marked Beta, shows the exact rate you have
chosen, and never becomes the default.

## Why the cost is shown first

An inscription is not reversible. Once a transaction is signed and broadcast,
the fee is spent whether or not the result is what you wanted. Showing the
amounts before the wallet opens is the only point at which the choice is still
yours.

The same rule shapes the rest of the flow:

- The content preview shows exactly what will be inscribed, before payment.
- The confirmation screen names the receiving address and the operation type.
- No output holding an inscription, Rune, or token balance is ever picked to
  pay a fee. Read [asset safety](/safety/asset-safety/).

## Reading a cost with a screen reader

Each fee tier is a button whose accessible name carries the tier, the rate in
satoshis per virtual byte, and the wait, so the price is available without
reading the visual card. The recommended tier says that it is recommended.

## When fee data is unavailable

Fee rates come from Universe-operated Bitcoin infrastructure. If that source
stops answering, the fee control says **Cached fees** instead of counting down
to the next refresh, so you can see that the number in front of you is not
fresh. A stale quote is never presented as a live one. Read
[protocol data status and recovery](/reference/protocol-data-status/).
