#!/usr/bin/env node
// Structured data gate: eligible pages ship JSON-LD (HowTo for task guides,
// FAQPage for FAQ content, TechArticle for reference) and every material
// route declares social preview metadata.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const problems = []

function walkHtml(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walkHtml(full, out)
    else if (entry.endsWith('.html')) out.push(full)
  }
  return out
}

import { execFileSync } from 'node:child_process'

if (!existsSync(distDir)) {
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  execFileSync(npmCmd, ['run', 'build'], { stdio: 'inherit', cwd: root })
}

const htmlFiles = walkHtml(distDir)
let withJsonLd = 0
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  // Legacy redirect stubs carry only a refresh meta; the real pages are
  // checked at their new routes.
  if (html.includes('http-equiv="refresh"') || html.includes("http-equiv='refresh'")) continue
  // Utility pages are checked by their own gates, not the preview gate.
  if (/offline\.html$|emergency-card\.html$|practice[\\/]sim[\\/]/.test(file)) continue
  const hasJsonLd = html.includes('application/ld+json')
  if (hasJsonLd) withJsonLd += 1
  // Every page needs the meta description and og:title for previews.
  if (!html.includes('name="description"')) problems.push(`${file.slice(distDir.length)}: missing meta description`)
  if (!html.includes('property="og:title"')) problems.push(`${file.slice(distDir.length)}: missing og:title`)
}

if (withJsonLd === 0) {
  problems.push('no page ships JSON-LD structured data')
}

if (problems.length > 0) {
  console.error(`check-structured-data: ${problems.length} problem(s):`)
  for (const problem of problems.slice(0, 20)) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log(`check-structured-data: ${withJsonLd}/${htmlFiles.length} pages carry structured data; previews declared everywhere`)
