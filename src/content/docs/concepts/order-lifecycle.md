---
title: The life of an order
description: How an Inscribe order goes from a quote to an asset in your wallet, what you sign and when, how payment is detected, and what happens when the hour runs out.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

Most creation flows in Inscribe use two transactions, not one. Knowing which is which
explains almost everything else: why you sign once rather than twice, why the app keeps
saying "in progress" after your transaction confirmed, and why closing the tab does not
lose your money.

## The path, end to end

<figure class="diagram" tabindex="0" aria-labelledby="life-fig-cap">
<svg viewBox="0 0 800 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="life-t life-d">
  <title id="life-t">An Inscribe order from quote to wallet</title>
  <desc id="life-d">
    Six stages in order. First, Inscribe quotes the job and gives you one address to pay.
    Second, you pay that address, which is your only wallet signature for a typical order.
    Third, Universe watches the address and sees the payment, accepting it from the mempool
    without waiting for a confirmation. Fourth, Universe signs and broadcasts the reveal
    transaction using a key held only for this order. Fifth, a miner confirms the reveal.
    Sixth, the indexer and your wallet agree the asset exists, which is the only point
    Inscribe calls the order done. You act only in the first two stages. The status shown is
    Awaiting payment for stages one and two, Creation in progress for stages three to five,
    and Wallet visible at stage six.
  </desc>
  <text x="0" y="18" font-size="17" font-weight="700" fill="var(--d-ink)">Commit and reveal: two transactions, one signature from you</text>
  <line x1="46" y1="120" x2="754" y2="120" stroke="var(--d-rule)" stroke-width="2"/>
  <!-- Stage 1 -->
  <circle cx="46" cy="120" r="17" fill="var(--d-accent-fill)"/>
  <text x="46" y="126" text-anchor="middle" font-size="14" font-weight="700" font-family="monospace" fill="var(--d-accent-ink)">1</text>
  <text x="46" y="66" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--d-ink)">Quote</text>
  <text x="46" y="86" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">One address,</text>
  <text x="46" y="100" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">one amount</text>
  <text x="46" y="160" text-anchor="middle" font-size="11" font-weight="700" fill="var(--d-accent)">YOU</text>
  <!-- Stage 2 -->
  <circle cx="188" cy="120" r="17" fill="var(--d-accent-fill)"/>
  <text x="188" y="126" text-anchor="middle" font-size="14" font-weight="700" font-family="monospace" fill="var(--d-accent-ink)">2</text>
  <text x="188" y="66" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--d-ink)">Pay the commit</text>
  <text x="188" y="86" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">Your wallet opens</text>
  <text x="188" y="100" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">once</text>
  <text x="188" y="160" text-anchor="middle" font-size="11" font-weight="700" fill="var(--d-accent)">YOU SIGN</text>
  <!-- Stage 3 -->
  <circle cx="330" cy="120" r="17" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="2"/>
  <text x="330" y="126" text-anchor="middle" font-size="14" font-weight="700" font-family="monospace" fill="var(--d-ink)">3</text>
  <text x="330" y="66" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--d-ink)">Payment seen</text>
  <text x="330" y="86" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">Checked every</text>
  <text x="330" y="100" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">10 seconds</text>
  <text x="330" y="160" text-anchor="middle" font-size="11" fill="var(--d-muted)">UNIVERSE</text>
  <!-- Stage 4 -->
  <circle cx="472" cy="120" r="17" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="2"/>
  <text x="472" y="126" text-anchor="middle" font-size="14" font-weight="700" font-family="monospace" fill="var(--d-ink)">4</text>
  <text x="472" y="66" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--d-ink)">Reveal sent</text>
  <text x="472" y="86" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">Signed with this</text>
  <text x="472" y="100" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">order's own key</text>
  <text x="472" y="160" text-anchor="middle" font-size="11" fill="var(--d-muted)">UNIVERSE</text>
  <!-- Stage 5 -->
  <circle cx="614" cy="120" r="17" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="2"/>
  <text x="614" y="126" text-anchor="middle" font-size="14" font-weight="700" font-family="monospace" fill="var(--d-ink)">5</text>
  <text x="614" y="66" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--d-ink)">Confirmed</text>
  <text x="614" y="86" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">A miner includes</text>
  <text x="614" y="100" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">the reveal</text>
  <text x="614" y="160" text-anchor="middle" font-size="11" fill="var(--d-muted)">BITCOIN</text>
  <!-- Stage 6 -->
  <circle cx="754" cy="120" r="17" fill="var(--d-ok)"/>
  <text x="754" y="126" text-anchor="middle" font-size="14" font-weight="700" font-family="monospace" fill="var(--d-accent-ink)">6</text>
  <text x="754" y="66" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--d-ok)">Wallet visible</text>
  <text x="754" y="86" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">Indexer and wallet</text>
  <text x="754" y="100" text-anchor="middle" font-size="11.5" fill="var(--d-muted)">both agree</text>
  <text x="754" y="160" text-anchor="middle" font-size="11" fill="var(--d-muted)">PROOF</text>
  <!-- Phase band -->
  <text x="0" y="204" font-size="12" font-weight="700" fill="var(--d-muted)">WHAT THE STATUS SAYS</text>
  <rect x="0" y="216" width="256" height="42" rx="5" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <text x="128" y="242" text-anchor="middle" font-size="13" font-weight="700" fill="var(--d-ink)">Awaiting payment</text>
  <rect x="264" y="216" width="416" height="42" rx="5" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <text x="472" y="236" text-anchor="middle" font-size="13" font-weight="700" fill="var(--d-ink)">Creation in progress</text>
  <text x="472" y="251" text-anchor="middle" font-size="11" fill="var(--d-muted)">waiting for chain, indexer, and wallet evidence</text>
  <rect x="688" y="216" width="112" height="42" rx="5" fill="var(--d-panel)" stroke="var(--d-ok)" stroke-width="2"/>
  <text x="744" y="242" text-anchor="middle" font-size="13" font-weight="700" fill="var(--d-ok)">Wallet visible</text>
  <!-- Notes -->
  <rect x="0" y="286" width="386" height="140" rx="6" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <text x="18" y="310" font-size="12" font-weight="700" fill="var(--d-accent)">CLOSING THE TAB AFTER STAGE 2</text>
  <text x="18" y="332" font-size="12.5" fill="var(--d-muted)">does not lose the order. Stages 3 to 6 run</text>
  <text x="18" y="349" font-size="12.5" fill="var(--d-muted)">on Universe infrastructure whether or not</text>
  <text x="18" y="366" font-size="12.5" fill="var(--d-muted)">your browser is open. Home lists the orders</text>
  <text x="18" y="383" font-size="12.5" fill="var(--d-muted)">this browser started, and reopening one asks</text>
  <text x="18" y="400" font-size="12.5" fill="var(--d-muted)">your wallet to prove it owns the order before</text>
  <text x="18" y="417" font-size="12.5" fill="var(--d-muted)">any payment detail is shown.</text>
  <rect x="402" y="286" width="398" height="140" rx="6" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <text x="420" y="310" font-size="12" font-weight="700" fill="var(--d-accent)">THE HOUR ON THE SCREEN</text>
  <text x="420" y="332" font-size="12.5" fill="var(--d-muted)">is the life of the price, not the life of the</text>
  <text x="420" y="349" font-size="12.5" fill="var(--d-muted)">order. Once it passes, the quote is no longer</text>
  <text x="420" y="366" font-size="12.5" fill="var(--d-muted)">good and you should start a fresh one. A</text>
  <text x="420" y="383" font-size="12.5" fill="var(--d-muted)">payment that arrives late is still detected</text>
  <text x="420" y="400" font-size="12.5" fill="var(--d-muted)">and reconciled rather than discarded, and the</text>
  <text x="420" y="417" font-size="12.5" fill="var(--d-muted)">order's signing key is kept, not erased.</text>
