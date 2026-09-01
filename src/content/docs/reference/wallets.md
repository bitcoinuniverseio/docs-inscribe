---
title: Wallet matrix
description: The five wallets Inscribe connects to, what each supports, their known limitations, and the rule about which address is used for what.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable. All five integrations are production
  lastVerified: 2026-09-01
---

Inscribe connects to five wallets. All five are production integrations, not previews.

## The matrix

| Wallet | Coverage | Addresses exposed | Known limitations |
| --- | --- | --- | --- |
| **Universe** | The Bitcoin Universe wallet | Payment and Ordinals | None recorded |
| **UniSat** | Ordinals, BRC-20, Runes | Payment and Taproot | A session is dropped rather than revived from memory if the extension cannot confirm a live active account |
| **Xverse** | Ordinals, Stamps, Runes | Payment and Ordinals, declared explicitly | None recorded |
| **OKX** | Multi-chain | Payment and Ordinals where the provider exposes them | Address availability depends on what the provider exposes |
| **Wizz** | Bitcoin, Ordinals, Atomicals, Runes | **One active address only** | Mobile support varies by version. An optional operation an installed version does not support fails rather than doing something else |

If Universe Wallet is not installed, its install action and the `/wallet` shortcut open the
reviewed browser-store listing.

## The two limitations worth planning around

**Wizz exposes a single active address.** Inscribe does not invent a second one to fill the
gap. A flow that genuinely needs two distinct addresses, one to pay from and one to receive
at, behaves differently here. If you want the payment and receiving roles separated, use a
wallet that exposes both.

**UniSat sessions are not revived from memory.** If the extension cannot confirm a live
active account, Inscribe drops the session rather than trusting a stored address. You
reconnect. The upside is that you never act against an address the wallet has not just
confirmed.

## How addresses are assigned

By address form. A Taproot address, one starting `bc1p` on mainnet, is treated as the
Ordinals address, because that is where inscriptions live.

When a wallet exposes only one address, that address is used for both jobs, and Inscribe
does not pretend otherwise.

The rule the product holds itself to:

> Payment addresses fund orders. Destination and recipient addresses receive assets. A
> wallet adapter must not silently substitute one for the other.

## How many signatures to expect

| Flow | Signatures |
| --- | --- |
| A typical inscription, deploy, mint or etch | **One.** The payment to the commit address |
| Parent and child | **Two.** The commit payment, then the reveal spending your parent |
| Bring your own satoshi | **Two.** Two addresses funded |
| ARC-20 | A direct transaction to sign, with no payment-address step |
| SRC-20 | Your wallet signs pre-built transactions |
| TAP transfer | Two steps by protocol design |

For the parent flow, the prepared transaction is good for **15 minutes**. If the window
lapses the order asks again rather than losing anything.

## What connecting does and does not do

Connecting shares your addresses. It does not authorise spending.

You do not need to connect at all to browse workspaces, read live protocol data, price an
action, inspect any address in **Explore**, or track addresses in **Watchlist**.

The wallet chooser keeps network, retry and diagnostic controls under **Connection
options**, so the first choice stays focused on picking a wallet.

## What your wallet controls that Inscribe cannot

When you send bitcoin from your wallet own send screen, **your wallet chooses which outputs
to spend**. Inscribe scans the paying address first and lists any outputs holding assets,
then gets out of the way.

It does not block you, because the wallet owns the selection and you may have a good reason.
Read [asset safety](/docs-inscribe/concepts/asset-safety/).

## Related

- [Wallets and the two addresses](/docs-inscribe/concepts/wallets-and-addresses/)
- [Your first inscription](/docs-inscribe/start/first-inscription/)
- [Asset safety](/docs-inscribe/concepts/asset-safety/)
