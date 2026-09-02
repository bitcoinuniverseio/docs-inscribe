// Inscribe documentation: the Bitcoin creation learning environment.
//
// Static first. Every article reads and navigates without JavaScript; the
// interactive environments (planner, protocol lab, transaction lab, recovery
// navigator, practice) are hydrated per route and only when they scroll into
// view. Nothing loads from a third-party host: fonts are self-hosted through
// fontsource, media comes from this repository, and there is no analytics.
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightLinksValidator from 'starlight-links-validator'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { unified } from '@astrojs/markdown-remark'
import rehypeTableScroll from './scripts/rehype-table-scroll.mjs'

export default defineConfig({
  site: 'https://bitcoinuniverseio.github.io',
  base: '/docs-inscribe',
  trailingSlash: 'ignore',
  integrations: [
    sitemap(),
    react(),
    starlight({
      title: 'Inscribe',
      description:
        'Create Bitcoin digital artifacts with confidence: plan an inscription, compare protocols, practice safely, understand every cost, and recover when something goes wrong.',
      favicon: '/favicon.svg',
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/jetbrains-mono',
        './src/styles/tokens.css',
        './src/styles/base.css',
        './src/styles/components.css',
        './src/styles/content.css',
      ],
      social: [
        { label: 'GitHub', icon: 'github', href: 'https://github.com/bitcoinuniverseio/docs-inscribe' },
        { label: 'Open Inscribe', icon: 'external', href: 'https://inscribe.bitcoinuniverse.io' },
      ],
      lastUpdated: true,
      pagination: true,
      credits: false,
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'What you can create', link: '/start/what-you-can-create' },
            { label: 'Guided plan', link: '/guided/' },
            { label: 'Practice without spending', link: '/practice/' },
          ],
        },
        {
          label: 'Create',
          items: [
            { label: 'First inscription', link: '/create/first-inscription' },
            { label: 'Cost anatomy', link: '/create/what-it-costs' },
            { label: 'Workspace map', link: '/create/workspaces' },
          ],
        },
        {
          label: 'Decide',
          items: [
            { label: 'Protocol Decision Lab', link: '/labs/protocols/' },
            { label: 'Transaction Review Lab', link: '/labs/transaction-review/' },
          ],
        },
        {
          label: 'Visual guides',
          items: [
            { label: 'Walkthrough library', link: '/visual-guides/' },
          ],
        },
        {
          label: 'Safety',
          items: [
            { label: 'Asset and UTXO safety', link: '/safety/asset-safety' },
            { label: 'Recovery guide', link: '/safety/order-recovery' },
            { label: 'Recovery Navigator', link: '/recovery/navigator/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Live data status', link: '/reference/protocol-data-status' },
            { label: 'Accessibility', link: '/reference/accessibility' },
            { label: 'Performance and media', link: '/reference/performance-and-media' },
            { label: 'Release evidence', link: '/reference/release-evidence' },
            { label: 'For agents and LLMs', link: '/reference/agent-surfaces' },
          ],
        },
      ],
      components: {
        PageTitle: './src/overrides/PageTitle.astro',
        Head: './src/overrides/Head.astro',
        ThemeSelect: './src/overrides/ThemeSelect.astro',
      },
    }),
    starlightLinksValidator(),
  ],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeTableScroll] }),
  },
  redirects: {
    '/workspaces': '/create/workspaces',
    '/what-it-costs': '/create/what-it-costs',
    '/asset-safety': '/safety/asset-safety',
    '/protocol-data-status': '/reference/protocol-data-status',
    '/accessibility': '/reference/accessibility',
    '/performance-and-media': '/reference/performance-and-media',
    '/release-evidence': '/reference/release-evidence',
    '/social-previews': '/reference/social-previews',
    '/admin-control-center': '/reference/admin-control-center',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    resolve: {
      alias: {
        '@data': new URL('./src/data', import.meta.url).pathname,
        '@components': new URL('./src/components', import.meta.url).pathname,
      },
    },
  },
})
