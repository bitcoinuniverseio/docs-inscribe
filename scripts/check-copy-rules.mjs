#!/usr/bin/env node
// Repository copy guard: rejects the long horizontal dash character
// (U+2014), one banned marketing word, and a list of generic marketing and
// assistant-voice phrases, in tracked source and documentation files. Every
// pattern is constructed indirectly so this file never holds one literally
// and never fails against itself.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const TEXT_EXTENSIONS = /\.(md|mdx|ts|tsx|js|mjs|cjs|jsx|json|css|html|astro|yml|yaml|toml|txt|svg)$/i;
const LONG_DASH = String.fromCharCode(0x2014);
const BANNED_WORD = new RegExp('\\b' + ['can', 'oni', 'cal'].join('') + '\\b', 'i');

// Generic marketing and assistant-voice phrases. Each one says nothing a
// reader can check, which is the opposite of what this product is for.
// Base64 so this guard does not trip over its own rule list.
const BANNED_PHRASES = [
  'dW5sb2NrIHRoZSBmdXR1cmU=',
  'c2VhbWxlc3MgZXhwZXJpZW5jZQ==',
  'cmV2b2x1dGlvbmFyeQ==',
  'Z2FtZS1jaGFuZ2luZw==',
  'Y3V0dGluZy1lZGdl',
  'bmV4dC1nZW5lcmF0aW9u',
  'cmVkZWZpbmUgb3duZXJzaGlw',
  'ZW5kbGVzcyBwb3NzaWJpbGl0aWVz',
  'dW5sZWFzaCBjcmVhdGl2aXR5',
  'dGhlIGZ1dHVyZSBpcyBoZXJl',
  'ZW1iYXJrIG9uIGEgam91cm5leQ==',
  'b25lLXN0b3A=',
  'cG93ZXJmdWwgcGxhdGZvcm0=',
  'aW5ub3ZhdGl2ZSBlY29zeXN0ZW0=',
  'ZWZmb3J0bGVzc2x5',
  'd29ybGQtY2xhc3M=',
  'YmVzdC1pbi1jbGFzcw==',
  'c3RhdGUtb2YtdGhlLWFydA==',
  'c3VwZXJjaGFyZ2U=',
  'ZGVsdmUgaW50bw==',
  'Zm9tbw==',
  'Y29taW5nIHNvb24=',
]
  .map((encoded) => Buffer.from(encoded, 'base64').toString('utf8'))
  .map((phrase) => ({
    phrase,
    // Every phrase is letters, spaces and hyphens only, none of which are
    // regular expression metacharacters, so no escaping is needed. The word
    // boundaries stop a short entry from matching inside an integrity hash.
    pattern: new RegExp('\\b' + phrase + '\\b', 'i'),
  }));

const files = execSync('git ls-files', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && TEXT_EXTENSIONS.test(f) && !f.startsWith('scripts/check-copy-rules'));

let failures = 0;
for (const file of files) {
  let content;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  // CONTRIBUTING.md has to name the banned word in order to tell a contributor
  // not to use it. A rule nobody can state is a rule nobody can follow, so this
  // one file is exempt from the word check and from nothing else.
  const mayNameTheWord = file === 'CONTRIBUTING.md';

  content.split('\n').forEach((line, i) => {
    if (line.includes(LONG_DASH)) {
      console.error(`${file}:${i + 1}: long dash character U+2014 is not allowed`);
      failures += 1;
    }
    if (!mayNameTheWord && BANNED_WORD.test(line)) {
      console.error(`${file}:${i + 1}: banned word is not allowed`);
      failures += 1;
    }
    for (const entry of BANNED_PHRASES) {
      if (entry.pattern.test(line)) {
        console.error(
          `${file}:${i + 1}: generic marketing phrase "${entry.phrase}" is not allowed`,
        );
        failures += 1;
      }
    }
  });
}

if (failures > 0) {
  console.error(`copy guard failed with ${failures} finding(s)`);
  process.exit(1);
}
console.log(`copy guard passed for ${files.length} files`);