</svg>
<figcaption id="life-fig-cap">
You act in stages 1 and 2. Everything after that happens on Universe infrastructure and
on Bitcoin, and continues whether or not your browser is open.
</figcaption>
</figure>

## Commit and reveal, in plain terms

An inscription cannot be written in one transaction. The content is committed to in the
first transaction and revealed by the second.

1. **Inscribe builds the script** for what you are inscribing and works out how big the
   reveal transaction will be.
2. **It generates a fresh key for this order alone** and derives one address from it, the
   commit address.
3. **You pay that address one amount**, which covers the reveal's network fee, the service
   fee, and the satoshi your inscription will sit on. That payment is the commit
   transaction, and it is yours: your wallet builds it and your wallet signs it.
4. **Universe spends the commit output** in the reveal transaction, which is what actually
   carries your content onto the chain. It signs that with the order's own key, which is
   why you are not asked a second time.

The reveal has your inscription as its first output, the service fee as its second, and a
refund output as a third when you have overpaid.

## What you sign, and how many times

**One signature, for a typical order.** That is the commit payment in stage 2. The reveal
needs no signature from you.

Two flows ask for a second signature, and both have a good reason:

| Flow | Why a second signature |
| --- | --- |
| Parent and child | The reveal has to spend the parent inscription you already own, and only your wallet can authorise that. The order waits for your signature, and the prepared transaction is good for 15 minutes |
| Bring your own satoshi | You fund two addresses, the commit address and a separate address holding the exact satoshi you want inscribed. The reveal waits for both |

