# Speed and media delivery

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

The light theme used to cost more than it should have on phones. It is built from several thousand rules that recolour the app's dark-first styling, and those rules were written in a form that made the browser consider all of them for nearly every element on the page. Each rule now identifies its target directly, so the browser only considers the ones that can apply.

The rules select exactly the same elements as before, verified across Chromium, Firefox, and Safari's engine for every one of them, so nothing about the appearance changed. What changed is how much work a phone does to arrive at it: on the pages we measured, the time the browser spent blocked on styling fell by between a third and four fifths, and total main-thread work fell by between a third and two thirds. Heavier pages such as Tools benefit most, because the cost scaled with how much was on screen.
