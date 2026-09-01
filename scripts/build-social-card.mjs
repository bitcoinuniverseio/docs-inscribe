#!/usr/bin/env node
// Builds public/social-card.png, the 1200x630 image link previews show.
//
// Drawn here rather than by hand so it always uses the real mark and the real
// palette. It carries no protocol count and no version: social cards are
// cached by every platform that scrapes them, so a number baked into one is
// stale within a day of the next release.
//
// Rendered through sharp, then committed. Regenerate with:
//
//   node scripts/build-social-card.mjs
//
// and review the changed PNG before committing it.
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const BG = '#15120d';
const SURFACE = '#1d1913';
const RULE = '#3a3229';
const INK = '#f6f1e7';
const MUTED = '#b5aa96';
const ACCENT = '#ffb13d';
const FONT = 'Segoe UI, Inter, Helvetica, Arial, sans-serif';
const MONO = 'Consolas, JetBrains Mono, DejaVu Sans Mono, monospace';

// The bench, the graver, the cut: the same mark as the favicon, scaled up.
const mark = `
  <g transform="translate(80 74) scale(2.1)">
    <path d="M3 26.5h26" stroke="${INK}" stroke-width="2.4" stroke-linecap="square" opacity=".55"/>
    <path d="M20.4 2.6 27 9.2 13.6 22.6l-6.6-6.6z" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M13.6 22.6 8.2 24l1.4-5.4z" fill="${INK}"/>
    <path d="M4.5 22.2 9.4 17.3" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"/>
  </g>`;

// A receipt block, because the itemised cost is the thing this product does
// that nothing else on a link preview would suggest.
const receiptRows = [
  ['Network fee', 'you pick the rate'],
  ['Service fee', 'flat, stated up front'],
  ['Inscription output', 'stays yours'],
];

const receipt = `
  <g transform="translate(724 176)">
    <rect x="0" y="0" width="396" height="278" rx="10" fill="${SURFACE}" stroke="${RULE}" stroke-width="1.5"/>
    <rect x="0" y="0" width="396" height="46" rx="10" fill="#26211a"/>
    <rect x="0" y="36" width="396" height="10" fill="#26211a"/>
    <line x1="0" y1="46" x2="396" y2="46" stroke="${RULE}" stroke-width="1.5"/>
    <text x="22" y="30" font-family="${FONT}" font-size="15" font-weight="700" letter-spacing="2.2" fill="${MUTED}">WHAT YOU PAY</text>
    ${receiptRows
      .map(
        (row, i) => `
    <text x="22" y="${94 + i * 58}" font-family="${FONT}" font-size="21" fill="${INK}">${row[0]}</text>
    <text x="22" y="${117 + i * 58}" font-family="${FONT}" font-size="15" fill="${MUTED}">${row[1]}</text>
    <line x1="22" y1="${134 + i * 58}" x2="374" y2="${134 + i * 58}" stroke="${RULE}" stroke-width="1"/>`,
      )
      .join('')}
    <text x="22" y="${94 + 3 * 58}" font-family="${MONO}" font-size="20" font-weight="700" fill="${ACCENT}">Total, before you sign</text>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="10" fill="${ACCENT}"/>
  ${mark}
  <text x="152" y="112" font-family="${FONT}" font-size="27" font-weight="700" letter-spacing="3" fill="${INK}">INSCRIBE</text>
  <text x="152" y="140" font-family="${FONT}" font-size="19" fill="${MUTED}">Bitcoin Universe</text>

  <text x="80" y="272" font-family="${FONT}" font-size="76" font-weight="800" letter-spacing="-1.6" fill="${INK}">Make it on</text>
  <text x="80" y="352" font-family="${FONT}" font-size="76" font-weight="800" letter-spacing="-1.6" fill="${ACCENT}">Bitcoin.</text>
  <text x="80" y="410" font-family="${FONT}" font-size="24" fill="${MUTED}">Inscriptions, tokens, runes and transfers</text>
  <text x="80" y="444" font-family="${FONT}" font-size="24" fill="${MUTED}">across 27 protocols, priced before you sign.</text>

  ${receipt}

  <line x1="80" y1="524" x2="1120" y2="524" stroke="${RULE}" stroke-width="1.5"/>
  <text x="80" y="562" font-family="${FONT}" font-size="20" fill="${MUTED}">inscribe.bitcoinuniverse.io</text>
  <text x="1120" y="562" text-anchor="end" font-family="${FONT}" font-size="20" fill="${MUTED}">Public documentation</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
writeFileSync(resolve(root, 'public/social-card.png'), png);
console.log(`wrote public/social-card.png, ${(png.length / 1024).toFixed(1)} KB`);
