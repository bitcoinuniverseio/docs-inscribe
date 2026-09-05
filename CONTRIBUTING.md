# Contributing

This documentation describes software that spends money irreversibly. An inaccuracy here has
a cost, so accuracy is the thing that matters most.

**Corrections are the most valuable contribution.** If a page says something the product does
not do, that is a bug worth reporting even if you cannot fix it yourself.

## Reporting an inaccuracy

[Open an issue](https://github.com/bitcoinuniverseio/docs-inscribe/issues) with:

- the page;
- what it says;
- what the product actually does;
- how you know, ideally a transaction id, a screenshot of the app, or steps to reproduce.

## Making a change

```bash
npm install
npm run dev
```

Then before you open a pull request:

```bash
npm test
npm run build
```

`npm run build` validates every internal link and anchor, so a broken cross-reference fails
the build rather than shipping.

## The rules

### Never use the long dash character

Use commas, colons, periods or parentheses. `npm run check:copy` fails on it, and on a list
of generic marketing phrases.

### Never write "canonical"

Use "authoritative", "owning", "official", or "the source of truth". The copy guard fails on
it. The HTML attribute `rel="canonical"` is required markup and is fine.

### Never publish anything private

The Inscribe product source is private and this repository is public. No hostnames, IP
addresses, internal admin routes, credentials, environment values, or operational runbooks.

`npm run check:public-safety` catches the known patterns. It is a backstop, not a substitute
for judgement: describe **what a reader experiences**, not how the infrastructure is wired.

### Code presence is not released capability

This is the rule most likely to be broken by accident.

- A route existing is not production availability.
- A parser existing is not wallet support.
- A feature flag existing is not a shipped feature.

Availability comes from `src/data/workspaces.json`, which is checked against the Inscribe
production contract. If you want to document something as usable, first establish that it is
released.

Where a protocol is `feature-gated`, say it is implemented but switched off unless an
operator enables it. Where the registry gives a reason an action is unsupported, use that
reason: it is usually the most useful sentence on the page.

### Do not hand-edit the coverage data

`src/data/protocol-coverage.json` is generated. Regenerate it:

```bash
node scripts/build-protocol-coverage.mjs \
  ../docs-platform/packages/ecosystem-registry/data/capability-snapshot.json
```

`src/data/workspaces.json` is hand-maintained but constrained: every protocol in the registry
must be accounted for, a protocol with no workspace must say why, and an unreleased protocol
must say what a reader sees instead. `npm run check:capabilities` enforces all of it.

### Every material page carries provenance

In frontmatter:

```yaml
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable, ungated
  lastVerified: 2026-09-01
```

Update `lastVerified` when you have actually checked the page against the product, not when
you have edited a sentence.

### Task guides have a required shape

A guide in `create/` or `start/` states: intended reader, goal, prerequisites, wallet
support, chain, network, safety considerations, exact steps, the wallet review screen to
expect, the expected result, how to verify independently, common failure states, and a
recovery route.

The verification section should include at least one check that **does not depend on
Inscribe being right**, usually a block explorer.

## Style

- Plain, direct writing. Short paragraphs.
- Prefer a diagram or a table to a wall of text.
- No unsupported superlatives, no fake urgency, no incomplete sections, no untested
  examples.
- Say what something costs and what it cannot do, in the same voice you use to say what it
  can.
- If you do not know, say so on the page. An honest gap is better than a confident guess.

## Diagrams

Inline SVG, with a `<title>` and a `<desc>` that describes the content rather than the
picture. Use the `--d-*` custom properties so one drawing works in both themes; never write a
colour value into a diagram.

## Accessibility

The site is checked with axe against every page, in both themes, at 375 and 1440 pixels wide,
and fails on any violation or any sideways scroll.

**A new page must be added to the route list in `scripts/check-accessibility.mjs`.** An
unaudited page should be a decision, not an oversight.

## Commits and pull requests

- One topic per pull request.
- Say what changed and why in the description. If you corrected an inaccuracy, say what the
  page used to claim.
- Green checks before review.
