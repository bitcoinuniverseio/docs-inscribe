---
title: Glossary
description: The terms used across this documentation and in the Inscribe interface, defined in the sense Inscribe uses them.
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

Terms as Inscribe uses them. Where a word means something narrower here than in general
usage, the narrower sense is the one given.

## Addresses and wallets

<dl class="glossary">
<dt><strong>Payment address</strong></dt>
<dd>The address holding your spendable bitcoin. It funds orders and pays network fees. Often starts <code>bc1q</code> or <code>3</code>.</dd>
</dl>

<dl class="glossary">
<dt><strong>Ordinals address</strong></dt>
<dd>The Taproot address holding your inscriptions, rune balances and token balances. Starts <code>bc1p</code> on mainnet. Its satoshis are carrying assets and are not spendable money.</dd>
</dl>

<dl class="glossary">
<dt><strong>Commit address</strong></dt>
<dd>A one-time address generated for a single order. You pay it once; the order key spends it.</dd>
</dl>

<dl class="glossary">
<dt><strong>Destination address</strong></dt>
<dd>Where an asset is being sent. Named on the confirmation screen so you can check it.</dd>
</dl>

## Money

<dl class="glossary">
<dt><strong>Network fee</strong></dt>
<dd>What miners are paid. Your fee rate times the transaction size. A fee.</dd>
</dl>

<dl class="glossary">
<dt><strong>Service fee</strong></dt>
<dd>A flat 1,500 satoshis for most actions, charged once per order. A fee. Fee-bumping and asset recovery charge nothing.</dd>
</dl>

<dl class="glossary">
<dt><strong>Inscription output</strong>, also <strong>Mint UTXO Value</strong> on screen</dt>
<dd>The satoshi your inscription sits on, plus its padding. <strong>Not a fee.</strong> It stays yours. Defaults to 546 satoshis.</dd>
</dl>

<dl class="glossary">
<dt><strong>sat/vB</strong></dt>
<dd>Satoshis per virtual byte, the unit a fee rate is quoted in.</dd>
</dl>

<dl class="glossary">
<dt><strong>Dust threshold</strong></dt>
<dd>The smallest output value the network will relay, which depends on the address type. 294 for P2WPKH, 330 for P2WSH and Taproot, 546 used as a safe fallback.</dd>
</dl>

<dl class="glossary">
<dt><strong>Padding</strong></dt>
<dd>The satoshis in an inscription output beyond what the inscription strictly needs. Some can be reclaimed with Asset Recovery.</dd>
</dl>

## Transactions

<dl class="glossary">
<dt><strong>UTXO</strong>, unspent transaction output</dt>
<dd>A discrete parcel of bitcoin. <strong>Bitcoin spends an output whole</strong>, which is the reason asset safety exists at all.</dd>
</dl>

<dl class="glossary">
<dt><strong>Commit transaction</strong></dt>
<dd>The first of the two transactions. Yours: your wallet builds and signs it. It funds the commit address.</dd>
</dl>

<dl class="glossary">
<dt><strong>Reveal transaction</strong></dt>
<dd>The second. It spends the commit output and carries your content onto the chain. Signed by the order own key, which is why you sign only once.</dd>
</dl>

<dl class="glossary">
<dt><strong>RBF</strong>, replace-by-fee</dt>
<dd>Broadcasting a replacement of a stuck transaction at a higher fee rate. Only possible if the original signalled that it could be replaced.</dd>
</dl>

<dl class="glossary">
<dt><strong>CPFP</strong>, child-pays-for-parent</dt>
<dd>Spending an output of a stuck transaction at a rate high enough that mining both becomes worthwhile. The route when RBF is not available.</dd>
</dl>

## Assets

<dl class="glossary">
<dt><strong>Inscription</strong></dt>
<dd>Content written into the witness of a Bitcoin transaction and tracked to a particular satoshi.</dd>
</dl>

<dl class="glossary">
<dt><strong>Parent and child</strong></dt>
<dd>An inscription made under a parent inscription you own, so its membership of a collection is provable from the chain. Requires a second signature.</dd>
</dl>

