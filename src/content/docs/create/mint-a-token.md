---
title: Mint a token
description: Claim an amount of an existing token or rune, which protocols support minting, the shared workflow, and why a confirmed mint can still be refused by a protocol index.
protocols: [brc20, src20, src101, tap, tap_doge, block20, dust20, op_return, op_drop, arc20, atomicals, atomicals_nft, realms, subrealms, alkanes, runes, mezcal, cat20, drc20]
operations: [mint]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin, and Dogecoin for TAP on Doge
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Mixed by protocol. See the table below
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone claiming an amount of a token or rune somebody has already
deployed.

**Goal.** A minted balance held at an address you control.

## Minting is a race

Most open mints are first come, first served against a fixed supply. Two consequences
follow, and both are about fees rather than about Inscribe:

- **A mint that confirms late may claim nothing.** If the supply is exhausted before your
  transaction is mined, the protocol index will not credit you, even though your
  transaction confirmed and your fee was spent.
- **The fee rate is the whole strategy.** On a contested mint, **Fast** exists for this
  reason. On an uncontested one, paying for Fast buys nothing.

Inscribe does not predict whether a mint will succeed and does not pretend to. It shows
what the protocol index currently reports about supply and progress, and prices the
transaction you asked for.

## Which protocols support a mint

| Protocol | Workspace | Released |
| --- | --- | --- |
| BRC-20 | `/brc20` | Ungated |
| SRC-20 | `/src20` | Ungated |
| SRC-101 | `/src101` | Ungated |
| TAP | `/tap` | Ungated |
| OP-20 | `/op-return` | Ungated |
| Runes | `/runes` | Ungated |
| Mezcal | `/mezcal` | Ungated |
| Alkanes | `/alkanes` | Released |
| BLOCK-20 | `/block20` | Released |
| DUST-20 | `/dust20` | Released |
| ARC-20 | `/arc20` | A deployment must switch it on |
| Atomicals, NFTs, Realms and Subrealms | `/atomicals`, `/atomicals-nfts`, `/atomicals-realms` | A deployment must switch it on |
| OP_DROP | `/op-drop` | A deployment must switch it on |
| TAP on Doge | `/tap-doge` | A deployment must switch it on |
| CAT-20 | `/cat20` | **Not released.** Transaction features stay fail-closed |
| DRC-20 | none | **No creation workspace in Inscribe** |

## Protocol quirks worth knowing

Several protocols do something specific at mint time. These are not Inscribe behaviours;
they are how the protocol works.

- **BLOCK-20** embeds the latest block hash in every mint, filled in at mint time.
- **DUST-20** encodes the amount in the mint output's satoshi value, so the output value
  carries meaning rather than being padding.
- **Alkanes** are minted by ID, and the workspace ranks tokens by live mempool minting so
  you can see what is being contested right now.
- **TAP** also mints DMT tokens that claim block numbers.
- **ARC-20** signs directly with your wallet and has no payment-address step.
- **Subrealms** are claimed inside the Realms workspace, which is a two-part claim and pay
  sequence rather than a single mint.
- **SRC-101** registers permanent Bitcoin domain names ending `.sats` or `.btc`, funded by
  one signature.

## Prerequisites

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet, or Dogecoin mainnet for TAP on Doge |
| Wallet | Universe, UniSat, Xverse, OKX or Wizz |
| Funds | Spendable bitcoin at your payment address |
| The token | Must already be deployed, and open for minting |
| Reversible? | No. The fee is spent whether or not you receive a balance |

## Safety considerations

- **Check the remaining supply before you pay.** The workspace shows what the index
  reports.
- **Check the mint limit.** Most tokens cap how much one mint can claim. Asking for more
  than the limit usually produces an invalid mint that the index ignores, and your fee is
  still spent.
- **A confirmed transaction is not a credited balance.** See the verification section.
- **Fund from an address holding only bitcoin** where you can. See
  [asset safety](/docs-inscribe/concepts/asset-safety/).

## Steps

<ol class="steps">

<li>

**Open the workspace** for your protocol and connect your wallet.

</li>

<li>

**Find the token** in the workspace's token list, and check the supply remaining and the
per-mint limit.

</li>

<li>

**Fill the Mint form.**

The amount, within the token's per-mint limit. Some protocols fill parts of this in for
you at mint time; BLOCK-20's block hash is the clearest example.

</li>

<li>

**Set the fee rate.**

On a contested mint this is the decision that matters. On an uncontested one, **Normal**
is selected and marked Recommended, and is enough.

</li>

<li>

**Review the confirmation screen.**

Operation type, token, amount, fee rate, then **Network Gas Fee**, **Service Fee**, **Mint
UTXO Value** where the protocol carries an output, and **Total Cost**.

</li>

<li>

**Confirm and pay.**

*Expected wallet screen:* one send to the commit address for the Total Cost shown. One
signature.

**ARC-20 differs:** it signs a transaction directly, with no payment-address step.

</li>

<li>

**Verify against the protocol index, not just the chain.**

See below. This is the step that actually tells you whether you got the balance.

</li>

</ol>

## Expected result

A minted balance credited to your address by the protocol's index, visible in
**Portfolio** and in the workspace's own balance view.

## How to verify

1. The order reaches **Wallet visible**, meaning the indexer and your wallet agree.
2. **The protocol workspace's balance view** shows the amount. This is the meaningful
   check.
3. Any Bitcoin explorer confirms the transaction, independently of Inscribe.

**If step 3 passes and step 2 does not**, the transaction is on the chain but the protocol
did not credit it. The usual causes are that the supply ran out before your transaction was
mined, that the amount exceeded the per-mint limit, or that the index has not read that
block yet. Check the service status panel to tell the last case from the first two.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| Confirmed, but no balance | The mint was late, invalid, or the index is behind | Check the service status panel. If the index is current, the mint did not qualify. The fee is spent |
| The mint form rejects the amount | Above the token's per-mint limit | Reduce the amount to the limit |
| The token is not listed | The index is behind, or the ticker does not exist on this protocol | Check the status panel, and check you are on the right protocol |
| The workspace is visible but refuses to act | Its release gate is off in this deployment | Not a fault you can clear. See [status](/docs-inscribe/start/status/) |
| CAT-20 features do not work | CAT-20 is not released and stays fail-closed | Do not plan around it |
| The payment will not confirm | Fee rate too low, and on a mint this may cost you the claim | **Bump Stuck TX** immediately |

## Recovery route

An unpaid, underpaid or stuck mint order recovers like any other. See
[recovery routes](/docs-inscribe/manage/recovery/).

There is no recovery from a mint that lost the race. The transaction did what you asked;
the supply was gone.

## Related

- [Deploy a token](/docs-inscribe/create/deploy-a-token/)
- [Transfer an asset](/docs-inscribe/create/transfer-an-asset/)
- [Fee tiers](/docs-inscribe/reference/fee-tiers/)
