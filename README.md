# Universe Inscribe documentation

Public documentation for [Universe Inscribe](https://inscribe.bitcoinuniverse.io), the
Bitcoin Universe creation studio: inscribe files and text, deploy and mint tokens, etch
runes, and transfer assets, with every satoshi accounted for before you sign.

**Read it at
[bitcoinuniverseio.github.io/docs-inscribe](https://bitcoinuniverseio.github.io/docs-inscribe/).**

## What is here

An Astro and Starlight site. Content lives in `src/content/docs`, organised by what a reader
is trying to do:

| Section | For |
| --- | --- |
| `start/` | First contact: what the product is, what to know before spending, a first inscription |
| `concepts/` | How it works: addresses, quote anatomy, order lifecycle, asset safety, data freshness |
| `create/` | Task guides: inscribe, batch, collections, deploy, mint, etch, transfer |
| `protocols/` | Protocol reference, including the generated coverage matrix |
| `manage/` | Portfolio, pending orders, recovery, advanced transaction tools |
| `reference/` | Workspace map, wallet matrix, fee tiers, order states, glossary |
| `troubleshooting/` | Failure states and common problems |
| `about/` | Accessibility, performance, release evidence, changelog, migration |

## How this stays true

Two data files carry every claim about which protocols Inscribe can create, and neither is
prose:

| File | Source |
| --- | --- |
| `src/data/protocol-coverage.json` | Generated from the Bitcoin Universe protocol registry, itself generated from the Core protocol contracts module |
| `src/data/workspaces.json` | Checked against the Inscribe production contract and frontend source |

`npm run check:capabilities` fails the build when they disagree, when a page claims an
operation the registry does not record, or when a protocol is marked unreleased without
saying what a reader sees instead.

Regenerate the coverage file from a checkout that has the platform repository beside it:

```bash
node scripts/build-protocol-coverage.mjs \
  ../docs-platform/packages/ecosystem-registry/data/capability-snapshot.json
```

## Working on it

```bash
npm install
npm run dev          # local preview
npm run build        # static build, validates every internal link and anchor
npm test             # the gates that must pass before a merge
```

`npm test` runs the copy guard, the public-safety scan, the capability-truth gate, the
manifest check and markdown lint. The accessibility audit needs a built site and a browser:

```bash
npm run build
npx astro preview --port 4323 &
npm run check:a11y
```

## The rules this repository enforces

- **No long dash character**, and no generic marketing phrasing. `npm run check:copy`.
- **Nothing private.** The product source is private; this site is public. No hostnames, IP
  addresses, internal routes, credentials or operational runbooks.
  `npm run check:public-safety`.
- **Code presence is not released capability.** A route existing is not availability, and a
  parser existing is not wallet support. Where a protocol is unreleased, the page says so.
- **Every material page carries provenance**: owning repository, chain, network, applicable
  release, lifecycle and a last-verified date, rendered from frontmatter.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Corrections are the most valuable contribution: this
documentation describes software that spends money irreversibly, and an inaccuracy here has
a cost.

## Support and security

- Questions and corrections: [SUPPORT.md](SUPPORT.md)
- Reporting a vulnerability: [SECURITY.md](SECURITY.md)
- Central platform: [docs.bitcoinuniverse.io](https://docs.bitcoinuniverse.io)

## Licence

Documentation is licensed under [CC BY 4.0](LICENSE). Site source is MIT, see
[LICENSE](LICENSE).