<dl class="glossary">
<dt><strong>Delegate</strong></dt>
<dd>An inscription pointing at another inscription content, so the bytes are stored once.</dd>
</dl>

<dl class="glossary">
<dt><strong>Etch</strong></dt>
<dd>The Runes word for bringing a new rune into existence. What other protocols call a deploy.</dd>
</dl>

<dl class="glossary">
<dt><strong>Deploy</strong></dt>
<dd>Creating a new token and fixing its ticker, supply and per-mint limit.</dd>
</dl>

<dl class="glossary">
<dt><strong>Mint</strong></dt>
<dd>Claiming an amount of a token or rune that already exists.</dd>
</dl>

## Classification and safety

<dl class="glossary">
<dt><strong>Assets detected</strong></dt>
<dd>An index positively reported an asset on this output. Never spent automatically.</dd>
</dl>

<dl class="glossary">
<dt><strong>No known risk</strong></dt>
<dd>A complete, untruncated, sourced and dated scan classified this output as plain bitcoin. Spent first.</dd>
</dl>

<dl class="glossary">
<dt><strong>Unverified</strong></dt>
<dd>The scan did not complete, was truncated, or could not answer. Still spendable, ranked after cleared outputs. <strong>Unknown is not the same as safe.</strong></dd>
</dl>

<dl class="glossary">
<dt><strong>Unclassified</strong></dt>
<dd>An asset the inventory recognises as present but cannot place into a protocol category. Shown rather than dropped.</dd>
</dl>

## Data states

<dl class="glossary">
<dt><strong>Live</strong></dt>
<dd>The source is answering and current with the chain.</dd>
</dl>

<dl class="glossary">
<dt><strong>Live, currency unverified</strong></dt>
<dd>Answering, but reports no height, so currency cannot be checked.</dd>
</dl>

<dl class="glossary">
<dt><strong>Tip not verified</strong></dt>
<dd>Answering with a height, but the chain tip could not be read for comparison.</dd>
</dl>

<dl class="glossary">
<dt><strong>Behind</strong></dt>
<dd>Answering with a height that trails the chain tip.</dd>
</dl>

<dl class="glossary">
<dt><strong>Unavailable</strong></dt>
<dd>Not answering. Never presented as an authoritative empty result.</dd>
</dl>

<dl class="glossary">
<dt><strong>Partial</strong></dt>
<dd>The portfolio header when at least one source did not answer.</dd>
</dl>

## Release states

<dl class="glossary">
<dt><strong>Released, ungated</strong></dt>
<dd>Available, and covered by the release health and smoke checks.</dd>
</dl>

<dl class="glossary">
<dt><strong>Released</strong></dt>
<dd>Available in principle. A deployment decides whether to switch it on.</dd>
</dl>

<dl class="glossary">
<dt><strong>Not released</strong></dt>
<dd>Unfinished work present in the codebase. Do not rely on it.</dd>
</dl>

<dl class="glossary">
<dt><strong>Read-only in Inscribe</strong></dt>
<dd>The protocol is recognised in your portfolio and in asset screening, but there is no workspace for creating it.</dd>
</dl>

## Order states

<dl class="glossary">
<dt><strong>Awaiting payment</strong></dt>
<dd>Quoted, waiting for the commit address to be funded.</dd>
</dl>

<dl class="glossary">
<dt><strong>Creation in progress</strong></dt>
<dd>Payment seen. Covers broadcast, confirmation and indexing.</dd>
</dl>

<dl class="glossary">
<dt><strong>Wallet visible</strong></dt>
<dd>The indexer and your wallet agree the asset exists. Done.</dd>
</dl>

<dl class="glossary">
<dt><strong>Failed</strong></dt>
<dd>Needs attention. See recovery routes.</dd>
</dl>

## Related

- [What a transaction costs](/docs-inscribe/concepts/what-it-costs/)
- [Order states](/docs-inscribe/reference/order-states/)
- [Asset safety](/docs-inscribe/concepts/asset-safety/)
