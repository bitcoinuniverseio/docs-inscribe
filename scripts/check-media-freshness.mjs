#!/usr/bin/env node
// Media freshness gate: every walkthrough's capture manifest pins an app
// commit and file hashes, and that commit matches the walkthrough registry.
// A screenshot whose app commit does not match its declared capture manifest
// is stale and fails the build.
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadManifest } from '@universe/inscribe-learning'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = loadManifest()
const problems = []

for (const walkthrough of manifest.walkthroughs) {
  const capturePath = join(root, 'public', 'walkthroughs', walkthrough.id, 'capture-manifest.json')
  if (!existsSync(capturePath)) continue // coverage gate reports the gap
  const capture = JSON.parse(readFileSync(capturePath, 'utf8'))

  if (capture.appCommit !== walkthrough.captureCommit) {
    problems.push(`walkthrough ${walkthrough.id}: registry says app commit ${walkthrough.captureCommit.slice(0, 12)}, capture manifest says ${String(capture.appCommit).slice(0, 12)}`)
  }
  if (capture.fixtureVersion !== walkthrough.fixtureVersion) {
    problems.push(`walkthrough ${walkthrough.id}: fixture version drift`)
  }
  for (const file of capture.files ?? []) {
    const full = join(root, 'public', 'walkthroughs', walkthrough.id, file.path)
    if (!existsSync(full)) {
      problems.push(`walkthrough ${walkthrough.id}: capture manifest lists missing file ${file.path}`)
      continue
    }
    const sha256 = createHash('sha256').update(readFileSync(full)).digest('hex')
    if (sha256 !== file.sha256) {
      problems.push(`walkthrough ${walkthrough.id}: ${file.path} does not match its capture hash (changed or corrupt media)`)
    }
  }
  for (const required of ['altTexts', 'stepInstructions']) {
    if (!Array.isArray(capture[required]) || capture[required].length < walkthrough.steps) {
      problems.push(`walkthrough ${walkthrough.id}: capture manifest lacks complete ${required}`)
    }
  }
}

if (problems.length > 0) {
  console.error(`check-media-freshness: ${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log(`check-media-freshness: all captures match their declared app commits and hashes`)
