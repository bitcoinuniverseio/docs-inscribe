# Asset safety

Inscribe will not pay a fee with an output that holds your assets.

## Why this matters

Bitcoin spends an output whole. An output holding an inscription, a Rune balance
or a token balance looks the same as ordinary bitcoin to software that only
checks the amount. If a tool picks that output to cover a network fee, the asset
goes with it, and there is no way back.

This is not a rare edge case. Trust Wallet dropped inscription support in March
2026 and warned its users that bitcoin sent from an address holding inscribed
outputs could spend those outputs by accident.

## What Inscribe does

Every Inscribe flow that chooses funding outputs for you asks the Universe asset
index what each output holds before it picks anything.

- An output the index reports as holding an inscription, a Rune balance or a
  token balance is never used to pay a fee.
- An output the index confirms is plain bitcoin is used first.
- An output the index cannot classify is used only after the confirmed ones.

This covers ChainBloom, Drop transfers, OP_DROP funding and settlement, OP_DROP
ownership proofs, Patina commits, and inscription transfers.

Nothing here stops you from spending an asset-bearing output on purpose. It
stops Inscribe from doing it on your behalf.

## When funding is short

If Inscribe holds outputs back and the remaining balance cannot cover the
action, it tells you how many outputs were held back, how many sats they hold,
and why. You are never told to add bitcoin you already have.

To free the balance, send plain bitcoin to the address, or lower the fee rate.

## Choosing outputs yourself

Two surfaces let you pick outputs directly and show the asset report for each
one before you sign:

- **Split UTXO** shows a full asset preflight report per output.
- **Custom transaction** lists your outputs with their asset classification.

## What Inscribe does not claim

Inscribe reports what the Universe asset index knows. Where the index has no
answer for an output, Inscribe says so rather than calling the output safe.
Coverage improves as the index does, and the flows above use confirmed outputs
ahead of unconfirmed ones automatically.

When you send bitcoin through your wallet's own send screen, your wallet chooses
the outputs, not Inscribe. Inscribe shows a warning where it can see a risk, but
it cannot change that selection.

### The warning before a wallet payment

Immediately before your wallet opens, Inscribe scans the address the payment
will come from and lists any outputs that hold assets:

> **The address you are paying from holds assets.** Your wallet chooses which
> outputs pay for this. If it spends one of these, the asset it carries goes
> with it, and Inscribe cannot bring it back. Pay from an address that holds
> only bitcoin, or pick the inputs yourself in your wallet before you approve.

It lists the outpoint and what each output carries. It does not stop you. The
wallet owns the selection, you may have a good reason to pay from that address,
and an app that blocked you would be wrong more often than it was right.

Only outputs the index positively identified appear. An output with an
incomplete, stale, or out-of-network scan is not listed, and is also never
picked automatically by the flows above.

## A note on addresses

![One wallet, two addresses. A payment address holds spendable bitcoin and pays
fees. An Ordinals address holds inscriptions, rune balances and token balances.
Inscribe reads both, signs from whichever holds what it moves, and never adds
the two together.](assets/two-addresses.svg)

An Ordinals wallet keeps two addresses: a payment address for spendable bitcoin
and a Taproot Ordinals address for inscriptions, Runes and token balances.
Inscribe reads both when it shows your holdings, and a transfer is signed from
the address that actually holds the balance you are sending.

The bitcoin balance card still reports the payment address on its own. Sats sitting
at an Ordinals address are not spendable from there, and adding them together
would tell you that you can spend money you cannot.
