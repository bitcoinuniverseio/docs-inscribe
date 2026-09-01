---
title: Transfer an asset
description: Move an inscription, rune or token balance you already hold, which address signs, why TAP transfers take two steps, and how fees are funded without touching your assets.
protocols: [ordinals, brc20, runes, mezcal, stamps, src20, src101, tap, block20, dust20, op_return, op_drop, arc20, atomicals, atomicals_nft, realms, subrealms, drops, bitmap, unat]
operations: [transfer]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Mixed by protocol. Ordinals, BRC-20, Runes, Stamps, SRC-20, SRC-101, TAP and OP-20 transfers are released and ungated
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone moving something they already own to another address.

**Goal.** The asset at its destination, and nothing else spent by accident.

## Where to do it

| What you are moving | Where |
| --- | --- |
| An inscription, or an output you hold | **Send Inscriptions** workspace |
| A token balance | The Transfer form in that protocol workspace |
| Part of a rune balance | The Runes workspace, which can split a balance across outputs |

## Which address signs

The address that actually holds the thing. For inscriptions and token balances that is your
**Ordinals address**, not your payment address. Inscribe works this out and signs from the
right one rather than assuming.

The network fee is funded separately, from plain bitcoin outputs at your payment address.
That separation is the point: sending an inscription pulls in only outputs proved to be
plain bitcoin to cover its fee, so paying to move one asset cannot cost you another.

## Prerequisites

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet |
| Wallet | Universe, UniSat, Xverse, OKX or Wizz, connected to the address holding the asset |
| Funds | Plain bitcoin at your payment address for the network fee |
| Destination | An address that can hold the asset type. For inscriptions, a Taproot address |
| Reversible? | No |

## Safety considerations

- **Check the destination address character by character.** A transfer to a wrong address
  is final. Paste it, do not type it.
- **Send inscriptions to an Ordinals-aware address.** An exchange deposit address is
  usually not one, and an inscription sent to an exchange is usually gone.
- **Do not send an inscription to a wallet that does not understand inscriptions.** That
  wallet may later spend the output as ordinary bitcoin.
- **Two-step protocols are not finished until step two.** TAP is the common case.

## Steps

<ol class="steps">

<li>

**Open the right workspace.**

**Send Inscriptions** for an inscription or an output. The protocol own workspace for a
token balance.

</li>

<li>

**Connect the wallet holding the asset.**

If the asset is at your Ordinals address, that is the account that needs to be active.

</li>

<li>

**Choose what to send, and where.**

Paste the destination. Check it. The confirmation screen names it again, and that is
deliberate.

</li>

<li>

**Review the asset report.**

Where a surface lets you pick outputs, it shows what each one holds before you sign. Read
it. An output carrying something you did not intend to move is the one thing worth catching
here.

</li>

<li>

**Set the fee rate and review the total.**

The fee is funded from plain bitcoin only. If Inscribe holds outputs back and the remainder
cannot cover the fee, it tells you how many outputs were withheld, how many satoshis they
hold, and why, rather than telling you to add bitcoin you already have.

</li>

<li>

**Confirm and sign.**

*Expected wallet screen:* a transaction spending the output holding your asset, with the
asset going to your destination and change returning to you. Check the destination in the
wallet screen, not only in Inscribe.

</li>

<li>

**For TAP, complete the second step.**

TAP transfers are a two-part operation by protocol design: an inscription that authorises
the transfer, then the transfer itself. A TAP transfer that has completed only the first
step has not moved anything.

</li>

<li>

**Verify.**

Confirm on an explorer that the output arrived at the destination, and check the protocol
workspace balance view for token transfers.

</li>

</ol>

## Other protocols with their own shape

- **SRC-20** data lives in 330-satoshi P2WSH outputs, and your wallet signs pre-built
  transactions rather than a simple send.
- **ARC-20** signs directly with your wallet, with no payment-address step.
- **OP_DROP** transfers are funded wallet-only, and both funding and settlement go through
  the asset screening described above.
- **Bitmap and UNAT** are recorded in the registry as transferable, but Inscribe has **no
  creation or transfer workspace** for them. They appear in your portfolio and in the asset
  inventory for an output, and that is all. Move them with a tool that supports them.

## Expected result

The asset at the destination address, your fee paid from plain bitcoin, and nothing else
moved.

## How to verify

1. Any Bitcoin explorer shows the output at the destination address.
2. **Portfolio** no longer lists it under your address, and the protocol balance view
   reflects the change for a token transfer.
3. For a transfer to your own second address, **Explore** on the destination shows it
   arriving without needing a wallet connection.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| Not enough bitcoin for the fee, but your balance looks fine | Asset-bearing outputs were withheld from fee funding | Send plain bitcoin to the payment address, or lower the fee rate |
| The destination is rejected | The address type cannot hold this asset | Use a Taproot address for inscriptions |
| A warning that the paying address holds assets | Your wallet, not Inscribe, chooses the outputs for a wallet send | Pay from an address holding only bitcoin, or pick inputs yourself in the wallet |
| A TAP balance did not move | Only the first of the two steps completed | Complete the second step in the TAP workspace |
| The transfer confirmed but the balance is unchanged | The protocol index has not read that block, or rejected the transfer | Check the service status panel |
| No transfer option for Bitmap or UNAT | Inscribe has no workspace for these | Use another tool |

## Recovery route

There is **no recovery from a transfer to the wrong address**. The transaction did what you
told it to.

Everything else has a route: see [recovery routes](/docs-inscribe/manage/recovery/) for
stuck transactions, and
[advanced transaction tools](/docs-inscribe/manage/advanced-transactions/) for repairing an
output.

## Related

- [Asset safety](/docs-inscribe/concepts/asset-safety/)
- [Wallets and the two addresses](/docs-inscribe/concepts/wallets-and-addresses/)
- [Advanced transaction tools](/docs-inscribe/manage/advanced-transactions/)
