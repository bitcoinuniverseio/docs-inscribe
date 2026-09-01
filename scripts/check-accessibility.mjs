#!/usr/bin/env node
// Accessibility gate for the built site.
//
// Runs axe with every rule enabled over every page, in both colour schemes, at
// a phone width and a desktop width, and fails on any violation. Colour
// contrast is the reason this drives a real browser rather than jsdom: nothing
// that does not paint can evaluate it.
//
// It also fails a page that scrolls sideways. A documentation page a reader has
// to pan is broken on a phone whether or not axe has a rule for it, and this
// site is full of the two things that cause it: wide tables and diagrams.
//
//   npm run build && npm run check:a11y
//
//   --base   the origin to audit (default http://localhost:4323)
//   --routes a comma separated subset, for a quick loop while fixing one page
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const AXE_PATH = require.resolve('axe-core/axe.min.js');

const args = new Map();
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i].replace(/^--/, ''), process.argv[i + 1]);
}
const BASE = (args.get('base') ?? 'http://localhost:4323').replace(/\/$/, '');
const PREFIX = '/docs-inscribe';

// Every page the site publishes. A new page must be added here, which is the
// point: an unaudited page should be a decision rather than an oversight.
const ALL_ROUTES = [
  '/',
  '/start/what-inscribe-is/',
  '/start/before-you-spend/',
  '/start/first-inscription/',
  '/start/status/',
  '/concepts/wallets-and-addresses/',
  '/concepts/what-it-costs/',
  '/concepts/order-lifecycle/',
  '/concepts/asset-safety/',
  '/concepts/source-freshness/',
  '/create/inscribe-a-file/',
  '/create/inscribe-text/',
  '/create/batch/',
  '/create/collections/',
  '/create/deploy-a-token/',
  '/create/mint-a-token/',
  '/create/etch-a-rune/',
  '/create/transfer-an-asset/',
  '/protocols/coverage/',
  '/protocols/ordinals-family/',
  '/protocols/runes-family/',
  '/protocols/stamps-family/',
  '/protocols/atomicals-family/',
  '/protocols/op-return-family/',
  '/protocols/dogecoin-family/',
  '/protocols/other/',
  '/manage/portfolio/',
  '/manage/pending-orders/',
  '/manage/recovery/',
  '/manage/advanced-transactions/',
  '/reference/workspaces/',
  '/reference/wallets/',
  '/reference/fee-tiers/',
  '/reference/order-states/',
  '/reference/glossary/',
  '/troubleshooting/failure-states/',
  '/troubleshooting/common-problems/',
  '/about/accessibility/',
  '/about/performance-and-media/',
  '/about/release-evidence/',
  '/about/social-previews/',
  '/about/control-center/',
  '/about/changelog/',
  '/about/migration/',
  '/404/',
];

const routes =
  args.get('routes') === undefined
    ? ALL_ROUTES
    : args.get('routes').split(',').map((route) => route.trim());

// 375 is the narrowest phone worth supporting; 1440 is where the sidebar, the
// table of contents and the content column all appear at once.
const WIDTHS = [375, 1440];
const SCHEMES = ['light', 'dark'];

const browser = await chromium.launch();
const failures = [];
let renders = 0;

for (const colorScheme of SCHEMES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({
      colorScheme,
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    for (const route of routes) {
      const url = `${BASE}${PREFIX}${route}`;
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      // The 404 page has to answer 404. Auditing it still matters, because
      // whoever lands there is already lost, but asserting a 200 on it would
      // be asserting the wrong thing.
      const expected = route === '/404/' ? 404 : 200;
      if (response === null || response.status() !== expected) {
        failures.push(
          `${colorScheme} ${width} ${route}: expected ${expected}, got ${response?.status() ?? 'no response'}`,
        );
        continue;
      }
      await page.addScriptTag({ path: AXE_PATH });
      const result = await page.evaluate(
        async () => await window.axe.run(document, { resultTypes: ['violations'] }),
      );
      renders += 1;
      for (const violation of result.violations) {
        failures.push(
          `${colorScheme} ${width} ${route}: ${violation.id} (${violation.impact}) on ${violation.nodes.length} element(s)\n      ${violation.help}`,
        );
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      // One pixel of slack for subpixel rounding, and no more.
      if (overflow > 1) {
        failures.push(`${colorScheme} ${width} ${route}: scrolls sideways by ${overflow}px`);
      }
    }
    await context.close();
  }
}

await browser.close();

if (failures.length > 0) {
  console.error(`accessibility: ${failures.length} problem(s) across ${renders} renders\n`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(
  `accessibility: ${renders} renders audited across ${routes.length} pages, ${SCHEMES.length} colour schemes and ${WIDTHS.length} widths, no violations and no sideways scroll`,
);
