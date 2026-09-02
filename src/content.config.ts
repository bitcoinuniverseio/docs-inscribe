import { defineCollection, z } from 'astro:content'
import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'

const provenance = z
  .object({
    owner: z.string().optional(),
    sourcePath: z.string().optional(),
    chain: z.string().optional(),
    network: z.string().optional(),
    release: z.string().optional(),
    lifecycle: z.string().optional(),
    lastVerified: z.union([z.string(), z.date()]).optional(),
  })
  .optional();

// Provenance every material page carries. The PageTitle override renders the
// verification strip, and scripts/check-manifest.mjs fails the build when a
// material page omits `lastVerified`.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        category: z.enum(['start', 'create', 'protocols', 'safety', 'reference', 'about', 'concepts', 'manage', 'troubleshooting']).default('reference'),
        /** ISO date on which a human last checked this page against source. */
        lastVerified: z.coerce.date().optional(),
        provenance,
        protocols: z.array(z.string()).optional(),
        operations: z.array(z.string()).optional(),
        ownHeading: z.boolean().optional(),
      }),
    }),
  }),
}
