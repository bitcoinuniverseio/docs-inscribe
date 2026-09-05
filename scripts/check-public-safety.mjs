#!/usr/bin/env node
// Public-safety scan.
//
// The wallet source is private. This documentation is public. Anything that
// leaks a private hostname, an internal address, an operational runbook detail,
// or a credential shape out of that source is a disclosure, not a typo.
//
// Run: node scripts/check-public-safety.mjs

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];

const ALLOWED_HOSTS = new Set([
  'bitcoinuniverse.io',
  'docs.bitcoinuniverse.io',
  'inscribe.bitcoinuniverse.io',
  'github.com',
  'bitcoinuniverseio.github.io',
  'chromewebstore.google.com',
  'json-schema.org',
  'docs.astro.build',
  'astro.build',
  'nodejs.org',
  'www.w3.org',
  'fonts.googleapis.com',
  'creativecommons.org',
  'developer.mozilla.org',
  'www.sitemaps.org',
  // The JSON-LD vocabulary identifier. Declared, never fetched.
  'schema.org',
  // Local development only. Never a destination in published content.
  'localhost',
]);

const RULES = [
  {
    name: 'private IPv4 address',
    re: /\b(?:10|127)\.\d{1,3}\.\d{1,3}\.\d{1,3}\b|\b192\.168\.\d{1,3}\.\d{1,3}\b|\b172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}\b/,
  },
  { name: 'GitHub token shape', re: /\bgh[pousr]_[A-Za-z0-9]{16,}\b/ },
  { name: 'AWS access key shape', re: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'private key block', re: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'bearer token assignment', re: /\b(?:authorization|api[_-]?key|secret|password)\s*[:=]\s*["'][^"'\s]{12,}["']/i },
  { name: 'internal admin route', re: /\/(?:__internal|internal-admin|_ops|ops-runbook)\b/i },
  { name: 'env file contents', re: /^\s*(?:export\s+)?[A-Z][A-Z0-9_]{6,}=(?!\s*$)\S+/m },
  {
    name: 'a real-looking mainnet address in an example',
    // Examples must be visibly truncated. A full-length address invites someone
    // to paste it, and a documentation example is never a destination.
    re: /\b(?:bc1[qp][ac-hj-np-z02-9]{38,}|[13][a-km-zA-HJ-NP-Z1-9]{32,34})\b/,
  },
];

const TEXT_EXT = /\.(md|mdx|astro|css|mjs|js|ts|json|yml|yaml|txt|html)$/;

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (name === 'node_modules' || name === '.git' || name === 'dist' || name === '.astro') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (TEXT_EXT.test(name)) out.push(full);
  }
  return out;
}

const files = [
  ...walk(join(root, 'src')),
  ...walk(join(root, '.github')),
  ...['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'SUPPORT.md', 'llms.txt', 'docs.manifest.json']
    .map((f) => join(root, f))
    .filter((f) => {
      try {
        statSync(f);
        return true;
      } catch {
        return false;
      }
    }),
];

const hostRe = /https?:\/\/([a-z0-9.-]+)/gi;

for (const file of files) {
  const rel = relative(root, file).split('\\').join('/');
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');

  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    for (const rule of RULES) {
      if (rule.re.test(line)) problems.push(`${at} looks like a ${rule.name}.`);
    }
    for (const m of line.matchAll(hostRe)) {
      const host = m[1].toLowerCase();
      if (!ALLOWED_HOSTS.has(host)) {
        problems.push(`${at} links to an unlisted host: ${host}. Add it to ALLOWED_HOSTS if it is public and intended.`);
      }
    }
  });
}

if (problems.length) {
  process.stderr.write(`Public safety: ${problems.length} problem(s).\n\n`);
  for (const p of problems) process.stderr.write(`  ${p}\n`);
  process.stderr.write('\n');
  process.exit(1);
}

process.stdout.write(`Public safety pass. ${files.length} files checked.\n`);
