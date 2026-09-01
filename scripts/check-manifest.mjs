#!/usr/bin/env node
// Keeps docs.manifest.json honest, and keeps it agreeing with the site.
//
// The authoritative schema lives in the docs-platform repository and is not a
// dependency here, so this checks the parts that can drift without anyone
// noticing: the shape the platform requires, and the places where the manifest
// makes a claim the build can contradict.
//
// Validate against the real schema from a checkout that has docs-platform
// beside it:
//
//   node ../docs-platform/packages/content-schema/bin/validate-manifest.mjs \
//     docs.manifest.json
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const manifest = JSON.parse(readFileSync(resolve(root, 'docs.manifest.json'), 'utf8'));
const config = readFileSync(resolve(root, 'astro.config.mjs'), 'utf8');

const failures = [];

const REQUIRED = [
  'schemaVersion',
  'id',
  'name',
  'classification',
  'repository',
  'documentationUrl',
  'docsRoot',
  'sourceRef',
  'lifecycle',
  'chains',
  'audiences',
  'owners',
  'securityClassification',
  'lastVerified',
];

for (const key of REQUIRED) {
  if (manifest[key] === undefined) failures.push(`missing required field "${key}"`);
}

// A stable, beta or deprecated component has to name what was released.
if (['stable', 'beta', 'deprecated'].includes(manifest.lifecycle)) {
  for (const key of ['releasedRef', 'releaseVersion']) {
    if (manifest[key] === undefined) {
      failures.push(`lifecycle "${manifest.lifecycle}" requires "${key}"`);
    }
  }
}

if (!/^[0-9a-f]{40}$/.test(manifest.lastVerified?.commit ?? '')) {
  failures.push('lastVerified.commit must be a 40-character lowercase hex commit id');
}

if (Number.isNaN(Date.parse(manifest.lastVerified?.timestamp ?? ''))) {
  failures.push('lastVerified.timestamp must be a date-time');
}

if (!/^https:\/\//.test(manifest.documentationUrl ?? '')) {
  failures.push('documentationUrl must be an https URL');
}

if (manifest.securityClassification !== 'public') {
  failures.push('this repository is public, so securityClassification must be "public"');
}

// The manifest points the portal at a live URL. The site builds itself at a
// base path. If those disagree the portal links land on a 404, which is the
// exact failure this check exists to prevent.
const base = /base:\s*'([^']+)'/.exec(config)?.[1];
const site = /site:\s*'([^']+)'/.exec(config)?.[1];
if (base !== undefined && site !== undefined) {
  const expected = `${site}${base}/`;
  if (manifest.documentationUrl !== expected) {
    failures.push(
      `documentationUrl is "${manifest.documentationUrl}" but the build publishes to "${expected}"`,
    );
  }
}

// docsRoot has to be where the content actually is.
if (manifest.docsRoot !== 'src/content/docs') {
  failures.push(`docsRoot is "${manifest.docsRoot}" but content lives in src/content/docs`);
}

// Every redirect the manifest promises the portal must also exist in the build,
// or an old link works on one surface and not the other.
const declared = new Set((manifest.redirects ?? []).map((r) => r.from));
const built = new Set([...config.matchAll(/'(\/[a-z0-9-]+)':\s*'\/docs-inscribe\//g)].map((m) => m[1]));

for (const from of declared) {
  if (!built.has(from)) failures.push(`manifest promises redirect "${from}" that astro.config.mjs does not serve`);
}
for (const from of built) {
  if (!declared.has(from)) failures.push(`astro.config.mjs serves redirect "${from}" that the manifest does not declare`);
}

if (failures.length > 0) {
  console.error(`manifest check: ${failures.length} problem(s)\n`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

console.log(
  `manifest check: ${manifest.id} (${manifest.lifecycle}), ${declared.size} redirects agreeing with the build`,
);
