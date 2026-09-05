import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

test('the vendored learning archive matches its declared hash and provenance', () => {
  const meta = JSON.parse(readFileSync(join(root, 'vendor', 'inscribe-learning-0.1.0.tgz.meta.json'), 'utf8'))
  const archive = join(root, 'vendor', meta.archive)
  assert.ok(existsSync(archive), 'vendored archive is missing')
  const sha256 = createHash('sha256').update(readFileSync(archive)).digest('hex')
  assert.equal(sha256, meta.archiveSha256, 'archive bytes differ from the declared hash')
  assert.match(meta.sourceCommit, /^[0-9a-f]{40}$/)
})

test('the installed package surface loads and the manifest matches the repo copy', async () => {
  const L = await import('@universe/inscribe-learning')
  const installed = JSON.parse(readFileSync(join(root, 'node_modules', '@universe', 'inscribe-learning', 'data', 'inscribe-learning.manifest.json'), 'utf8'))
  const repo = JSON.parse(readFileSync(join(root, 'data', 'inscribe-learning.manifest.json'), 'utf8'))
  assert.deepEqual(installed, repo, 'the vendored package manifest has drifted from data/inscribe-learning.manifest.json')
  assert.equal(L.loadManifest().workflows.length, repo.workflows.length)
})
