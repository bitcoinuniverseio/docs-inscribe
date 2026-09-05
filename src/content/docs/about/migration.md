---
title: Where pages moved
description: Every file from the previous flat structure and where its content now lives, plus the redirects that keep old links working.
provenance:
  owner: bitcoinuniverseio/docs-inscribe
  chain: Bitcoin
  network: mainnet
  release: This documentation site
  lifecycle: Stable
  lastVerified: 2026-09-01
---

This repository was a set of Markdown files read on GitHub. It is now a built site. Nothing
accurate was discarded; several pages were split, because a single file was covering two
different questions.

## The map

| Was | Is now |
| --- | --- |
| `README.md` | [The homepage](/docs-inscribe/), and [what Inscribe is](/docs-inscribe/start/what-inscribe-is/) |
| `workspaces.md` | [Workspace map](/docs-inscribe/reference/workspaces/) |
| `what-it-costs.md` | [What a transaction costs](/docs-inscribe/concepts/what-it-costs/), with [fee tiers](/docs-inscribe/reference/fee-tiers/) split out as reference |
| `asset-safety.md` | [Asset safety and UTXO classification](/docs-inscribe/concepts/asset-safety/) |
| `protocol-data-status.md` | Split three ways: [where the data comes from](/docs-inscribe/concepts/source-freshness/), [orders you started](/docs-inscribe/manage/pending-orders/), and [failure states](/docs-inscribe/troubleshooting/failure-states/) |
| `accessibility.md` | [Accessibility](/docs-inscribe/about/accessibility/) |
| `performance-and-media.md` | [Speed and media](/docs-inscribe/about/performance-and-media/) |
| `release-evidence.md` | [Release evidence](/docs-inscribe/about/release-evidence/) |
| `social-previews.md` | [Link previews](/docs-inscribe/about/social-previews/) |
| `admin-control-center.md` | [Control Center](/docs-inscribe/about/control-center/) |
| `assets/two-addresses.svg` | Redrawn inline in [wallets and the two addresses](/docs-inscribe/concepts/wallets-and-addresses/) |
| `assets/order-lifecycle.svg` | Redrawn inline in [the life of an order](/docs-inscribe/concepts/order-lifecycle/) |

## Why `protocol-data-status.md` was split

It answered three questions that different readers arrive with:

- **"Is the data I am looking at current?"** is a concept, and is now
  [where the data comes from](/docs-inscribe/concepts/source-freshness/).
- **"How do I get back to my order?"** is a task, and is now
  [orders you started](/docs-inscribe/manage/pending-orders/).
- **"What does this error mean?"** is troubleshooting, and is now
  [failure states](/docs-inscribe/troubleshooting/failure-states/).

Someone whose payment has not appeared should not have to read about index architecture to
find out what to do.

## Redirects

Old paths redirect to their new homes, so a link to `/docs-inscribe/what-it-costs/` still
arrives at the right page. The redirect list lives in `astro.config.mjs` and is part of the
build.

Links to the Markdown files on GitHub still work as they always did, because the files
remain in the repository history.

## The diagrams

Both SVG diagrams were redrawn rather than moved. The originals were fixed dark-only images
with the colours written into the file, so they were illegible in the light theme.

They are now inline SVG using the same colour roles as the rest of the site, so one drawing
serves both themes, and each carries a title and a full description for anyone reading with
a screen reader.

## Related

- [Changelog](/docs-inscribe/about/changelog/)
