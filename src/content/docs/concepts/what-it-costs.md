---
title: What a transaction costs
description: The three amounts in an Inscribe quote, what each satoshi buys, how a fee rate is chosen, and why only two of the three lines are fees.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

Every Inscribe action that writes to Bitcoin shows its full cost before your wallet
opens. Nothing is signed or paid until you approve the amounts on the confirmation
screen.

This page explains the numbers on that screen.

## The three parts of a total

<figure class="diagram" tabindex="0" aria-labelledby="quote-fig-cap">
<svg viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="quote-t quote-d">
  <title id="quote-t">What each satoshi in an Inscribe quote pays for</title>
  <desc id="quote-d">A worked example of a 3,546 satoshi total, split into three parts. The network fee of 1,500 satoshis goes to miners and is the fee rate times the transaction size. The service fee of 1,500 satoshis is a flat charge for the order. The inscription output of 546 satoshis is not a fee: it is the satoshi your inscription sits on, and it stays in your wallet. Only the first two parts are fees. All three are paid as one amount to one address.</desc>
  <text x="0" y="18" font-size="17" font-weight="700" fill="var(--d-ink)">A worked example: a small inscription at 10 sat/vB</text>
  <text x="0" y="40" font-size="13" fill="var(--d-muted)">A reveal transaction of about 150 virtual bytes. Your numbers scale with size and rate.</text>
  <rect x="0" y="66" width="330" height="58" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <rect x="330" y="66" width="330" height="58" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <rect x="660" y="66" width="120" height="58" fill="var(--d-panel)" stroke="var(--d-ok)" stroke-width="2"/>
  <rect x="0" y="66" width="330" height="6" fill="var(--d-accent-fill)"/>
  <rect x="330" y="66" width="330" height="6" fill="var(--d-accent-fill)"/>
  <rect x="660" y="66" width="120" height="6" fill="var(--d-ok)"/>
  <text x="165" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="var(--d-ink)" font-family="monospace">1,500 sats</text>
  <text x="495" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="var(--d-ink)" font-family="monospace">1,500 sats</text>
  <text x="720" y="102" text-anchor="middle" font-size="15" font-weight="700" fill="var(--d-ink)" font-family="monospace">546</text>
  <text x="165" y="118" text-anchor="middle" font-size="11" fill="var(--d-muted)">42 percent</text>
  <text x="495" y="118" text-anchor="middle" font-size="11" fill="var(--d-muted)">42 percent</text>
  <text x="720" y="118" text-anchor="middle" font-size="11" fill="var(--d-muted)">16 percent</text>
  <g stroke="var(--d-rule)" stroke-width="1.5" fill="none">
    <path d="M165 124 V 150"/>
    <path d="M495 124 V 150"/>
    <path d="M720 124 V 150"/>
  </g>
  <text x="0" y="170" font-size="14" font-weight="700" fill="var(--d-accent)">Network fee</text>
  <text x="0" y="190" font-size="12.5" fill="var(--d-ink)">Paid to miners.</text>
  <text x="0" y="207" font-size="12.5" fill="var(--d-muted)">Your fee rate times the size of</text>
  <text x="0" y="223" font-size="12.5" fill="var(--d-muted)">the transaction. A larger file</text>
  <text x="0" y="239" font-size="12.5" fill="var(--d-muted)">costs more because it is bigger,</text>
  <text x="0" y="255" font-size="12.5" fill="var(--d-muted)">not because Inscribe charges</text>
  <text x="0" y="271" font-size="12.5" fill="var(--d-muted)">more for it.</text>
  <text x="330" y="170" font-size="14" font-weight="700" fill="var(--d-accent)">Service fee</text>
  <text x="330" y="190" font-size="12.5" fill="var(--d-ink)">Paid to Universe.</text>
  <text x="330" y="207" font-size="12.5" fill="var(--d-muted)">A flat 1,500 sats for most</text>
  <text x="330" y="223" font-size="12.5" fill="var(--d-muted)">actions, charged once per order.</text>
  <text x="330" y="239" font-size="12.5" fill="var(--d-muted)">Some flows differ and say so.</text>
  <text x="330" y="255" font-size="12.5" fill="var(--d-muted)">Fee-bump and asset recovery</text>
  <text x="330" y="271" font-size="12.5" fill="var(--d-muted)">charge nothing.</text>
  <text x="660" y="170" font-size="14" font-weight="700" fill="var(--d-ok)">Inscription output</text>
  <text x="660" y="190" font-size="12.5" fill="var(--d-ink)">Stays yours.</text>
  <text x="660" y="207" font-size="12.5" fill="var(--d-muted)">Your inscription lives</text>
  <text x="660" y="223" font-size="12.5" fill="var(--d-muted)">on a satoshi, and that</text>
  <text x="660" y="239" font-size="12.5" fill="var(--d-muted)">satoshi needs an output</text>
  <text x="660" y="255" font-size="12.5" fill="var(--d-muted)">of its own. You own it</text>
  <text x="660" y="271" font-size="12.5" fill="var(--d-muted)">after it confirms.</text>
  <path d="M0 300 H 655" stroke="var(--d-accent-fill)" stroke-width="3"/>
  <path d="M665 300 H 780" stroke="var(--d-ok)" stroke-width="3"/>
  <text x="327" y="322" text-anchor="middle" font-size="13" font-weight="700" fill="var(--d-accent)">These two are fees. They are spent.</text>
  <text x="722" y="322" text-anchor="middle" font-size="13" font-weight="700" fill="var(--d-ok)">Not a fee.</text>
  <rect x="0" y="346" width="780" height="62" rx="6" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <text x="18" y="372" font-size="12" font-weight="700" fill="var(--d-muted)">TOTAL YOU PAY</text>
  <text x="18" y="394" font-size="12.5" fill="var(--d-muted)">One amount, to one address the order gives you.</text>
  <text x="762" y="386" text-anchor="end" font-size="24" font-weight="700" font-family="monospace" fill="var(--d-accent)">3,546 sats</text>
