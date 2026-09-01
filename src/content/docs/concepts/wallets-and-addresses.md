---
title: Wallets and the two addresses
description: Why an Ordinals wallet keeps a payment address and an Ordinals address, what each one is for, how Inscribe keeps them apart, and which wallets it connects to.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

The single most useful thing to understand before you spend anything: your wallet almost
certainly has two Bitcoin addresses, and they do different jobs.

## One wallet, two addresses

<figure class="diagram" tabindex="0" role="group" aria-labelledby="addr-fig-cap">
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="addr-t addr-d">
  <title id="addr-t">A payment address and an Ordinals address, and what each holds</title>
  <desc id="addr-d">One wallet contains two addresses. The payment address holds spendable bitcoin and is what pays network fees and funds orders. The Ordinals address is a Taproot address that holds inscriptions, rune balances and token balances. Inscribe reads both, signs each action from the address that holds what it moves, and never adds the two balances together, because satoshis sitting at an Ordinals address are not spendable money.</desc>

  <text x="0" y="18" font-size="17" font-weight="700" fill="var(--d-ink)">One wallet. Two addresses. Two jobs.</text>

  <rect x="0" y="40" width="800" height="46" rx="6" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <text x="400" y="69" text-anchor="middle" font-size="14" font-weight="700" fill="var(--d-ink)">Your wallet</text>

  <path d="M240 86 V 108 H 160 V 128" stroke="var(--d-rule)" stroke-width="1.5" fill="none"/>
  <path d="M560 86 V 108 H 640 V 128" stroke="var(--d-rule)" stroke-width="1.5" fill="none"/>

  <!-- Payment -->
  <rect x="0" y="128" width="380" height="196" rx="6" fill="var(--d-panel)" stroke="var(--d-accent-fill)" stroke-width="2"/>
  <rect x="0" y="128" width="380" height="6" fill="var(--d-accent-fill)"/>
  <text x="20" y="160" font-size="15" font-weight="700" fill="var(--d-accent)">Payment address</text>
  <text x="20" y="182" font-size="12" font-family="monospace" fill="var(--d-muted)">often starts bc1q or 3</text>
  <text x="20" y="212" font-size="13" font-weight="700" fill="var(--d-ink)">Holds spendable bitcoin.</text>
  <text x="20" y="236" font-size="12.5" fill="var(--d-muted)">This is the balance you can actually spend.</text>
  <text x="20" y="256" font-size="12.5" fill="var(--d-muted)">It pays network fees and funds orders.</text>
  <text x="20" y="286" font-size="12" font-weight="700" fill="var(--d-muted)">USED FOR</text>
  <text x="20" y="306" font-size="12.5" fill="var(--d-ink)">Paying the commit address. Covering fees.</text>

  <!-- Ordinals -->
  <rect x="420" y="128" width="380" height="196" rx="6" fill="var(--d-panel)" stroke="var(--d-ok)" stroke-width="2"/>
  <rect x="420" y="128" width="380" height="6" fill="var(--d-ok)"/>
  <text x="440" y="160" font-size="15" font-weight="700" fill="var(--d-ok)">Ordinals address</text>
  <text x="440" y="182" font-size="12" font-family="monospace" fill="var(--d-muted)">Taproot, starts bc1p</text>
  <text x="440" y="212" font-size="13" font-weight="700" fill="var(--d-ink)">Holds what you made and own.</text>
  <text x="440" y="236" font-size="12.5" fill="var(--d-muted)">Inscriptions, rune balances, token balances.</text>
  <text x="440" y="256" font-size="12.5" fill="var(--d-muted)">Its satoshis are carrying assets.</text>
  <text x="440" y="286" font-size="12" font-weight="700" fill="var(--d-muted)">USED FOR</text>
  <text x="440" y="306" font-size="12.5" fill="var(--d-ink)">Receiving assets. Signing transfers of them.</text>

  <rect x="0" y="342" width="800" height="52" rx="6" fill="var(--d-panel)" stroke="var(--d-rule)" stroke-width="1.5"/>
  <text x="400" y="366" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--d-ink)">The two balances are never added together.</text>
  <text x="400" y="385" text-anchor="middle" font-size="12.5" fill="var(--d-muted)">Adding them would tell you that you can spend money you cannot.</text>
