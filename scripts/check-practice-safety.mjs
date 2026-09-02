#!/usr/bin/env node
// Practice safety gate: the published practice artifact must be the audited
// build from a declared inscribe commit, with a connect-src 'none' policy, a
// clean safety audit, and scenario ids that match the public registry.
import { readFileSync, existsSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadManifest } from '@universe/inscribe-learning'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const simDir = join(root, 'public', 'practice', 'sim')
const problems = []

const htmlPath = join(simDir, 'practice.html')
if (!existsSync(htmlPath)) {
  console.error('check-practice-safety: public/practice/sim/practice.html is missing. Run the inscribe practice build and import it.')
  process.exit(1)
}
const html = readFileSync(htmlPath, 'utf8')
if (!/connect-src\s+'none'/.test(html)) problems.push('practice.html lacks the connect-src none policy')
if (!/form-action\s+'none'/.test(html)) problems.push('practice.html lacks the form-action none policy')

const manifestPath = join(simDir, 'practice-manifest.json')
if (!existsSync(manifestPath)) {
  problems.push('practice-manifest.json is missing: the artifact must be the audited build')
} else {
  const audit = JSON.parse(readFileSync(manifestPath, 'utf8'))
  if (audit.safetyClean !== true) problems.push('the bundled artifact did not pass its safety audit')
  if (!/^[0-9a-f]{40}$/.test(audit.sourceCommit ?? '')) problems.push('artifact source commit is missing')

  // The artifact's scenarios must match the public registry.
  const registry = JSON.parse(readFileSync(join(root, 'data', 'practice-scenarios.json'), 'utf8'))
  const registryIds = registry.scenarios.map((s) => s.id).sort().join(',')
  const artifactIds = (audit.scenarioIds ?? []).slice().sort().join(',')
  if (registryIds !== artifactIds) problems.push('artifact scenario ids do not match the public registry')

  // The manifest's declared inscribe commit must match the learning manifest.
  const learning = loadManifest()
  if (audit.sourceCommit !== learning.sourceCommits.inscribe) {
    problems.push(`artifact was built from inscribe ${String(audit.sourceCommit).slice(0, 12)}, learning manifest pins ${learning.sourceCommits.inscribe.slice(0, 12)}`)
  }
}

if (problems.length > 0) {
  console.error(`check-practice-safety: ${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log('check-practice-safety: the published artifact is the audited, network-free build from the pinned commit')
