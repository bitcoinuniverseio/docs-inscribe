#!/usr/bin/env node
// Capability-truth gate.
//
// This site makes one kind of claim that is expensive to get wrong: that
// Inscribe can create a given asset on a given protocol. Two files carry
// that claim, and neither is prose:
//
//   src/data/protocol-coverage.json  what the Core protocol registry records
//   src/data/workspaces.json         what the shipped app actually exposes
//
// This script fails the build when they disagree, when a protocol page
// declares operations the registry does not record, or when a page claims a
// protocol that has no inscribe surface at all. Code presence is not released
// capability, so a workspace being gated has to be carried through to the
// page rather than quietly dropped.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const coverage = JSON.parse(readFileSync(resolve(root, 'src/data/protocol-coverage.json'), 'utf8'));
const workspaces = JSON.parse(readFileSync(resolve(root, 'src/data/workspaces.json'), 'utf8'));

const failures = [];
const byId = new Map(coverage.inscribable.map((p) => [p.id, p]));
const notInscribable = new Set(coverage.notInscribable.map((p) => p.id));

// 1. Every protocol in the workspace overlay must have an inscribe surface in
//    the registry. Claiming a creation workspace for a protocol the registry
//    does not record as creatable is the exact error this file exists to stop.
for (const id of Object.keys(workspaces.protocols)) {
  if (byId.has(id)) continue;
  failures.push(
    notInscribable.has(id)
      ? `workspaces.json: "${id}" has no inscribe surface in the registry, so it cannot carry a creation workspace`
      : `workspaces.json: "${id}" is not a protocol in the registry at all`,
  );
}

// 2. Every protocol the registry records as creatable must be accounted for
//    in the overlay, even if the answer is "no workspace". Silence would let
//    a protocol disappear from the site without anyone deciding that.
for (const id of byId.keys()) {
  if (workspaces.protocols[id] === undefined) {
    failures.push(
      `workspaces.json: "${id}" has an inscribe surface in the registry but is not accounted for. Add it, with route null if it has no workspace.`,
    );
  }
}

// 3. A protocol with no route must not claim a workspace, and one with a
//    route must name it. Every protocol must carry a production state the
//    site knows how to render, because that state is what decides whether a
//    page may describe the operation as something a reader can do today.
const PRODUCTION_STATES = new Set(Object.keys(workspaces.productionStates));

for (const [id, entry] of Object.entries(workspaces.protocols)) {
  const hasRoute = entry.route !== null && entry.route !== undefined;
  const hasWorkspace = entry.workspace !== null && entry.workspace !== undefined;
  if (hasRoute !== hasWorkspace) {
    failures.push(`workspaces.json: "${id}" must have both a route and a workspace name, or neither`);
  }
  if (!hasRoute && entry.note === undefined) {
    failures.push(`workspaces.json: "${id}" has no workspace and must say why in "note"`);
  }
  if (entry.sharedWith !== undefined && workspaces.protocols[entry.sharedWith] === undefined) {
    failures.push(`workspaces.json: "${id}" is shared with unknown protocol "${entry.sharedWith}"`);
  }
  if (!PRODUCTION_STATES.has(entry.production)) {
    failures.push(
      `workspaces.json: "${id}" has production state "${entry.production}", which is not defined in productionStates`,
    );
  }
  // "not-implemented" and "has a workspace" are contradictory claims.
  if ((entry.production === 'not-implemented') === hasRoute) {
    failures.push(
      `workspaces.json: "${id}" is marked ${entry.production} but ${hasRoute ? 'has' : 'has no'} a workspace route`,
    );
  }
  // Anything the contract has not released must say so in prose as well, so
  // the reason reaches the page rather than only the colour of a chip.
  if (entry.production === 'incomplete' && entry.note === undefined) {
    failures.push(`workspaces.json: "${id}" is not released and must explain what a reader sees instead in "note"`);
  }
}

// 4. Any content page that declares protocols in its frontmatter must declare
//    operations the registry actually records for them.
const OPERATIONS = new Set(coverage.operations);
const contentRoot = resolve(root, 'src/content/docs');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.mdx?$/.test(entry)) out.push(full);
  }
  return out;
}

for (const file of walk(contentRoot)) {
  const text = readFileSync(file, 'utf8');
  const front = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (front === null) continue;
  const rel = file.slice(root.length + 1).replace(/\\/g, '/');

  // protocols: [runes, mezcal]
  const declared = /^protocols:\s*\[([^\]]*)\]/m.exec(front[1]);
  if (declared !== null) {
    for (const raw of declared[1].split(',')) {
      const id = raw.trim().replace(/^["']|["']$/g, '');
      if (id === '') continue;
      if (!byId.has(id)) {
        failures.push(`${rel}: declares protocol "${id}", which has no inscribe surface in the registry`);
      }
    }
  }

  // operations: [etch, mint, transfer]
  const ops = /^operations:\s*\[([^\]]*)\]/m.exec(front[1]);
  if (ops !== null) {
    for (const raw of ops[1].split(',')) {
      const op = raw.trim().replace(/^["']|["']$/g, '');
      if (op === '') continue;
      if (!OPERATIONS.has(op)) {
        failures.push(
          `${rel}: declares operation "${op}", which no protocol records in the registry (known: ${[...OPERATIONS].join(', ')})`,
        );
      }
    }
  }

  // When a page declares both, every operation must be recorded for at least
  // one of the protocols the page is about.
  if (declared !== null && ops !== null) {
    const ids = declared[1]
      .split(',')
      .map((s) => s.trim().replace(/^["']|["']$/g, ''))
      .filter((s) => s !== '' && byId.has(s));
    const available = new Set(ids.flatMap((id) => byId.get(id).creation));
    for (const raw of ops[1].split(',')) {
      const op = raw.trim().replace(/^["']|["']$/g, '');
      if (op === '' || available.has(op)) continue;
      failures.push(
        `${rel}: claims "${op}" for [${ids.join(', ')}], but the registry records none of them supporting it`,
      );
    }
  }
}

// 5. The provenance of the generated file must survive. A coverage file with
//    no source commit cannot be checked against anything later.
if (!/^[0-9a-f]{40}$/.test(coverage.provenance?.sourceCommit ?? '')) {
  failures.push('protocol-coverage.json: provenance.sourceCommit must be a 40-character commit id');
}

if (failures.length > 0) {
  console.error(`capability truth: ${failures.length} problem(s)\n`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}

const gated = Object.values(workspaces.protocols).filter((p) => p.gated === true).length;
const none = Object.values(workspaces.protocols).filter((p) => p.route === null).length;
console.log(
  `capability truth: ${byId.size} protocols with an inscribe surface, ${Object.keys(workspaces.protocols).length} accounted for, ${gated} gated, ${none} with no creation workspace`,
);
