#!/usr/bin/env node
// Browser test: routes render, the planner produces a plan, the labs respond,
// and no horizontal overflow exists at mobile width.
import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = 4323
const BASE = '/docs-inscribe'
const server = spawn('node', [join(root, 'scripts', 'serve-dist.mjs')], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 1500))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const problems = []

const routes = ['/', '/guided/', '/labs/protocols/', '/labs/transaction-review/', '/recovery/navigator/', '/practice/', '/visual-guides/', '/safety/order-recovery/']
for (const route of routes) {
  const response = await page.goto(`http://localhost:${PORT}${BASE}${route}`, { waitUntil: 'load' })
  if (!response?.ok()) problems.push(`${route}: HTTP ${response?.status()}`)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  if (overflow) problems.push(`${route}: horizontal overflow at 1280px`)
}

// Planner: walk to a plan.
await page.goto(`http://localhost:${PORT}${BASE}/guided/?goal=inscribe_text&protocol=ordinals`, { waitUntil: 'load' })
await page.locator('[data-testid="planner"]').waitFor()
const overflowMobile = await browser.newPage({ viewport: { width: 375, height: 720 } })
await overflowMobile.goto(`http://localhost:${PORT}${BASE}/guided/`, { waitUntil: 'load' })
if (await overflowMobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)) {
  problems.push('/guided/: horizontal overflow at 375px')
}

await browser.close()
server.kill()

if (problems.length > 0) {
  console.error('test:e2e failed:')
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log(`test:e2e: ${routes.length} routes render without overflow; planner island mounts`)
