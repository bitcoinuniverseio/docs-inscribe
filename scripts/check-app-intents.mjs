#!/usr/bin/env node
// App intent gate: every workflow's handoff URL is built through the shared
// safe-link builder, round-trips through a parse, and carries none of the
// forbidden values. A deep link can open a workspace; it can never create an
// order, connect a wallet, sign, pay, or broadcast.
import { readFileSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadManifest, buildInscribeLink, parseInscribeLink } from '@universe/inscribe-learning'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = loadManifest()
const problems = []
const FORBIDDEN = ['address', 'receiver', 'order', 'tx', 'amount', 'psbt', 'capability', 'token=']

for (const workflow of manifest.workflows) {
  let href
  try {
    href = buildInscribeLink({
      appOrigin: manifest.appOrigin,
      intent: { workspace: workflow.workspace, sub: workflow.subview, ...workflow.intent, network: 'mainnet' },
      docsReturnOrigins: manifest.docsReturnOrigins,
    })
  } catch (error) {
    problems.push(`${workflow.id}: builder rejected the intent (${error.message})`)
    continue
  }
  try {
    const parsed = parseInscribeLink(href)
    if (parsed.workspace !== workflow.workspace) problems.push(`${workflow.id}: workspace did not round-trip`)
  } catch (error) {
    problems.push(`${workflow.id}: parser rejected the generated link (${error.message})`)
  }
  for (const forbidden of FORBIDDEN) {
    if (href.includes(forbidden)) problems.push(`${workflow.id}: link contains forbidden parameter ${forbidden}`)
  }
  if (!href.startsWith('https://')) problems.push(`${workflow.id}: link is not https`)
}

// Practice scenario handoffs: ids must survive URL encoding round-trip.
for (const scenario of manifest.practiceScenarios) {
  const url = new URL(`/practice/?scenario=${encodeURIComponent(scenario.id)}`, 'https://bitcoinuniverseio.github.io')
  const decoded = decodeURIComponent(url.searchParams.get('scenario'))
  if (decoded !== scenario.id) problems.push(`scenario ${scenario.id} does not round-trip`)
}

if (problems.length > 0) {
  console.error(`check-app-intents: ${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log(`check-app-intents: ${manifest.workflows.length} handoff links proven against the app contract`)
