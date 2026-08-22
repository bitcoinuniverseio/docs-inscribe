# Speed and media delivery

Universe Inscribe loads the workspace shell first and fills each section as its data arrives. This page explains what you can expect and where the data and media come from.

## What loads first

- The app shell, navigation, and your current page appear before protocol data. Each page reserves its space while it loads, so content does not jump when lists and panels arrive.
- Scripts and styles are compressed at build time and cached by your browser for a year under unique file names. A new release never mixes old and new files.
- Icons, fonts, and the logo are small files served from Inscribe itself.

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
