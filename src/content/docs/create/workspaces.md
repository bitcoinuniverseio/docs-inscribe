---
title: 'Workspace map'
description: 'Every Inscribe workspace, what it does, and which ones have in-app guides.'
category: create
lastVerified: 2026-09-01
---
# Where things live

Inscribe has one workspace per job. This page lists all of them, in the order
the sidebar shows them, so you can find the right one without opening each.

If you already know what you want to do, four routes are faster than the
sidebar:

- The search box in the header.
- The **Mint** menu beside it, which lists every workspace that creates
  something, with a line saying what each one does.
- The command palette, `Ctrl` + `K` on Windows and Linux, `Cmd` + `K` on macOS.
- The paste box on Home. Paste an address, a txid, an inscription ID or a
  ticker and Inscribe opens the workspace that handles it.

All four read the same list, so a workspace appears in every one of them or in
none, described the same way.

Most workspaces also have a guide under **Docs & Guides** in the app, with the
exact field names, the diagrams, and worked examples. This page is the map;
those guides are the detail. Seven workspaces have no guide yet: ChainBloom,
Witness Circles, Tandem, Patina, Atomicals NFTs, Atomicals Realms, and the
Stamps protocol tab, though Stamps inscription is covered under Create.

## Workspace

| Workspace | What it is for |
| --- | --- |
| Home | The task picker, then live fees and unfinished work, then the paste box. The full catalogue, the protocol map and the live mempool view sit behind **Browse all workflows** |
| Inscribe | Eight sub-tabs for putting content on Bitcoin: Text, Files, Names, Parent/Child, Delegate, Gallery, Stamps and Data Lab |
| Ord Studio | Full inscription-envelope control: live HTML sandbox, templates, and the ord spec fields (pointer, parent, metadata, gzip, metaprotocol) |
| AVM Studio | Build, test, deploy, call and verify Atomicals AVM contracts, with the academy alongside the editor |
| ChainBloom | Grow a shared world one contribution at a time |
| Witness Circles | Taproot outputs a group authorises together |
| Send Inscriptions | Move inscriptions or UTXOs you already hold |
| Search Txt | Find text inscriptions by their content |

## Account

| Workspace | What it is for |
| --- | --- |
| Portfolio | Everything your connected wallet holds, grouped by protocol |
| Explore | The same view for any address you paste, no wallet needed |
| Watchlist | Track wallets without connecting them |
| Activity | Orders this browser has started, and the recovery tools for them |

## Protocols

Most protocol workspaces share one shape: browse a token list, fill a Deploy,
Mint or Transfer form, then pay through one checkout. Read
[How the protocol tabs work](https://inscribe.bitcoinuniverse.io/docs) in the
app before your first one.

**Ordinals**

| Workspace | What it is for |
| --- | --- |
| brc-20 | Deploy, mint and transfer BRC-20 tokens: JSON text inscriptions. Supports 4-byte, 5-byte self-issuance, and brc2.0 |
| tap | Deploy, mint and transfer TAP tokens, or mint DMT tokens that claim block numbers. TAP transfers take two steps |
| block-20 | Deploy, mint and transfer BLOCK-20 tokens. Each mint embeds the latest block hash, filled in at mint time |

**Atomicals**

| Workspace | What it is for |
| --- | --- |
| arc-20 | Mint, deploy and transfer coloured-sat tokens with direct wallet signing. No payment-address step |
| atomicals nfts | Atomicals non-fungible assets |
| atomicals realms | Names and sub-realms in the Atomicals namespace |

**Stamps**

| Workspace | What it is for |
| --- | --- |
| stamps | Bitcoin Stamps: images encoded straight into the UTXO set, so the data cannot be pruned |
| src-20 | Deploy, mint and transfer SRC-20. Data lives in 330-sat P2WSH outputs; your wallet signs pre-built PSBTs |
| src-101 | Register permanent Bitcoin domain names ending in `.sats` or `.btc`, funded by one signature |

**OP_RETURN family**

| Workspace | What it is for |
| --- | --- |
| op_return inscriptions | Free-form OP_RETURN inscriptions, with an optional file |
| op20 | OP-20 token deploy, mint and transfer, plus OP_Names registration and transfer |

**Drops and OP_DROP**

| Workspace | What it is for |
| --- | --- |
| drops | Browse verified Drops: confirmed data artifacts with stable IDs and on-chain proof. Read-only; creation runs through Inscribe |
| drop pacts | Design and launch Drop Pact agreements, with a resumable tutorial |
| op-drop | Deploy, mint and transfer op-drop tokens. Every operation is a compact JSON inscription, funded wallet-only |

**Collaborative and time**

| Workspace | What it is for |
| --- | --- |
| Tandem | Build and change one object together, with a signed record of each change |
| Patina | How long a value-carrying output has stayed where it is |

**Other protocols**

| Workspace | What it is for |
| --- | --- |
| runes | Mint open Runes, etch your own, or split a rune balance across outputs |
| alkanes | Browse Alkane tokens ranked by live mempool minting, and mint them by ID |
| cat-20 | Explore CAT-20 on Fractal, check balances, and prepare covenant mints. You pick the network yourself |
| tap on doge | Mint TAP tokens indexed on Dogecoin, including Doge DMT blocks. Mint only |
| dust-20 | Deploy and mint DUST-20, where the mint output's sat value encodes the amount |
| mezcal | Mint, etch and transfer Mezcal, which writes JSON OP_RETURN records instead of runestones |

## Market intel

| Workspace | What it is for |
| --- | --- |
| Mempool | What is waiting to confirm, grouped by protocol family and sized by transaction weight |
| Ecosystem | The apps and indexes Universe runs, and whether each answers |
| Ordinal Duels | Head-to-head comparisons between collections |
| Meme Map | Where attention is going across meme assets |
| Pending TX Analyzer | Read one pending transaction in detail |
| Bitcoin Tools | 33 focused tools: decoders, estimators, inspectors, planners |
| Analytics | Longer-range activity across protocols |

## Advanced

Use these when a normal flow will not do what you need. Each one shows the
asset report for an output before you sign it.

| Workspace | What it is for |
| --- | --- |
| Bump Stuck TX | Compare RBF and CPFP for a transaction that is not confirming |
| Advanced TX Builder | Choose inputs and outputs yourself |
| UTXO Split | Split one output into several |
| Asset Recovery | Reclaim sats locked in inscription padding |

## Help

| Workspace | What it is for |
| --- | --- |
| Docs & Guides | 63 in-app guides across getting started, create, protocols, workflows, wallet, intel, safety and troubleshooting |

## What the availability labels mean

A workspace stays visible even when the index behind it is down or catching up.
It says so instead of disappearing, because a missing workspace looks like a
product that never had the feature.

- **Available**: the source answered and is at the chain tip.
- **Degraded**: the source answered but is behind, or one of several sources
  did not answer. Reads still work, and the page names what is missing.
- **Unsupported**: the source is not running for this network. Nothing is
  guessed or filled in from elsewhere.

[Protocol data status and recovery](/reference/protocol-data-status/) explains where
these states come from and what each one blocks.
