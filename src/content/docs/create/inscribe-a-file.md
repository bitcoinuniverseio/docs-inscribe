---
title: Inscribe a file
description: Put an image, audio, video, HTML or JSON file on Bitcoin, with the accepted types, the size limits per destination, what it costs and how to verify the result.
protocols: [ordinals, stamps, drops, op_return, chainbloom]
operations: [inscribe]
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Ordinals, Stamps and OP_RETURN are released and ungated. Drops and ChainBloom are released but a deployment must switch them on
  lastVerified: 2026-09-01
---

**Who this is for.** Anyone with a file they want written onto Bitcoin.

**Goal.** A file inscribed at an address you control, verifiable on any explorer.

## Prerequisites

| Requirement | Detail |
| --- | --- |
| Chain and network | Bitcoin mainnet |
| Workspace | **Inscribe**, at `/inscribe`, the **Files** sub-tab |
| Wallet | Universe, UniSat, Xverse, OKX or Wizz |
| Funds | Spendable bitcoin at your payment address. A large file can cost significantly more than a small one |
| Reversible? | No |

If this is your first time, do
[your first inscription](/docs-inscribe/start/first-inscription/) instead. It covers the
same ground with more explanation.

## What you can upload

Inscribe accepts these types, and rejects a file whose extension does not match its actual
content:

| Category | Types |
| --- | --- |
| Images | JPG, JPEG, PNG, WEBP, GIF, SVG |
| Text and data | TXT, HTML, JSON |
| Audio and video | MP3, MP4 |

**The overall limit is 4 MB.** A larger file is refused with `File too large (max 4 MB).`

The same guard runs whether you drag a file in or pick one, so there is no path around it.

## Size limits by destination

The Files tab can send your file to more than one protocol, and each has its own payload
ceiling. These are protocol limits, not Inscribe preferences.

| Destination | Payload limit | Notes |
| --- | --- | --- |
| **Ordinals** | No protocol cap, subject to the 4 MB upload limit | The default, and the one to use unless you have a reason not to |
| **Stamps** | 65,529 bytes | One image only: PNG, JPG, WEBP or GIF. Data goes into the UTXO set, so it cannot be pruned |
| **OP_RETURN** | 34,000 bytes | Well above the 79-byte standard relay reference. A file path is capped at 25,000 bytes |
| **Drops** | 256 bytes | Small artifacts with stable IDs. Released, but a deployment must switch it on |
| **Atomicals** | 2,000,000 bytes, and lower where the backend reports a smaller ceiling for your case | Released, but a deployment must switch it on |

Choosing a destination changes the cost as well as the limit. Stamps encode data directly
into outputs, which is why they are more expensive per byte and why they cannot be pruned.

## Safety considerations

- **The preview is the contract.** What the preview shows is what is written. There is no
  edit afterwards.
- **Fund from an address holding only bitcoin** where possible. See
  [asset safety](/docs-inscribe/concepts/asset-safety/).
- **Active content is sandboxed on display, not on chain.** HTML, scripts and SVG with
  scripts render inside an isolated sandbox when Inscribe shows them. That protects the
  viewer; it does not change what you wrote.
- **Cost scales with size.** The network fee is your fee rate times the transaction size.
  Doubling the file roughly doubles that line.

## Steps

<ol class="steps">

<li>

**Open `/inscribe` and select the Files sub-tab.**

Connect your wallet if you have not. Nothing is spent by connecting.

</li>

<li>

**Add your file.**

Drag it in or use the picker. If it is refused, the message says why: an unsupported type,
a mismatch between the extension and the real content, or over 4 MB.

</li>

<li>

**Choose the destination.**

Ordinals is the default. Pick another only if you specifically want its properties, and
check your file fits the limit in the table above.

</li>

<li>

**Check the preview.**

Confirm this is the file you meant, at the quality you meant. Read it properly; this is
the last cheap moment.

</li>

<li>

**Set the fee rate and output size.**

**Normal** is selected and marked Recommended. Leave the inscription output at 546 sats
unless you have a reason to use 330.

Watch the network fee move as you change the rate. On a large file the difference between
tiers is real money.

</li>

<li>

**Review the confirmation screen.**

It shows the operation type, the fee rate, **Network Gas Fee**, **Service Fee** of 1,500
sats, **Mint UTXO Value** and **Total Cost**, and it names the receiving address.

If the paying address holds assets, a warning lists them here. It does not block you.

</li>

<li>

**Confirm and pay.**

*Expected wallet screen:* a single send to the commit address, for exactly the Total Cost
shown. Compare the two numbers. Reject if they differ.

This is your only signature for this order.

</li>

<li>

**Wait, then verify.**

The status page moves from **Awaiting payment** to **Creation in progress** to **Wallet
visible**. You can close the tab.

Verify by finding the inscription in **Portfolio**, and independently by looking up the
reveal transaction id on any Bitcoin explorer.

</li>

</ol>

## Expected result

Your file on a 546-satoshi output at your Ordinals address, with a reveal transaction id.
The exact original bytes are what is stored; any thumbnail Inscribe shows you later is a
derived preview and does not alter the original.

## How to verify

1. **Portfolio** lists it under your connected wallet.
2. **Explore** with your Ordinals address pasted in shows the same thing without a wallet.
3. Any Bitcoin explorer, using the reveal transaction id, shows the output exists at your
   address. This check does not depend on Inscribe.

## Common failure states

| What you see | What it means | What to do |
| --- | --- | --- |
| `File too large (max 4 MB).` | Over the upload limit | Compress or resize the file |
| The file is rejected on type | The extension does not match the actual content, or the type is not accepted | Re-export in a supported format |
| The payload exceeds the destination cap | Your file is fine for Ordinals but too big for the destination you picked | Use Ordinals, or reduce the file |
| Still **Awaiting payment** after paying | The payment has not reached the commit address yet | Wait. Do not pay again. See recovery |
| The payment will not confirm | Fee rate too low for current conditions | **Fix My Payment** or **Bump Stuck TX** |
| The workspace says a source is unavailable | An index it reads is down or catching up | Reads and drafts still work; writes stay paused. Nothing signed is at risk |

## Recovery route

[Recovery routes](/docs-inscribe/manage/recovery/) covers unpaid orders, underpayment,
stuck payments, closed tabs and failed reveals. Nothing here is lost by closing a tab, and
paying twice is never the fix.

## Related

- [Inscribe text](/docs-inscribe/create/inscribe-text/)
- [Inscribe in a batch](/docs-inscribe/create/batch/)
- [Create a collection](/docs-inscribe/create/collections/)
- [What a transaction costs](/docs-inscribe/concepts/what-it-costs/)
