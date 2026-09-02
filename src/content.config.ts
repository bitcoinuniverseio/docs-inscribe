import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

// Provenance every material page carries. The PageTitle override renders the
// verification strip, and scripts/check-manifest.mjs fails the build when a
// material page omits `lastVerified`.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        category: z.enum(['start', 'create', 'protocols', 'safety', 'reference']).default('reference'),
        /** ISO date on which a human last checked this page against source. */
        lastVerified: z.coerce.date().optional(),
      }),
    }),
  }),
}
