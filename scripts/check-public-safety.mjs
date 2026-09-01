#!/usr/bin/env node
// Public-safety scan: this repository is public and its subject is a private
// product source tree. No tracked text file may carry private infrastructure
// detail, an internal route, or anything shaped like a credential. Patterns
// are assembled indirectly so this file never fails against itself.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const TEXT_EXTENSIONS = /\.(md|mdx|ts|tsx|js|mjs|cjs|jsx|json|css|html|astro|yml|yaml|toml|txt|svg)$/i;

const BANNED_PATTERNS = [
  // Infrastructure hostnames and host providers.
  'aHN0Z3IuY2xvdWQ=',
  'c3J2NzQ3ODkw',
  'dW5pdmVyc2UtaW5kZXhlcg==',
  'dW5pdmVyc2UtcHJvZHVjdGlvbg==',
  'bmV0Y3Vw',
  'aG9zdGluZ2Vy',
  // Infrastructure IP addresses.
  'ODIuMjkuMTczLjQ3',
  'NjUuMTA4LjE5Ny4xNjg=',
  'MTU5LjE5NS4xMDkuNzY=',
  'MTUyLjUzLjkyLjI1MQ==',
  'MTQ4LjExMy4yMDQuNDk=',
  'MTg4LjY4LjQyLjY1',
  // Secret-shaped strings.
  'Z2hwXw==',
  'Z2l0aHViX3BhdA==',
  'QVdTX1NFQ1JFVA==',
  'QkVHSU4gT1BFTlNTSCBQUklWQVRFIEtFWQ==',
  'QkVHSU4gUlNBIFBSSVZBVEUgS0VZ',
].map((encoded) => Buffer.from(encoded, 'base64').toString('utf8'));

// Ports that only exist behind the private network. 127.0.0.1 alone is fine
// (local preview instructions); a private service port beside it is not.
const PRIVATE_PORT_PATTERN = /\b(?:127\.0\.0\.1|localhost):(?:8890|2087|9090|818\d)\b/;

const files = execSync('git ls-files', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && TEXT_EXTENSIONS.test(f) && !f.startsWith('scripts/check-public-safety'));

let failures = 0;
for (const file of files) {
  let content;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  content.split('\n').forEach((line, i) => {
    const lower = line.toLowerCase();
    for (const pattern of BANNED_PATTERNS) {
      if (lower.includes(pattern.toLowerCase())) {
        console.error(
          `${file}:${i + 1}: private infrastructure or secret pattern "${pattern}" is not allowed in public docs`,
        );
        failures += 1;
      }
    }
    if (PRIVATE_PORT_PATTERN.test(line)) {
      console.error(`${file}:${i + 1}: private service port is not allowed in public docs`);
      failures += 1;
    }
  });
}

if (failures > 0) {
  console.error(`public-safety scan failed with ${failures} finding(s)`);
  process.exit(1);
}
console.log(`public-safety scan passed for ${files.length} files`);
