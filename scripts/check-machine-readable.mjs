#!/usr/bin/env node
// Gate: the generated machine-readable surfaces exist, cover every public
// page, and carry no private details. Fails the build when a page is missing
// from the corpus or the artifacts are stale.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const docsDir = join(root, 'src', 'content', 'docs')
const problems = []

function countContentPages(dir) {
  let count = 0
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) count += countContentPages(full)
    else if (entry.endsWith('.md')) count += 1
  }
  return count
}

const pageCount = countContentPages(docsDir)

import { execFileSync } from 'node:child_process'
if (!existsSync(distDir) || !existsSync(join(distDir, 'corpus.jsonl'))) {
  execFileSync('npm', ['run', 'build'], { stdio: 'inherit', cwd: root })
}

for (const artifact of ['llms.txt', 'llms-full.txt', 'corpus.jsonl', 'skill.md', 'learning-manifest.json']) {
  if (!existsSync(join(distDir, artifact))) problems.push(`dist/${artifact} is missing (run the generator after the build)`)
}

if (existsSync(join(distDir, 'corpus.jsonl'))) {
  const corpus = readFileSync(join(distDir, 'corpus.jsonl'), 'utf8').trim().split('\n')
  if (corpus.length !== pageCount) {
    problems.push(`corpus has ${corpus.length} records for ${pageCount} content pages`)
  }
  const PRIVATE = [/api\.bitcoinuniverse\.io\/(?!health)/, /(?:password|secret|api[_-]?key|token)['"]?\s*[:=]\s*["'][A-Za-z0-9+/_-]{8,}["']/, /\b192\.168\.\d+\.\d+\b/, /\b10\.0\.\d+\.\d+\b/, /localhost:\d{3,}/, /hstgr\.cloud/, /ssh\s+root@/]
  for (const artifact of ['llms.txt', 'llms-full.txt', 'corpus.jsonl', 'skill.md']) {
    const full = join(distDir, artifact)
    if (!existsSync(full)) continue
    const text = readFileSync(full, 'utf8')
    for (const pattern of PRIVATE) {
      if (pattern.test(text)) problems.push(`dist/${artifact} matches private-detail pattern ${pattern}`)
    }
  }
}

if (problems.length > 0) {
  console.error(`check-machine-readable: ${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log(`check-machine-readable: corpus covers ${pageCount} pages with no private details`)
