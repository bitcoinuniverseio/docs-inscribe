#!/usr/bin/env node
// Per-page provenance gate: every material page carries a title, a
// description, and a last-verified date. Navigation-only pages may opt out
// with `provenance: false` in frontmatter.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = join(root, 'src', 'content', 'docs')
const problems = []
let pages = 0

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (full.endsWith('.md') || full.endsWith('.mdx')) check(full)
  }
}

function check(file) {
  pages += 1
  const source = readFileSync(file, 'utf8')
  const match = /^---\n([\s\S]*?)\n---/.exec(source)
  const rel = file.slice(root.length + 1)
  if (!match) {
    problems.push(`${rel}: missing frontmatter`)
    return
  }
  const fm = match[1]
  if (!/^title:/m.test(fm)) problems.push(`${rel}: missing title`)
  if (!/^description:/m.test(fm)) problems.push(`${rel}: missing description`)
  const noProvenance = /^provenance:\s*false$/m.test(fm)
  if (!noProvenance && !/^lastVerified:\s*\d{4}-\d{2}-\d{2}/m.test(fm)) {
    problems.push(`${rel}: missing lastVerified date`)
  }
  if (/\bTODO\b|\bTBD\b|\bplaceholder\b/i.test(source)) {
    problems.push(`${rel}: contains placeholder text`)
  }
}

walk(docsDir)

if (problems.length > 0) {
  console.error(`check-manifest: ${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log(`check-manifest: ${pages} pages carry provenance`)
