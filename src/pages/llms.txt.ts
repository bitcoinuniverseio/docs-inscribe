// llms.txt, generated from the content collection rather than maintained by
// hand, so it cannot list a page that does not exist or miss one that does.
// Every URL is absolute, as the convention requires.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import coverage from '../data/protocol-coverage.json';
import workspaces from '../data/workspaces.json';

const SITE = 'https://bitcoinuniverseio.github.io/docs-inscribe';

// The order sections appear in, and what each is for. A section not listed here
// still appears, under "Other", so a new directory cannot vanish silently.
const SECTIONS: Array<[string, string, string]> = [
  ['start', 'Start here', 'What the product is, what to know before spending, and a first inscription'],
  ['concepts', 'How it works', 'Addresses, quote anatomy, the order lifecycle, asset safety, and data freshness'],
  ['create', 'Task guides', 'Inscribing, batching, collections, deploys, mints, etches and transfers'],
  ['protocols', 'Protocol reference', 'The generated coverage matrix and the protocol families'],
  ['manage', 'Hold and recover', 'Portfolio, pending orders, recovery routes, advanced transaction tools'],
  ['reference', 'Reference', 'Workspace map, wallet matrix, fee tiers, order states, glossary'],
  ['troubleshooting', 'When it goes wrong', 'Failure states and common problems'],
  ['about', 'About this product', 'Accessibility, performance, release evidence, changelog, migration'],
];

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const byId = new Map(docs.map((d) => [d.id, d]));

  const url = (id: string) => `${SITE}/${id}/`;
  const line = (id: string) => {
    const entry = byId.get(id);
    if (entry === undefined) return null;
    return `- [${entry.data.title}](${url(id)}): ${entry.data.description ?? ''}`;
  };

  const used = new Set<string>(['index', '404']);
  const parts: string[] = [];

  parts.push('# Universe Inscribe documentation');
  parts.push('');
  parts.push(
    '> Documentation for Universe Inscribe, the Bitcoin Universe creation studio: inscribe files and text, deploy and mint tokens, etch runes, and transfer assets across Bitcoin protocols. Every action that writes to the chain is itemised and totalled before the user signs, and no automatic funding flow spends an output holding an inscription, rune or token balance to pay a fee.',
  );
  parts.push('');
  parts.push(`The product itself is at https://inscribe.bitcoinuniverse.io and this site documents it. Inscribe is the creation half of Bitcoin Universe; Core is the trading half. The two are independent: a protocol that can be created here may not be tradeable there, and this documentation never uses one to imply the other.`);
  parts.push('');
  parts.push('## Facts');
  parts.push('');
  parts.push(`- Lifecycle: stable. Released continuously from verified commits; there is no version number to quote.`);
  parts.push(`- Chains: Bitcoin mainnet, and Dogecoin protocols behind a deployment gate.`);
  parts.push(
    `- Protocols with a creation surface in the Bitcoin Universe registry: ${coverage.counts.protocolsWithInscribeSurface} of ${coverage.counts.protocolsTotal}.`,
  );
  parts.push(
    `- Of those, ${Object.values(workspaces.protocols).filter((w) => w.route !== null).length} have a workspace in the shipped app and ${Object.values(workspaces.protocols).filter((w) => w.production === 'not-implemented').length} are recognised read-only with no way to create them.`,
  );
  parts.push(
    `- Creation operations recorded across all protocols: ${coverage.operations.join(', ')}.`,
  );
  parts.push(
    `- Registry provenance: ${coverage.provenance.repository} at ${coverage.provenance.sourceCommit}, path ${coverage.provenance.sourcePath}.`,
  );
  parts.push(
    `- A quote has three lines and only two are fees: the network fee (rate times size, to miners), the service fee (a flat 1,500 satoshis for most actions, to Universe), and the inscription output (546 satoshis by default, which stays with the owner).`,
  );
  parts.push(
    `- Most flows are commit and reveal: the user signs once, paying a one-time commit address, and the reveal is signed by a key held for that order alone.`,
  );
  parts.push(
    `- There is no cancelled or expired order state. The one-hour window is the life of the price quote, not the order, and the signing key is not discarded when it passes.`,
  );
  parts.push('');

  for (const [dir, label, blurb] of SECTIONS) {
    const ids = docs
      .map((d) => d.id)
      .filter((id) => id.startsWith(`${dir}/`))
      .sort();
    if (ids.length === 0) continue;
    parts.push(`## ${label}`);
    parts.push('');
    parts.push(blurb);
    parts.push('');
    for (const id of ids) {
      const l = line(id);
      if (l !== null) {
        parts.push(l);
        used.add(id);
      }
    }
    parts.push('');
  }

  const leftover = docs.map((d) => d.id).filter((id) => !used.has(id) && !id.includes('/')).sort();
  const nested = docs.map((d) => d.id).filter((id) => !used.has(id) && id.includes('/')).sort();
  const other = [...leftover, ...nested];
  if (other.length > 0) {
    parts.push('## Other');
    parts.push('');
    for (const id of other) {
      const l = line(id);
      if (l !== null) parts.push(l);
    }
    parts.push('');
  }

  parts.push('## Optional');
  parts.push('');
  parts.push(`- [Homepage](${SITE}/): entry points and what the product promises`);
  parts.push(`- [Sitemap](${SITE}/sitemap-index.xml): every page on this site`);
  parts.push(
    `- [Bitcoin Universe documentation](https://docs.bitcoinuniverse.io): the central platform, including Core and trading availability`,
  );
  parts.push(
    `- [Source repository](https://github.com/bitcoinuniverseio/docs-inscribe): this documentation, including the data files the coverage claims are generated from`,
  );
  parts.push('');

  return new Response(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
