#!/usr/bin/env node
/**
 * One-time migration: move the existing root markdown library into the
 * Starlight content collection, add frontmatter, and rewrite the relative
 * links to the new routes. Existing prose stays the authoritative baseline;
 * this script moves files, it does not rewrite them.
 */
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, existsSync, rmSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const MOVES = [
  ['workspaces.md', 'src/content/docs/create/workspaces.md', 'Workspace map', 'Every Inscribe workspace, what it does, and which ones have in-app guides.', 'create'],
  ['what-it-costs.md', 'src/content/docs/create/what-it-costs.md', 'What a transaction costs', 'Network fee, service fee, and the output value that stays yours, piece by piece.', 'create'],
  ['asset-safety.md', 'src/content/docs/safety/asset-safety.md', 'Asset and UTXO safety', 'How Inscribe protects asset-bearing outputs, and the checks to run before every signature.', 'safety'],
  ['protocol-data-status.md', 'src/content/docs/reference/protocol-data-status.md', 'Live protocol data status', 'Where live data comes from, what health means, and how order recovery works.', 'reference'],
  ['accessibility.md', 'src/content/docs/reference/accessibility.md', 'Accessibility', 'The release gates every page and screen must pass, in both themes.', 'reference'],
  ['performance-and-media.md', 'src/content/docs/reference/performance-and-media.md', 'Performance and media', 'Load order, caching windows, and where media is served from.', 'reference'],
  ['release-evidence.md', 'src/content/docs/reference/release-evidence.md', 'Release evidence', 'Immutable images, verified revisions, and browser route validation.', 'reference'],
  ['social-previews.md', 'src/content/docs/reference/social-previews.md', 'Social previews', 'Route-aware preview images and the noindex rules for private surfaces.', 'reference'],
  ['admin-control-center.md', 'src/content/docs/reference/admin-control-center.md', 'Admin Control Center', 'The private operations surface: health, orders, indexers, and audit.', 'reference'],
]