</svg>
<figcaption id="quote-fig-cap">
A quote has three lines and one total. Two of the lines are fees and are gone once the
transaction confirms. The third is the satoshi your inscription sits on, and it stays in
your wallet.
</figcaption>
</figure>

**Network fee.** What miners are paid to include your transaction. It is the fee rate you
pick, in satoshis per virtual byte, times the size of the transaction. A larger
inscription costs more because it is bigger, not because Inscribe charges more for it.

**Service fee.** A flat 1,500 satoshis for most actions, charged once per order rather
than per item. Some flows differ and say so on the confirmation screen: an `op_names`
batch pays the flat fee once per name, and Mezcal quotes its own amount. Splitting a batch
across separate outputs charges the fee per output rather than once. Fixing a stuck
payment and recovering padding sats charge no service fee at all.

**The inscription output.** Your inscription lives on a satoshi, and that satoshi has to
sit in an output of its own. The default is 546 satoshis, and 330 is offered as the
smaller standard size. This is not a fee. It stays with your inscription, and you still
own it.

The confirmation screen lists these separately and then adds them up. On screen the labels
read **Network Gas Fee**, **Mint UTXO Value** where the protocol carries an output,
**Service Fee**, and **Total Cost**.

<div class="receipt">
<p class="receipt-title">A quote, as the confirmation screen itemises it</p>
<table>
<thead>
<tr><th scope="col">Line</th><th scope="col">Goes to</th><th scope="col" class="figure">Example</th></tr>
</thead>
<tbody>
<tr>
<th scope="row">Network Gas Fee<span class="note">Fee rate times transaction size</span></th>
<td>Miners</td>
<td class="figure">1,500</td>
</tr>
<tr>
<th scope="row">Service Fee<span class="note">Flat, once per order</span></th>
<td>Universe</td>
<td class="figure">1,500</td>
</tr>
<tr class="not-a-fee">
<th scope="row">Mint UTXO Value<span class="note">The satoshi your inscription sits on</span></th>
<td>You</td>
<td class="figure">546</td>
</tr>
</tbody>
<tfoot>
<tr><td>Total Cost</td><td></td><td class="figure">3,546 sats</td></tr>
</tfoot>
</table>
</div>

The example is a small inscription at 10 sat/vB. Your own network fee moves with the size
of what you are inscribing and the rate you choose. The other two lines do not.

## How big is the transaction?

The size is decided by what you are inscribing, not by a setting. Inscribe estimates it
from the actual script it is about to build, so the figure on screen describes a real
transaction rather than a flat guess.

Two things worth knowing:

- **Inscribing a child under a parent adds about 101 virtual bytes**, because the parent
  output has to be spent and returned.
- **The service fee output costs bytes too.** It is a real output on the transaction, so
  you pay a little network fee for carrying it. That is already inside the total.

The figure shown before you create the order is a preview. The order the backend builds
carries the authoritative price, and that is the amount the payment screen asks for.

