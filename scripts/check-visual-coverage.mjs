#!/usr/bin/env node
// Visual coverage gate: every released, actionable workspace has at least one
// walkthrough; every walkthrough's media exists; no media is orphaned.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadManifest } from '@universe/inscribe-learning'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = loadManifest()
const problems = []

// Released and actionable workspaces need walkthrough coverage.
const actionableWorkspaces = new Set(
  manifest.workflows.filter((w) => w.state.actionable).map((w) => w.workspace),
)
const coveredWorkflows = new Set(manifest.walkthroughs.map((w) => w.workflowId))
const coveredWorkspaces = new Set(
  manifest.workflows.filter((w) => coveredWorkflows.has(w.id)).map((w) => w.workspace),
)
for (const workspace of actionableWorkspaces) {
  if (!coveredWorkspaces.has(workspace)) {
    problems.push(`released actionable workspace /${workspace} has no primary-action walkthrough`)
  }
}

// Every walkthrough id resolves and its media exists with a text equivalent.
for (const walkthrough of manifest.walkthroughs) {
  const dir = join(root, 'public', 'walkthroughs', walkthrough.id)
  if (!existsSync(dir)) {
    problems.push(`walkthrough ${walkthrough.id}: no media directory public/walkthroughs/${walkthrough.id}`)
    continue
  }
  const files = readdirSync(dir)
  for (let step = 1; step <= walkthrough.steps; step += 1) {
    const name = `step-${String(step).padStart(2, '0')}.webp`
    if (!files.includes(name)) problems.push(`walkthrough ${walkthrough.id}: missing ${name}`)
  }
  if (!existsSync(join(dir, 'capture-manifest.json'))) {
    problems.push(`walkthrough ${walkthrough.id}: missing capture-manifest.json`)
  }
}

// No orphaned media.
const mediaDir = join(root, 'public', 'walkthroughs')
if (existsSync(mediaDir)) {
  const knownIds = new Set(manifest.walkthroughs.map((w) => w.id))
  for (const entry of readdirSync(mediaDir)) {
    if (entry === 'overviews' || entry === 'capture-run.json') continue
    if (statSync(join(mediaDir, entry)).isDirectory() && !knownIds.has(entry)) {
      problems.push(`orphaned media directory public/walkthroughs/${entry} is not referenced by the manifest`)
    }
  }
}

if (problems.length > 0) {
  console.error(`check-visual-coverage: ${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log(`check-visual-coverage: ${manifest.walkthroughs.length} walkthroughs cover ${coveredWorkspaces.size} workspaces`)
