#!/usr/bin/env node
// Copy rules for docs-inscribe, enforced rather than trusted.
//
// The wallet product enforces the same rules on its own interface copy and its
// store listing. Documentation that drifts from them starts describing a
// different product than the one the reader is holding.
//
// Run: node scripts/check-copy-rules.mjs

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];

const SCAN_DIRS = ['src', 'scripts', '.github'];
const SCAN_FILES = ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'SUPPORT.md', 'llms.txt'];
const TEXT_EXT = /\.(md|mdx|astro|css|mjs|js|ts|json|yml|yaml|txt|html)$/;

// Rule 1: the em dash is prohibited outright, in every file, including code.
const EM_DASH = /\u2014/;

// Rule 2: one word is prohibited in prose. The HTML rel attribute is required
// markup and is allowed.
const BANNED_WORD = /\bcanonical(ly|ise|ize|ised|ized)?\b/i;
const BANNED_WORD_ALLOWED = /rel=["']?canonical|canonical-url|"canonical"/i;

// Rule 3: claims a wallet cannot keep, and marketing register.
const UNVERIFIABLE = [
  /\b(?:the\s+)?(?:most|best|fastest|safest|easiest|leading|world['\u2019]s)\s+\w+\s+wallet\b/i,
  /\b100%\s+(?:safe|secure|private|guaranteed)\b/i,
  /\bunhackable\b/i,
  /\bmilitary[- ]grade\b/i,
  /\bbank[- ]grade\s+security\b/i,
  /\bnever\s+lose\s+(?:your\s+)?(?:funds|money|coins)\b/i,
  /\bguarantee[sd]?\s+(?:your\s+)?(?:safety|security|funds)\b/i,
  /\bcoming\s+soon\b/i,
  /\bTODO\b/,
  /\bTBD\b/,
  /\bplaceholder\b/i,
  /\blorem ipsum\b/i,
];
// "coming soon" is quotable when reporting what the product itself displays.
const UNVERIFIABLE_ALLOWED = /shown as coming soon|marked coming soon|reading .?coming soon|`Coming soon`|\*\*coming soon\*\*|as \*\*coming soon\*\*|says? coming soon/i;

// Rule 4: no emoji anywhere. Status is carried by words.
const EMOJI =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{1F000}-\u{1F0FF}]/u;

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
  ...SCAN_DIRS.flatMap((d) => walk(join(root, d))),
  ...SCAN_FILES.map((f) => join(root, f)).filter((f) => {
    try {
      statSync(f);
      return true;
    } catch {
      return false;
    }
  }),
];

for (const file of files) {
  const rel = relative(root, file).split('\\').join('/');
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    if (EM_DASH.test(line)) {
      problems.push(`${at} contains an em dash. Use a comma, a colon, a period, or parentheses.`);
    }
    if (BANNED_WORD.test(line) && !BANNED_WORD_ALLOWED.test(line)) {
      problems.push(
        `${at} uses the prohibited word. Say authoritative, owning, official, or the source of truth.`,
      );
    }
    if (EMOJI.test(line)) {
      problems.push(`${at} contains an emoji. Status is carried by words, not pictures.`);
    }
    if (rel.endsWith('.md') || rel.endsWith('.mdx') || rel === 'llms.txt') {
      for (const pattern of UNVERIFIABLE) {
        if (pattern.test(line) && !UNVERIFIABLE_ALLOWED.test(line)) {
          problems.push(`${at} matches a prohibited claim or filler pattern: ${pattern}`);
        }
      }
    }
  });
}

if (problems.length) {
  process.stderr.write(`Copy rules: ${problems.length} problem(s).\n\n`);
  for (const p of problems) process.stderr.write(`  ${p}\n`);
  process.stderr.write('\n');
  process.exit(1);
}

process.stdout.write(`Copy rules pass. ${files.length} files checked.\n`);
