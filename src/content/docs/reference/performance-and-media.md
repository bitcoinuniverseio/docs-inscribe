---
<<<<<<<< HEAD:src/content/docs/reference/performance-and-media.md
title: 'Performance and media'
description: 'Load order, caching windows, and where media is served from.'
category: reference
lastVerified: 2026-09-01
---
# Speed and media delivery
========
title: Speed and media
description: "What loads first, how protocol data is cached, and how inscription media is rendered from Universe infrastructure."
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

>>>>>>>> f81b73edc3d97beddafed9ab57fbf3530bd423ec:src/content/docs/about/performance-and-media.md

Universe Inscribe loads the workspace shell first and fills each section as its data arrives. This page explains what you can expect and where the data and media come from.

## What loads first

- The app shell, navigation, and your current page appear before protocol data. Each page reserves its space while it loads, so content does not jump when lists and panels arrive.
- Scripts and styles are compressed at build time and cached by your browser for a year under unique file names. A new release never mixes old and new files.
- Production builds preload only the runtime and shared interface library needed by the first screen. Wallet and protocol workspaces continue loading when you open them, which keeps the initial page within its reviewed download budget.
- Icons, fonts, and logos are small files served from Inscribe itself, stored at the size they are shown.

## Protocol data

- Public token lists, indexer status, and fee reads may be reused for a short time (10 to 300 seconds depending on the read) so repeat views and other users get an instant answer. Every list shows the time window it covers.
- Wallet balances, portfolio reads, orders, and anything tied to your session are never cached by the browser or by shared caches.
- When an indexer is slow, Inscribe can serve the last good answer while it refreshes in the background. It never shows a failed read as an empty result.

## Inscription media

- Inscription images, text, HTML, audio, and video load from Universe-operated infrastructure. Inscribe does not depend on third-party explorers to show your assets.
- Thumbnails use small AVIF or WebP renders where the shared Universe media service has one. Otherwise the original bytes are shown, scaled to the tile.
- Video and audio in galleries do not download until you open them.
- Active content (HTML, scripts, SVG with scripts) always renders inside an isolated sandbox. Recursive inscriptions resolve their dependencies through the same Inscribe origin.
- The exact original bytes are never altered; derived previews are only used for display.

## Light, dark, and mobile

Every page works in light and dark themes and from 320 px phones to large desktops. Text in tables uses fixed-width digits so numbers stay aligned while they refresh.

Light and dark themes now read from the same role-based colour tokens. The old light-theme repaint sheet is gone, so changing theme updates a compact set of tokens instead of making the browser consider thousands of component overrides.

This was an intentional visual redesign, not a claim that the old appearance stayed unchanged. Contract tests and browser checks cover both themes across supported viewports, including text contrast, focus states, native controls, and layout stability.