For the parent flow there is an extra check worth knowing about: before it accepts your
parent, the server re-derives the parent's output script and refuses it unless it matches
what the chain indexer currently reports for that inscription. A parent that has moved
since you loaded the page is rejected rather than spent.

## How the payment is noticed

Universe watches the commit address rather than waiting for you to tell it anything. A
monitor checks waiting orders **every ten seconds**.

- **An unconfirmed payment is enough.** As soon as the payment is visible in the mempool,
  the reveal can be built and broadcast. A standard single inscription needs **zero
  confirmations** to move forward.
- **The smallest sufficient payment is used.** If several payments land on the address,
  Inscribe prefers one matching the quote exactly, then the smallest one that covers it.
  Taking the largest would swallow an accidental overpayment that belongs to you.

Bulk jobs are different, because they fan a payment out across many addresses first and a
fan-out that gets reorganised would strand the whole job:

| Batch size | Confirmations required before the job proceeds |
| --- | --- |
| Up to 22 items | None. The payment is fanned out directly |
| 23 to 500 items | 1 |
| More than 500 items | 2 |

Batch reveals are also broadcast in chunks of no more than 24, because Bitcoin's mempool
refuses a chain of more than 25 related unconfirmed transactions.

## Why "in progress" outlasts your confirmation

A reveal that confirmed is not the same thing as an asset you can see and use. The
indexer still has to read the block and attribute the inscription, and your wallet still
has to report it.

Inscribe treats broadcast, confirmed and even indexed as **still in progress**, and only
says the order is done when the indexer and your wallet agree the asset exists. The status
line says so in as many words:

> Creation in progress, waiting for chain, indexer, and wallet evidence.

This is deliberate. Claiming success at broadcast would be right most of the time and
wrong in exactly the cases where being wrong costs you the most.

## What the hour means

Most flows quote a price good for **one hour**. The gallery flow quotes for 24 hours.

The on-screen warning asks you to pay within the hour, and you should: after it passes,
the fee rate you were quoted may no longer get your transaction mined, and the right move
is to start a new order at a current price.

What the hour does **not** do is destroy the order:

- The order does not move to a cancelled or expired state. No such state exists for
  inscribe orders.
- The signing key is not erased. A key is only discarded after a confirmed successful
  spend, or after an explicit recovery that hands control somewhere else. It is never
  discarded because a data provider timed out, returned nothing, or hit a retry limit.
- The address keeps being checked, on a slowing schedule, so a payment that arrives late
  is still found.

If you have already paid and the hour has passed, do not pay again. Go to
[recovery routes](/docs-inscribe/manage/recovery/).

## When a broadcast fails

A reveal that fails to broadcast is retried, not abandoned. Before the first network call
is made, the exact signed transaction is written down, so a retry can only ever send the
same transaction rather than a new one. Retries back off from 30 seconds up to a cap.

This is what makes it safe for the system to try again without your involvement: there is
no version of the retry that spends your money twice.

## Related

- [What a transaction costs](/docs-inscribe/concepts/what-it-costs/)
- [Order states](/docs-inscribe/reference/order-states/), every status and what it means
- [Orders you started](/docs-inscribe/manage/pending-orders/), getting back to one
- [Recovery routes](/docs-inscribe/manage/recovery/)
