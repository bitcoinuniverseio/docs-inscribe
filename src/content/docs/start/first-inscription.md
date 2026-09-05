---
title: Your first inscription
description: A complete walkthrough of inscribing a file or a line of text, from connecting a wallet to seeing the result, with the wallet screen to expect and how to verify what happened.
protocols: [ordinals]
operations: [inscribe]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable, ungated
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone who has never inscribed anything. No prior Ordinals knowledge
is assumed.

**Goal.** One inscription on Bitcoin mainnet, held at an address you control, that you can
verify independently.

## Before you start

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet. Real money |
| Protocol | Ordinals. Released, ungated, covered by the release health contract |
| Wallet | One of Universe, UniSat, Xverse, OKX, Wizz |
| Funds | Spendable bitcoin at your **payment address**. Budget a few thousand satoshis plus the network fee |
| Time | A few minutes to sign, then up to an hour or so for confirmation at a normal fee rate |
| Reversible? | **No.** Once you sign, the fee is spent whatever the outcome |

Read [what a transaction costs](/docs-inscribe/concepts/what-it-costs/) first if you have
not. You will be shown a total before you sign, and it helps to know what the three lines
mean.

### Safety considerations

- **Fund from an address holding only bitcoin** where you can. If the payment address also
  holds inscriptions or token balances, your wallet picks which outputs to spend, and
  Inscribe cannot override that choice. It will warn you before opening the wallet.
- **Check the content preview.** What the preview shows is what gets written. There is no
  edit afterwards.
- **Do not pay twice.** If a payment seems not to register, go to
  [recovery routes](/docs-inscribe/manage/recovery/) rather than sending again.

## Steps

<ol class="steps">

<li>

**Open the Inscribe workspace.**

Go to [inscribe.bitcoinuniverse.io](https://inscribe.bitcoinuniverse.io) and open
**Inscribe** from the sidebar, or go straight to `/inscribe`. The command palette,
`Ctrl` + `K` (`Cmd` + `K` on macOS), reaches it by name.

The workspace opens on the **Text** sub-tab. The other sub-tabs are Files, Names,
Parent/Child, Delegate, Gallery, Stamps and Data Lab.

</li>

<li>

**Connect a wallet.**

Click **Connect** and pick your wallet. Your wallet asks for permission to share your
addresses; approve it. This is a read permission, not a spending one.

*Expected wallet screen:* a connection prompt naming the site and listing the accounts it
will share. No amount appears, because nothing is being spent yet.

Once connected, Inscribe holds two addresses from your wallet: a **payment address** for
spendable bitcoin and an **Ordinals address** for what you own. If your wallet exposes
only one address, that one does both jobs.

</li>

<li>

**Choose what to inscribe.**

*For text:* type or paste into the box on the **Text** tab. One line is fine.

*For a file:* switch to **Files** and drop a file in, or pick one. Accepted types are JPG,
JPEG, PNG, WEBP, GIF, SVG, TXT, HTML, JSON, MP3 and MP4. The maximum is **4 MB**, and the
file's extension has to match its actual type or it is rejected.

Larger files cost more, because the network fee is the fee rate times the size of the
transaction. Start small.

</li>

<li>

**Check the preview.**

The preview shows exactly what will be written to the chain. Read it now. After you sign,
this is what exists.

</li>

<li>

**Set the fee rate and the output size.**

Pick a fee tier. **Normal** is selected for you and is marked Recommended; it targets the
blocks mined over roughly the next half hour. **Fast** targets the next block. **Custom**
takes any rate you type.

If Normal and Fast show the same rate, that is not a bug: blocks have room, and the two
tiers are the same purchase. The app says so on both tiers.

Leave the inscription output at **546 sats** unless you have a reason not to. It is not a
fee: it is the satoshi your inscription will sit on, and you keep it.

</li>

<li>

**Read the confirmation screen.**

This is the last point at which the choice is still yours. It shows:

| Line | What it is |
| --- | --- |
| Operation Type | What you are about to do |
| Network Fee Rate | The rate you picked |
| Network Gas Fee | Rate times transaction size, paid to miners |
| Service Fee | A flat 1,500 sats |
| Mint UTXO Value | The 546 sats your inscription sits on, which stays yours |
| Total Cost | The amount your wallet will be asked to spend |

It also names the receiving address. Check it is yours.

If the address you are paying from holds assets, a warning appears here listing them. It
does not block you. Read [asset safety](/docs-inscribe/concepts/asset-safety/) if you see
it.

</li>

<li>

**Confirm and pay.**

Press **CONFIRM &amp; PAY**. Inscribe creates the order and asks your wallet to send the
total to a one-time commit address it generated for this order alone.

*Expected wallet screen:* a normal send. One recipient, which is the commit address; the
amount, which is the total from the previous step; and the fee rate you chose. Compare the
amount against the Total Cost you just read. If it does not match, reject it.

**This is your only signature.** The second transaction, the one that actually writes your
content, is signed by the order's own key rather than by you.

</li>

<li>

**Wait.**

You land on the order status page. What happens next needs nothing from you:

- Universe checks the commit address every ten seconds. An unconfirmed payment is enough;
  it does not wait for a confirmation.
- It builds and broadcasts the reveal transaction, which carries your content.
- A miner confirms the reveal.
- The indexer reads it and your wallet reports it.

The status stays **Creation in progress** through all of that, and only moves to **Wallet
visible** when the indexer and your wallet agree the inscription exists. That is
deliberate: a broadcast is not a result.

**You can close the tab.** The work continues without your browser. See
[orders you started](/docs-inscribe/manage/pending-orders/) for how to get back.

</li>

<li>

**Verify it.**

Three checks, from weakest to strongest:

1. The order page shows **Wallet visible** and gives you the reveal transaction id.
2. **Portfolio** lists the inscription under your connected wallet.
3. Paste your Ordinals address into **Explore**, or the transaction id into any Bitcoin
   explorer, and confirm the output exists and is at your address.

The third is the one that does not depend on Inscribe being right.

</li>

</ol>

## Expected result

An inscription held at your Ordinals address, on a 546-satoshi output, with a reveal
transaction id you can look up anywhere. Your payment address is lighter by the total you
approved.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| **Awaiting payment**, and you did pay | The payment has not appeared at the commit address yet, or it went somewhere else | Wait a few minutes. Then check the transaction actually went to the commit address. Do not pay again |
| Payment below the quote | You sent less than the total | Top the same address up to the quoted amount. The flow resumes |
| The hour ran out | The price quote expired | Start a new order at a current price. If you already paid, do not pay again, see recovery |
| The payment is not confirming | Your fee rate was too low for current conditions | Use **Fix My Payment** or **Bump Stuck TX**. See [recovery routes](/docs-inscribe/manage/recovery/) |
| A source is unavailable | An index the workspace reads is down or catching up | Reading and drafting keep working. Writes stay paused, and nothing already signed is at risk |
| The screen you clicked does not open | A release landed while your tab was open | Reload. Nothing you started is lost |

## Recovery route

If anything goes wrong after you have paid, the order is not lost and the signing key is
not discarded. Start at [recovery routes](/docs-inscribe/manage/recovery/), which covers
unpaid orders, underpayment, stuck payments, closed tabs and failed reveals.

## Related

- [What a transaction costs](/docs-inscribe/concepts/what-it-costs/)
- [The life of an order](/docs-inscribe/concepts/order-lifecycle/)
- [Inscribe a file](/docs-inscribe/create/inscribe-a-file/), with the per-protocol limits
- [Inscribe in a batch](/docs-inscribe/create/batch/)
