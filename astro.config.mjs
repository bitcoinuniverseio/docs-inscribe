// Documentation site for Universe Inscribe.
//
// Static build, deployed to GitHub Pages from main. Search is Pagefind,
// bundled by Starlight: local, loaded on demand, no external service. Fonts
// are self-hosted through fontsource. Nothing on a rendered page reaches a
// third-party host.
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import rehypeTableScroll from './scripts/rehype-table-scroll.mjs';
import { codeBlockAccessibility } from './scripts/ec-code-block-a11y.mjs';

export default defineConfig({
  markdown: {
    processor: unified({ rehypePlugins: [rehypeTableScroll] }),
  },
  // This repository used to be flat Markdown files read on GitHub. Anyone who
  // linked to a path matching an old filename lands here. Documented in
  // /about/migration/.
  redirects: {
    '/workspaces': '/docs-inscribe/reference/workspaces/',
    '/what-it-costs': '/docs-inscribe/concepts/what-it-costs/',
    '/asset-safety': '/docs-inscribe/concepts/asset-safety/',
    '/protocol-data-status': '/docs-inscribe/concepts/source-freshness/',
    '/accessibility': '/docs-inscribe/about/accessibility/',
    '/performance-and-media': '/docs-inscribe/about/performance-and-media/',
    '/release-evidence': '/docs-inscribe/about/release-evidence/',
    '/social-previews': '/docs-inscribe/about/social-previews/',
    '/admin-control-center': '/docs-inscribe/about/control-center/',
  },
  // Content pages sit at varying depths, so relative imports of the shared
  // data and components break whenever a page moves. These two aliases make
  // the import independent of where the page lives.
  vite: {
    resolve: {
      alias: {
        '@data': new URL('./src/data', import.meta.url).pathname,
        '@components': new URL('./src/components', import.meta.url).pathname,
      },
    },
  },
  site: 'https://bitcoinuniverseio.github.io',
  base: '/docs-inscribe',
  trailingSlash: 'ignore',
  integrations: [
    starlight({
      expressiveCode: { plugins: [codeBlockAccessibility()] },
      title: 'Inscribe docs',
      description:
        'Documentation for Universe Inscribe, the Bitcoin Universe creation studio: inscribe files and text, deploy and mint tokens, etch runes, and transfer assets across 27 protocols, with every satoshi accounted for before you sign.',
      logo: { src: './public/mark.svg', alt: '' },
      favicon: '/mark.svg',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/bitcoinuniverseio/docs-inscribe',
        },
      ],
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/theme.css',
      ],
      editLink: {
        baseUrl: 'https://github.com/bitcoinuniverseio/docs-inscribe/edit/main/',
      },
      components: {
        PageTitle: './src/components/PageTitle.astro',
      },
      lastUpdated: true,
      pagination: true,
      credits: false,
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://bitcoinuniverseio.github.io/docs-inscribe/social-card.png',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://bitcoinuniverseio.github.io/docs-inscribe/social-card.png',
          },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#15120d' } },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'What Inscribe is', slug: 'start/what-inscribe-is' },
            { label: 'Before you spend anything', slug: 'start/before-you-spend' },
            { label: 'Your first inscription', slug: 'start/first-inscription' },
            { label: 'Status and lifecycle', slug: 'start/status' },
          ],
        },
        {
          label: 'How it works',
          items: [
            { label: 'Wallets and the two addresses', slug: 'concepts/wallets-and-addresses' },
            { label: 'What a transaction costs', slug: 'concepts/what-it-costs' },
            { label: 'The life of an order', slug: 'concepts/order-lifecycle' },
            { label: 'Asset safety and UTXO classification', slug: 'concepts/asset-safety' },
            { label: 'Where the data comes from', slug: 'concepts/source-freshness' },
          ],
        },
        {
          label: 'Make something',
          items: [
            { label: 'Inscribe a file', slug: 'create/inscribe-a-file' },
            { label: 'Inscribe text', slug: 'create/inscribe-text' },
            { label: 'Inscribe in a batch', slug: 'create/batch' },
            { label: 'Create a collection', slug: 'create/collections' },
            { label: 'Deploy a token', slug: 'create/deploy-a-token' },
            { label: 'Mint a token', slug: 'create/mint-a-token' },
            { label: 'Etch a rune', slug: 'create/etch-a-rune' },
            { label: 'Transfer an asset', slug: 'create/transfer-an-asset' },
          ],
        },
        {
          label: 'Protocols',
          items: [
            { label: 'Coverage matrix', slug: 'protocols/coverage' },
            { label: 'Ordinals family', slug: 'protocols/ordinals-family' },
            { label: 'Runes family', slug: 'protocols/runes-family' },
            { label: 'Stamps family', slug: 'protocols/stamps-family' },
            { label: 'Atomicals family', slug: 'protocols/atomicals-family' },
            { label: 'OP_RETURN family', slug: 'protocols/op-return-family' },
            { label: 'Dogecoin protocols', slug: 'protocols/dogecoin-family' },
            { label: 'Other protocols', slug: 'protocols/other' },
          ],
        },
        {
          label: 'Hold and recover',
          items: [
            { label: 'Portfolio', slug: 'manage/portfolio' },
            { label: 'Orders you started', slug: 'manage/pending-orders' },
            { label: 'Recovery routes', slug: 'manage/recovery' },
            { label: 'Advanced transaction tools', slug: 'manage/advanced-transactions' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Workspace map', slug: 'reference/workspaces' },
            { label: 'Wallet matrix', slug: 'reference/wallets' },
            { label: 'Fee tiers', slug: 'reference/fee-tiers' },
            { label: 'Order states', slug: 'reference/order-states' },
            { label: 'Glossary', slug: 'reference/glossary' },
          ],
        },
        {
          label: 'When it goes wrong',
          items: [
            { label: 'Failure states', slug: 'troubleshooting/failure-states' },
            { label: 'Common problems', slug: 'troubleshooting/common-problems' },
          ],
        },
        {
          label: 'About this product',
          items: [
            { label: 'Accessibility', slug: 'about/accessibility' },
            { label: 'Speed and media', slug: 'about/performance-and-media' },
            { label: 'Release evidence', slug: 'about/release-evidence' },
            { label: 'Link previews', slug: 'about/social-previews' },
            { label: 'Control Center', slug: 'about/control-center' },
            { label: 'Changelog', slug: 'about/changelog' },
            { label: 'Where pages moved', slug: 'about/migration' },
          ],
        },
      ],
      plugins: [starlightLinksValidator({ errorOnRelativeLinks: false })],
    }),
  ],
});