</svg>
<figcaption id="addr-fig-cap">
Inscribe reads both addresses when it shows your holdings, and signs each action from the
address that actually holds what it moves.
</figcaption>
</figure>

An Ordinals wallet keeps a payment address for spendable bitcoin and a Taproot Ordinals
address for inscriptions, Runes and token balances. Inscribe reads both, keeps them apart,
and signs each action from the address that actually holds what it moves.

The bitcoin balance card reports the payment address on its own. Satoshis sitting at an
Ordinals address are carrying assets and are not spendable from there, so adding the two
figures together would tell you that you can spend money you cannot.

There is one rule the product holds itself to, and it is worth knowing as a reader:

> Payment addresses fund orders. Destination and recipient addresses receive assets. A
> wallet adapter must not silently substitute one for the other.

## Which address does what

| Question | Answer |
| --- | --- |
| Which address pays for an order? | The payment address |
| Which address receives the inscription? | The Ordinals address, or whatever destination you name |
| Which address pays a network fee? | The payment address, funded only from screened plain-bitcoin outputs |
| Which address signs a transfer of an inscription? | The one holding it, which is the Ordinals address |
| Which balance is "my bitcoin"? | The payment address balance |

## Supported wallets

Inscribe connects to five wallets. All five are production integrations.

| Wallet | What it covers | Address model |
| --- | --- | --- |
| Universe | The Bitcoin Universe wallet | Payment and Ordinals addresses |
| UniSat | Ordinals, BRC-20, Runes | Payment and Taproot addresses |
| Xverse | Ordinals, Stamps, Runes | Payment and Ordinals addresses, declared explicitly |
| OKX | Multi-chain | Payment and Ordinals where the provider exposes them |
| Wizz | Bitcoin, Ordinals, Atomicals and Runes | One active address, see below |

Two limitations are worth reading before you pick one:

- **Wizz exposes a single active address.** Inscribe does not invent a second one to fill
  the gap, so a flow that genuinely needs two distinct addresses behaves differently here.
  Mobile support varies by Wizz version, and an optional operation the installed version
  does not support fails rather than silently doing something else.
- **UniSat sessions are not revived from memory.** If the extension cannot confirm a live
  active account, Inscribe drops the session rather than trusting a stored address. You
  reconnect; you never act against an address the wallet has not just confirmed.

If Universe Wallet is not installed, its install action and the `/wallet` shortcut open
the reviewed browser-store listing.

The wallet chooser keeps network, retry and diagnostic controls under **Connection
options**, so the first choice stays focused on picking a wallet.

## How Inscribe tells the two apart

By address form. A Taproot address, one starting `bc1p` on mainnet, is treated as the
Ordinals address, because that is where inscriptions live. When a wallet exposes only one
address, that address is used for both jobs, and Inscribe does not pretend otherwise.

When it looks up what you hold, it checks Taproot addresses first for the same reason.

## You do not need a wallet to look

Connecting is required only for actions needing a signature. Without a wallet you can:

- browse every workspace and read live protocol data;
- price an action in full, including the fee tiers;
- paste any address into **Explore** and see everything it holds;
- track addresses in **Watchlist** without connecting them.

## What Inscribe cannot control

When you send bitcoin from your wallet's own send screen, your wallet chooses which
outputs to spend, not Inscribe. Inscribe warns where it can see a risk, but it cannot
change that selection. Read [asset safety](/docs-inscribe/concepts/asset-safety/) for what
that warning says and when it appears.

## Related

- [Asset safety](/docs-inscribe/concepts/asset-safety/)
- [Wallet matrix](/docs-inscribe/reference/wallets/)
- [Your first inscription](/docs-inscribe/start/first-inscription/)
