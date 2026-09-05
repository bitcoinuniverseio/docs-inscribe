# Universe Inscribe documentation

[Universe Inscribe](https://inscribe.bitcoinuniverse.io) is one workspace for creating, minting, managing, and recovering Bitcoin-native assets, from a first inscription to advanced transaction construction.

**[Open Inscribe](https://inscribe.bitcoinuniverse.io)**, find your way around with [where things live](workspaces.md), or start with [what the app shows you and when](protocol-data-status.md).

## What you can do

- Create inscriptions from text or files, single or in batches, with the full cost laid out for review before you sign. Read [what a transaction costs](what-it-costs.md).
- Work across protocol workspaces: Ordinals, BRC-20, Runes, Stamps, SRC-20, SRC-101, Atomicals, ARC-20, Alkanes, TAP, Drops, OP_DROP, BLOCK20, DUST20, Mezcal, and OP_RETURN.
- See everything an address holds in one portfolio that separates spendable bitcoin from asset-bearing sats.
- Build, split, and repair transactions with per-output asset classification before you sign.
- Recover sats locked in inscription padding and return to orders your browser started, even after closing the tab.

You do not need to connect a wallet to explore the app, read live protocol data, or understand what anything costs. A wallet is asked for only when an action needs a signature.

## Why you can trust it

- **Your assets are not fee fuel.** No Inscribe flow will pick an output holding an inscription, Rune, or token balance to pay a network fee. Read [asset safety](asset-safety.md).
- **A source being down is never shown as an empty wallet.** Every read names its source, and the app tells you which source did not answer instead of showing you nothing. Read [protocol data status and recovery](protocol-data-status.md).
- **Universe-operated infrastructure.** Blockchain reads come from Universe-owned nodes and indexes, not public third-party APIs, so the data path is accountable end to end.
- **Verifiable releases.** Every production release is built from an exact commit with recorded evidence, and the footer of every page names the build you are looking at. Read [release evidence](release-evidence.md).

## Wallets and addresses

Inscribe connects to UniSat, Xverse, OKX, Wizz, and the Bitcoin Universe wallet. If Universe Wallet is not installed, its install action and the `/wallet` shortcut open the reviewed browser-store listing. The chooser keeps network, retry, and diagnostic controls under **Connection options** so the initial choice stays focused on wallet selection. An Ordinals wallet keeps two addresses with different jobs: a payment address for spendable bitcoin and an Ordinals address for inscriptions and token balances. Inscribe reads both, keeps them apart, and signs each action from the address that actually holds what it moves. The [asset safety](asset-safety.md) page explains why the two balances are never added together.

## When something fails

- A protocol index that is down or catching up is named, with its height against the chain tip and what still works, in the service status panel. See [protocol data status and recovery](protocol-data-status.md).
- An order interrupted by a closed tab appears again on Home in the order list this browser keeps. Nothing sensitive is stored: an order id, its workflow, and when it was recorded, never a key, address, or balance.
- Sats locked in inscription padding can be recovered from the Recover Sats tool, which validates the chain and mempool state before calling anything recoverable.

## Guides

| Page | What it covers |
| --- | --- |
| [Where things live](workspaces.md) | Every workspace, what it is for, and the three fastest ways to reach one |
| [What a transaction costs](what-it-costs.md) | The network fee, the service fee, the inscription output, and how a fee tier is chosen |
| [Asset safety](asset-safety.md) | How funding outputs are chosen, and why asset-bearing outputs are protected |
| [Protocol data status and recovery](protocol-data-status.md) | Source health states, the status panel, portfolio source truth, order continuity |
| [Performance and media](performance-and-media.md) | How the app loads fast and renders inscription media from Universe infrastructure |
| [Release evidence](release-evidence.md) | How releases are built, sealed, and verified |
| [Candidate workspace repairs](candidate-repair-status.md) | Local repair status, result meanings, and integration checks still outstanding; not a deployed release |
| [Social previews](social-previews.md) | Route-aware link previews, and what is never published in them |
| [Accessibility](accessibility.md) | Contrast, themes, display controls, and what every release is checked against |
| [Inscribe Control Center](admin-control-center.md) | The restricted operations surface |

## Support

Found a problem or missing answer? [Open an issue](https://github.com/bitcoinuniverseio/docs-inscribe/issues) on this repository. Wallet-aware and private workspaces never publish balances, addresses, draft transactions, or account state in link previews or anywhere else.