## Choosing a fee rate

Inscribe offers three tiers, quoted from Universe's own Bitcoin infrastructure and
refreshed every 30 seconds.

| Tier | What it targets |
| --- | --- |
| Normal | A place in the blocks mined over roughly the next half hour |
| Fast | A place in the next block, roughly ten minutes |
| Custom | Any rate you type |

Normal is selected when you arrive, and it is the tier marked Recommended. The default is
never the more expensive option.

The wait shown on each tier is the wait its rate has earned, not a label fixed in advance.
Bitcoin block times are random, so these are averages rather than promises.

Rates are accepted between 0.1 and 10,000 sat/vB. Some protocols raise that floor or round
to whole satoshis, and the fee control uses the protocol's own minimum where it has one.

### When Normal and Fast cost the same

Blocks are not always full. When there is room in the next block, the rate that gets you
into it is the same rate that would have got you in within half an hour, and both tiers
quote the same number.

Inscribe says so, on both tiers, rather than printing a shorter wait next to the
higher-sounding option:

> Blocks have room right now, so Normal costs the same as Fast and confirms just as soon.

Two prices that are the same number are the same purchase. Paying more for one of them
would buy nothing, so the screen does not offer it as if it would.

Some protocols round fee rates up to whole satoshis or apply a higher relay floor. That
can also land both tiers on one rate, and the same note appears for the same reason.

### Rates below 1 sat/vB

The **Sub 1** control accepts rates under one satoshi per virtual byte. These are real
rates that real miners sometimes accept, and they can take a long time or never confirm.
The control is marked Beta, shows the exact rate you have chosen, and never becomes the
default.

## Choosing the output size

The satoshi your inscription sits on defaults to 546. You can lower it to 330, or type a
value of your own.

330 is not an arbitrary floor. Bitcoin relays refuse outputs below a dust threshold that
depends on the address type, and for the Taproot and P2WSH addresses inscriptions use,
that threshold is 330 satoshis. An order asking for less falls back to the computed dust
limit rather than building a transaction the network would reject.

| Address type | Dust threshold |
| --- | --- |
| P2WPKH | 294 sats |
| P2WSH and Taproot | 330 sats |
| Legacy or unrecognised | 546 sats, used as a safe fallback |

Lowering the output saves 216 satoshis and makes that output harder to move later, because
a smaller output leaves less room to pay a fee out of it. That is why 546 is the default.

## Why the cost is shown first

An inscription is not reversible. Once a transaction is signed and broadcast, the fee is
spent whether or not the result is what you wanted. Showing the amounts before the wallet
opens is the only point at which the choice is still yours.

The same rule shapes the rest of the flow:

- The content preview shows exactly what will be inscribed, before payment.
- The confirmation screen names the receiving address and the operation type.
- No automatic funding flow picks an output holding an inscription, Rune, or token balance
  to pay a fee. Read [asset safety](/docs-inscribe/concepts/asset-safety/).

## If you overpay

Pay more than the quote and the surplus comes back. The reveal transaction adds a third
output sending the extra to the address that funded the order, as long as that surplus is
large enough to survive the extra bytes it costs and still clear the dust threshold. If it
is not, it is added to your inscription output instead, where you still own it.

This matters most for manual payments, where it is easy to send a round number rather than
the exact quote.

## If you underpay

The order is not lost. It stays waiting, records that the payment was below the quote, and
keeps checking. Top the address up to the quoted amount and the flow resumes. Nothing is
cancelled and no key is discarded. See
[recovery routes](/docs-inscribe/manage/recovery/).

## Reading a cost with a screen reader

Each fee tier is a button whose accessible name carries the tier, the rate in satoshis per
virtual byte, and the wait, so the price is available without reading the visual card. The
recommended tier says that it is recommended.

## When fee data is unavailable

Fee rates come from Universe-operated Bitcoin infrastructure. If that source stops
answering, the fee control says **Cached fees** instead of counting down to the next
refresh, so you can see that the number in front of you is not fresh. A stale quote is
never presented as a live one.

On networks where a made-up rate would be worse than no rate, Inscribe refuses to quote at
all rather than serve a fallback price. Read
[where the data comes from](/docs-inscribe/concepts/source-freshness/).

## Related

- [The life of an order](/docs-inscribe/concepts/order-lifecycle/), which spends this money
- [Fee tiers](/docs-inscribe/reference/fee-tiers/), as a reference table
- [Asset safety](/docs-inscribe/concepts/asset-safety/), which decides what pays the fee
