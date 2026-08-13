# Route-aware link previews

Universe Inscribe gives every public, shareable destination a designed large-card preview. The title, description, canonical URL, visual family, and image identify the page being shared instead of repeating a generic Bitcoin logo.

## What a shared link includes

- The real section, protocol, tool, or public asset name.
- A concise description of the destination.
- A canonical URL that identifies that page or asset.
- A 1200 × 630 image from the appropriate Universe Inscribe visual family.
- Matching Open Graph and X metadata for social and messaging clients.

Public token and asset pages use safe public identity data when it is available. Their card remains specific to the entity even when the public profile service is temporarily unavailable.

## Privacy

Portfolio, Watchlist, Activity, order, payment-recovery, wallet, and other user-specific views suppress social images and use `noindex,nofollow`. A preview never contains a wallet address, balance, session, account, order payload, or draft transaction.

## Stable previews and updates

An unchanged page keeps the same deterministic image URL. A material route, profile, or renderer change creates a new content-addressed URL so social caches can retrieve the new design without random cache busting.

## Sharing a page

Copy the full canonical URL from the browser and paste it into the destination app. Public sections, tools, and supported public entity pages can be shared directly. Private surfaces intentionally display neutral or suppressed previews.