const NEW_PAGES = {
  'src/content/docs/start/what-you-can-create.md': {
    title: 'What you can create',
    description: 'Inscribe puts Bitcoin creation in one place. Start with a guided plan, practice without spending, then make the real thing.',
    category: 'start',
    body: `## Create on Bitcoin

Inscribe is the creation studio of the Bitcoin Universe ecosystem. From one app you can:

- **Inscribe text and files** onto satoshis, one at a time or in batches.
- **Create collections** with parents, delegates, and galleries.
- **Deploy, mint, and transfer tokens** across the protocols the app supports.
- **Etch Runes** and publish plain data with OP_RETURN.
- **Move assets** with transaction-level review before every signature.

## Three ways in

1. **Plan it.** The [Guided planner](/guided/) asks what you want to make and returns an evidence-backed plan: the workflow, the protocol, the stages, the costs, and the safety checks. Every recommendation names the rule that selected it.
2. **Practice it.** The [Practice Studio](/practice/) runs the real Inscribe interface against deterministic fixtures. No wallet, no network, no transactions: a simulation that cannot spend anything.
3. **Do it.** Every plan and every guide ends with a safe handoff into the live workspace, where the app still shows its own review and confirmation flow.

## Know before you sign

Two facts govern every workflow. First, Bitcoin transactions are irreversible: a confirmed payment cannot be undone by anyone. Second, a fee and your money are different things: the [cost anatomy](/create/what-it-costs/) separates the network fee, the service fee, and the output value that stays owned by you.

## If something goes wrong

The [Recovery Navigator](/recovery/navigator/) turns your situation into a diagnosis with a next action, and the [recovery guide](/safety/order-recovery/) holds the full detail. Neither will ever tell you to publish a secret or to trust anyone who claims they can reverse a confirmed transaction.`,
  },
  'src/content/docs/create/first-inscription.md': {
    title: 'Your first inscription',
    description: 'From an empty wallet to a confirmed inscription, with every check in between.',
    category: 'create',
    body: `## Before you start

You need a Bitcoin wallet with sats available on mainnet, and about ten minutes. The app uses a two-address model: a payment address that funds transactions and an ordinals address that holds inscriptions. Both are yours; both live in your wallet.

A practice run in the [Practice Studio](/practice/) costs nothing and shows every screen before you touch real funds.

## The short version

1. **Connect your wallet** in the app. Approve the popup in the extension.
2. **Open the Inscribe workspace** and pick the Text sub-tab.
3. **Type your content.** The quote updates live: network fee, service fee, and the 546 sats of postage that stays yours.
4. **Review the quote.** The final in-app quote is authoritative; the numbers in guides and planners are previews.
5. **Pay the commit address** exactly. The app watches for your payment and runs the reveal.
6. **Wait for confirmations.** The order page shows the lifecycle: created, paid, committed, revealed, complete.

## What the wallet review shows

Before you sign anything, your wallet lists the destination, the amount, and the fee. Check all three against the order page. The app never asks a wallet to sign without showing the same numbers first.

## If it stops moving

Payments can take longer than the quote timer, reveals can fail and retry, and tabs can be closed by accident. The [Recovery Navigator](/recovery/navigator/) diagnoses your exact situation and names the next action. The one thing it will never suggest is sending a second full payment.`,
  },
  'src/content/docs/safety/order-recovery.md': {
    title: 'Order recovery',
    description: 'What can interrupt an order, what each state means, and the exact next action for every one of them.',
    category: 'safety',
    body: `## Orders are recoverable states, not gambles

An order moves through known stages, and each stage has a documented recovery path. The [Recovery Navigator](/recovery/navigator/) walks you to the right one; this page is the reference behind it.

## The rules that never bend

1. **Never pay twice on a hunch.** An absent result is not a zero. Payment detection catches up after confirmations.
2. **Top up the difference, never repeat the total.** When an order shows an underpayment with a top-up action, pay exactly the displayed difference.
3. **A confirmed transaction is final.** No operator, no support agent, and no service can reverse one.
4. **Never publish a recovery capability.** The encrypted recovery kit stays on your disk. Nobody legitimate will ask for it.
5. **Do not act on stale data.** When the live status page reports a source as stale or unavailable, wait for healthy before paying or repairing.

## The states

- **Unpaid, quote current.** Pay the exact quoted total before the timer ends.
- **Quote expired before payment.** Request a fresh quote. The old amount is invalid.
- **Payment sent, not detected.** Wait one confirmation window and reload the order page. Save the transaction id.
- **Underpayment with a top-up action.** Pay the exact difference the order displays.
- **Underpayment without a repair action.** Stop. Gather evidence and open a support request.
- **Overpayment.** Let the order complete, then follow the refund path with your evidence.
- **Payment stuck unconfirmed.** Bump the fee with replace-by-fee if your wallet supports it, or wait. Do not broadcast a duplicate.
- **Your own transaction stuck.** Use the tx replace workspace to bump it.
- **Reveal failed.** Retry the reveal from the order page. The paid commit still belongs to this order.
- **Order access lost.** Check the browser order list first, then restore the order URL from your encrypted recovery kit.
- **Padding satoshis.** Recover them from the recover-sats workspace with the same wallet and network.
- **Signed to the wrong address.** A confirmed transaction cannot be reversed. If the destination was your own address elsewhere, recover it there. Otherwise the amount is lost, and the pre-sign checklist is the lesson.

## Evidence to keep

For anything you cannot resolve in the app, keep the order URL, the payment transaction id, the quoted and paid amounts, and the order page screenshots. The recovery and support paths all start from that evidence, and none of it is secret: none of it includes your seed phrase, keys, or recovery kit, which should never leave your device.`,
  },
  'src/content/docs/reference/agent-surfaces.md': {
    title: 'For agents and LLMs',
    description: 'Machine-readable surfaces: full-text corpus, JSONL, skill guidance, MCP tools, and how to cite provenance.',
    category: 'reference',
    body: `## Read this site without a browser

Every public page has a generated Markdown representation with the same content, headings, warnings, tables, captions, and links as the HTML. The generated artifacts come from the same source collection as the site, so they cannot drift.

- \`/llms.txt\` indexes the site for retrieval agents.
- \`/llms-full.txt\` holds the complete corpus in one document.
- \`/corpus.jsonl\` lists one JSON object per page and section with stable ids, provenance, and last-verification data.
- \`/skill.md\` describes the read-only Inscribe documentation tools and their safety boundaries in a form an agent can follow.
- \`/learning-manifest.json\` is the structured manifest behind the planner, the labs, and the recovery navigator: workflows, protocols, guides, recovery outcomes, and the source commits every fact came from.
- Every page supports \`?format=markdown\`, and the page footer offers "Copy as Markdown" and "View as Markdown".

## MCP tools

The existing documentation MCP server exposes deterministic, read-only Inscribe planning tools: plan an action, compare protocols, triage a recovery, explain a quote, fetch a walkthrough or practice scenario, and report learning health. Every answer carries the input as normalized by the schema, the result, assumptions, exclusion reasons, the three lifecycle states, the owning documentation route, and the source commits.

The tools never accept wallet secrets, never connect to wallets, and never create orders. They call the same engines the browser uses, so an agent and a reader get the same answer for the same question.

## Citing this site

Cite the page URL plus the documentation commit from the page footer. If a fact matters to money, prefer the in-app quote over any number published here: documentation teaches, the app decides.`,
  },
}

const LINK_MAP = {
  'workspaces.md': '/create/workspaces/',
  'what-it-costs.md': '/create/what-it-costs/',
  'asset-safety.md': '/safety/asset-safety/',
  'protocol-data-status.md': '/reference/protocol-data-status/',
  'accessibility.md': '/reference/accessibility/',
  'performance-and-media.md': '/reference/performance-and-media/',
  'release-evidence.md': '/reference/release-evidence/',
  'social-previews.md': '/reference/social-previews/',
  'admin-control-center.md': '/reference/admin-control-center/',
  'README.md': '/start/what-you-can-create/',
  'order-recovery': '/safety/order-recovery/',
  'recovery navigator': '/recovery/navigator/',
}

for (const [from, to, title, description, category] of MOVES) {
  const src = join(root, from)
  if (!existsSync(src)) {
    console.log(`skip ${from} (already migrated)`)
    continue
  }
  let body = readFileSync(src, 'utf8')
  for (const [needle, replacement] of Object.entries(LINK_MAP)) {
    body = body.split(`(${needle})`).join(`(${replacement})`)
    body = body.split(`#${needle}`).join(replacement)
  }
  const frontmatter = `---
title: ${title}
description: ${description}
category: ${category}
lastVerified: 2026-09-01
---
`
  mkdirSync(dirname(join(root, to)), { recursive: true })
  writeFileSync(join(root, to), frontmatter + body)
  unlinkSync(src)
  console.log(`moved ${from} -> ${to}`)
}

for (const [path, page] of Object.entries(NEW_PAGES)) {
  const full = join(root, path)
  if (existsSync(full)) continue
  mkdirSync(dirname(full), { recursive: true })
  const frontmatter = `---
title: ${page.title}
description: ${page.description}
category: ${page.category}
lastVerified: 2026-09-02
---
`
  writeFileSync(full, frontmatter + page.body)
  console.log(`wrote ${path}`)
}

console.log('migration complete')
