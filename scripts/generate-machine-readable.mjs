#!/usr/bin/env node
// Generates the machine-readable surfaces from the same content collection
// that builds the site: llms.txt index, llms-full.txt corpus, per-page
// markdown, corpus.jsonl with stable ids and provenance, and skill.md with
// the read-only tool guidance. Runs after `astro build` into dist/.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { join, resolve, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = join(root, 'src', 'content', 'docs')
const distDir = join(root, 'dist')
const commit = execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
const generatedAt = new Date().toISOString()

function parseFrontmatter(source) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(source)
  if (!match) return { fm: {}, body: source }
  const fm = {}
  for (const line of match[1].split('\n')) {
    const m = /^(title|description|lastVerified|category):\s*(.+)$/.exec(line.trim())
    if (m) fm[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
  return { fm, body: source.slice(match[0].length) }
}

function listPages(dir, prefix = '') {
  const pages = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) pages.push(...listPages(full, `${prefix}${entry}/`))
    else if (entry.endsWith('.md')) pages.push({ full, route: `${prefix}${entry.replace(/\.md$/, '')}` })
  }
  return pages
}

const pages = listPages(docsDir).map(({ full, route }) => {
  const { fm, body } = parseFrontmatter(readFileSync(full, 'utf8'))
  return { full, route: route === 'index' ? '' : route, fm, body }
})

// Stable page ids: inscribe-docs/<route>
function pageId(route) {
  return `inscribe-docs/${route || 'index'}`
}

// Per-page markdown + section records for the JSONL corpus.
mkdirSync(join(distDir, 'md'), { recursive: true })
const corpus = []
for (const page of pages) {
  const id = pageId(page.route)
  const md = [
    `# ${page.fm.title ?? page.route}`,
    page.fm.description ? `\n${page.fm.description}\n` : '',
    page.body.trim(),
    '',
    `---`,
    `Source: bitcoinuniverseio/docs-inscribe@${commit.slice(0, 12)} (${generatedAt})`,
    page.fm.lastVerified ? `Last verified: ${page.fm.lastVerified}` : '',
  ].join('\n')
  const mdPath = join(distDir, 'md', `${page.route || 'index'}.md`)
  mkdirSync(dirname(mdPath), { recursive: true })
  writeFileSync(mdPath, md)

  corpus.push(JSON.stringify({ id, route: `/${page.route}`, title: page.fm.title, category: page.fm.category, lastVerified: page.fm.lastVerified ?? null, markdownUrl: `/md/${page.route || 'index'}.md`, sourceCommit: commit }))
}

// llms.txt: the index.
const llms = [
  '# Inscribe documentation',
  '',
  `Bitcoin creation learning environment for Inscribe. Source commit ${commit}. Generated ${generatedAt}.`,
  'The final in-app quote is always authoritative; this site teaches, the app decides.',
  '',
  '## Pages',
  '',
  ...pages.map((p) => `- [${p.fm.title ?? p.route}](https://bitcoinuniverseio.github.io/docs-inscribe/${p.route}) [markdown](/docs-inscribe/md/${p.route || 'index'}.md): ${p.fm.description ?? ''}`),
  '',
  '## Structured data',
  '',
  '- [Learning manifest](/docs-inscribe/learning-manifest.json): workflows, protocols, guides, recovery outcomes, source commits',
  '- [JSONL corpus](/docs-inscribe/corpus.jsonl): one record per page with stable ids and provenance',
  '- [Agent guidance](/docs-inscribe/skill.md): read-only tool guidance and safety boundaries',
  '',
].join('\n')
writeFileSync(join(distDir, 'llms.txt'), llms)

// llms-full.txt: the complete corpus.
const full = [
  '# Inscribe documentation, full corpus',
  '',
  ...pages.flatMap((p) => [`\n\n===== ${pageId(p.route)} =====\n`, readFileSync(join(distDir, 'md', `${p.route || 'index'}.md`), 'utf8')]),
].join('')
writeFileSync(join(distDir, 'llms-full.txt'), full)

// corpus.jsonl
writeFileSync(join(distDir, 'corpus.jsonl'), corpus.join('\n') + '\n')

// skill.md
writeFileSync(
  join(distDir, 'skill.md'),
  `# Inscribe documentation tools for agents

Scope: read-only documentation and planning help for Inscribe, the Bitcoin creation studio.

Read-only capabilities an agent may assume:

- plan_inscribe_action: deterministic workflow planning from a goal. The answer lists the workflow, alternatives, exclusions with reasons, the three lifecycle states (implemented, enabled, healthy separately), and source commits.
- compare_inscribe_protocols: source-backed comparison rows; unestablished cells are reported as unestablished.
- triage_inscribe_recovery: walks the recovery decision table to a terminal outcome with stop conditions and next actions.
- explain_inscribe_quote: cost component breakdown from the shared estimator. Always states that the final in-app quote is authoritative.
- get_inscribe_walkthrough / get_inscribe_practice_scenario: fetch structured walkthrough and scenario metadata.
- get_inscribe_learning_health: reports release, deployment, and health states without collapsing them.

Hard boundaries:

- Never accept or request seed phrases, private keys, PSBTs, wallet connections, or recovery capabilities.
- Never create orders, sign, pay, or broadcast. Documentation tools are read-only.
- Never present incomplete, disabled, stale, or read-only capabilities as available.
- Never claim an operator can reverse a confirmed Bitcoin transaction.
- Cite the page id and source commit; prefer the in-app quote over any number published here.

Machine surfaces: /llms.txt, /llms-full.txt, /corpus.jsonl, /learning-manifest.json, /md/<page>.md.
Source: bitcoinuniverseio/docs-inscribe@${commit} generated ${generatedAt}.
`,
)

// Copy the learning manifest into dist for the structured endpoint.
const manifestSrc = join(root, 'data', 'inscribe-learning.manifest.json')
if (existsSync(manifestSrc)) {
  mkdirSync(distDir, { recursive: true })
  writeFileSync(join(distDir, 'learning-manifest.json'), readFileSync(manifestSrc))
}

console.log(`machine-readable surfaces generated: ${pages.length} pages, corpus ${corpus.length} records, commit ${commit.slice(0, 12)}`)

// ---------------------------------------------------------------------------
// Service worker version + offline safety pack precache manifest.
// ---------------------------------------------------------------------------
const PRECACHE = [
  '/docs-inscribe/',
  '/docs-inscribe/start/what-you-can-create/',
  '/docs-inscribe/create/first-inscription/',
  '/docs-inscribe/create/what-it-costs/',
  '/docs-inscribe/create/workspaces/',
  '/docs-inscribe/safety/asset-safety/',
  '/docs-inscribe/safety/order-recovery/',
  '/docs-inscribe/recovery/navigator/',
  '/docs-inscribe/reference/protocol-data-status/',
  '/docs-inscribe/guided/',
  '/docs-inscribe/labs/protocols/',
  '/docs-inscribe/labs/transaction-review/',
  '/docs-inscribe/practice/',
  '/docs-inscribe/emergency-card.html',
  '/docs-inscribe/offline.html',
  '/docs-inscribe/learning-manifest.json',
  '/docs-inscribe/llms.txt',
]
const swSource = readFileSync(join(root, 'public', 'sw.js'), 'utf8')
  .replace("self.SW_VERSION ?? 'dev'", JSON.stringify(commit))
  .replace('self.__PRECACHE_MANIFEST ?? []', JSON.stringify(PRECACHE))
writeFileSync(join(distDir, 'sw.js'), swSource)
console.log('service worker versioned with the build commit and precache manifest')
