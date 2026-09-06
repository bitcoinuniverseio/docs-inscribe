---
title: Advanced transaction tools
description: Four tools for when a normal flow will not do what you need, what each is for, and which one deliberately lets you spend an asset.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable. Fee bumping is marked Beta in the app
  lastVerified: 2026-09-01
---

Use these when a normal flow will not do what you need. Each one shows the asset report for
an output before you sign it.

| Tool | What it is for |
| --- | --- |
| **Bump Stuck TX** | Compare RBF and CPFP for a transaction that is not confirming |
| **Advanced TX Builder** | Choose inputs and outputs yourself |
| **UTXO Split** | Split one output into several |
| **Asset Recovery** | Reclaim satoshis locked in inscription padding |

## Read this first

Three of these four screen your outputs and refuse to spend anything carrying an asset.

**One does not.** The Advanced TX Builder will let you spend an output holding an
inscription or a Rune, on purpose, after labelling it. If you do not need that, use a
different tool.

## Bump Stuck TX

A transaction that is broadcast and not confirming, because the fee rate was too low for
conditions at the time.

The workspace compares the two ways out:

| Method | How it works | When it applies |
| --- | --- | --- |
| **RBF**, replace-by-fee | Broadcast a replacement of the same transaction at a higher fee rate | Only if the original signalled that it could be replaced |
| **CPFP**, child-pays-for-parent | Spend an output of the stuck transaction at a rate high enough to make mining both worthwhile | When RBF is not available, or the transaction is not yours to replace |

The tool says which applies to your case rather than making you work it out, and shows the
asset report for every output before you sign.

**It is marked Beta in the app.** It is released and reachable; that label is the product
own assessment.

If the stuck transaction is the payment to an order commit address, use **Fix My Payment**
instead. See [recovery routes](/docs-inscribe/manage/recovery/#the-payment-is-stuck).

## Advanced TX Builder

Choose the inputs and outputs yourself. This exists for people who need a specific satoshi
in a specific position, which is not something an automatic rule can do for you.

**This is the one surface that will spend an asset-bearing output.** It has an
inscription-output picker that labels what it finds, with a badge naming the inscription
number and a badge marking a Rune, and then it lets you proceed.

That is a decision, not a gap. On this screen, where the satoshi ends up is your
responsibility.

Everywhere else, an output the index reports as carrying an asset is never chosen
automatically. See [asset safety](/docs-inscribe/concepts/asset-safety/).

## UTXO Split

Split one output into several.

**Why you would want to.** Bitcoin spends an output whole. One large output means every
payment drags the whole amount through a transaction and hands you change. Several
right-sized outputs let you spend a little without disturbing the rest, and give a fee
funder something to work with that is not your savings.

It is also how you prepare for a busy mint: separate outputs mean separate transactions can
be funded without waiting for each other.

**What it shows you.** A full asset preflight report per output before you sign. It lists
only plain bitcoin outputs large enough to cover the new outputs, the network fee and the
service fee, so an asset-bearing output is not offered as split material.

## Asset Recovery

Reclaim satoshis locked in inscription padding, at `/recover-sats`.

Inscriptions sit on outputs holding satoshis, and some of those can be reclaimed
while keeping the inscription in a protected output. A candidate still needs a
valid plan backed by the required asset indexes and protocol rules. A detected
label alone does not establish safe recovery.

**Asset Recovery includes a service fee and a network fee.** Read the actual
quote; the current service-fee policy is 1,500 sats. The protected output stays
yours, and net recovery already deducts both fees and any added funding. This
does not change the separate fee policy for Fix My Payment.

The local repair candidate adds separate final broadcast approval and a saved,
authenticated operation receipt. Confirmation leads to asset-index checks;
only matching final evidence permits a completion claim. That candidate has
not been published or verified through a complete real-network recovery.

If this route returns the 404 page, the feature is switched off in this deployment. It is
one of only two surfaces that 404 rather than loading and refusing to act.

Full steps are in
[recovery routes](/docs-inscribe/manage/recovery/#recover-padding-satoshis).

## Safety rules for all four

- **Read the asset report.** It is the reason these surfaces exist rather than sending you
  to a generic transaction builder.
- **Check the outputs list in your wallet**, not only in Inscribe. The wallet screen is the
  last accurate description of what you are about to sign.
- **Confirm your inscriptions survived** after a split or a recovery, by checking the
  destination on an explorer.
- **Never describe a screened selection as safe to yourself.** Screening removes outputs the
  index flagged. It does not prove the rest are clean, and Inscribe does not claim it does.

## Other tools

**Bitcoin Tools** carries 33 focused utilities: decoders, estimators, inspectors and
planners. **Pending TX Analyzer** reads one pending transaction in detail. **Mempool** shows
what is waiting to confirm, grouped by protocol family and sized by transaction weight.

## Related

- [Asset safety](/docs-inscribe/concepts/asset-safety/)
- [Recovery routes](/docs-inscribe/manage/recovery/)
- [Workspace map](/docs-inscribe/create/workspaces/)
