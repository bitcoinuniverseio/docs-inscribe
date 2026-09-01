## What changed

<!-- One sentence. If you corrected an inaccuracy, say what the page used to claim. -->

## Why

<!-- What a reader could not do, or got wrong, before this. -->

## Checks

- [ ] `npm test` passes
- [ ] `npm run build` passes, so every internal link and anchor resolves
- [ ] Any claim about what a protocol can do traces to `src/data/protocol-coverage.json`
- [ ] Nothing private: no hostnames, IP addresses, internal routes, credentials or runbooks
- [ ] No long dash character, and no generic marketing phrasing
- [ ] `lastVerified` updated on any page actually re-checked against the product
- [ ] A new page is added to the route list in `scripts/check-accessibility.mjs`

## For a task guide

- [ ] States reader, goal, prerequisites, wallet support, chain, network and version
- [ ] States costs, safety considerations, exact steps and the wallet screen to expect
- [ ] States the expected result, how to verify, failure states and a recovery route
- [ ] At least one verification step does not depend on Inscribe being right
