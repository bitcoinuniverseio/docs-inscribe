---
title: 'Order recovery'
description: 'What can interrupt an order, what each state means, and the exact next action for every one of them.'
category: safety
lastVerified: 2026-09-02
---
## Orders are recoverable states, not gambles

An order moves through known stages, and each stage has a documented recovery path. The [Recovery Navigator](/recovery/navigator/) walks you to the right one; this page is the reference behind it.

## The rules that never bend

1. **Never pay twice on a hunch.** An absent result is not a zero. Payment detection catches up after confirmations.
2. **Top up the difference, never repeat the total.** When an order shows an underpayment with a top-up action, pay exactly the displayed difference.
3. **A confirmed transaction is final.** No operator, no support agent, and no service can reverse one.
4. **Never publish a recovery capability.** The encrypted recovery kit stays on your disk. Nobody legitimate will ask for it.
5. **Do not act on stale data.** When the live status page reports a source as stale or unavailable, wait for healthy before paying or repairing.

## The states

- **Unpaid, quote current.** Pay the exact quoted total before the timer ends.
- **Quote expired before payment.** Request a fresh quote. The old amount is invalid.
- **Payment sent, not detected.** Wait one confirmation window and reload the order page. Save the transaction id.
- **Underpayment with a top-up action.** Pay the exact difference the order displays.
- **Underpayment without a repair action.** Stop. Gather evidence and open a support request.
- **Overpayment.** Let the order complete, then follow the refund path with your evidence.
- **Payment stuck unconfirmed.** Bump the fee with replace-by-fee if your wallet supports it, or wait. Do not broadcast a duplicate.
- **Your own transaction stuck.** Use the tx replace workspace to bump it.
- **Reveal failed.** Retry the reveal from the order page. The paid commit still belongs to this order.
- **Order access lost.** Check the browser order list first, then restore the order URL from your encrypted recovery kit.
- **Padding satoshis.** Recover them from the recover-sats workspace with the same wallet and network.
- **Signed to the wrong address.** A confirmed transaction cannot be reversed. If the destination was your own address elsewhere, recover it there. Otherwise the amount is lost, and the pre-sign checklist is the lesson.

## Evidence to keep

For anything you cannot resolve in the app, keep the order URL, the payment transaction id, the quoted and paid amounts, and the order page screenshots. The recovery and support paths all start from that evidence, and none of it is secret: none of it includes your seed phrase, keys, or recovery kit, which should never leave your device.
