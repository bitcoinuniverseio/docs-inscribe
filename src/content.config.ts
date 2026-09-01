import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Source provenance is part of the page, not a footnote. Every material page
// declares where its facts come from, which release they describe, and when
// they were last checked against the product. The fields are typed so a page
// cannot quietly ship without them.
const provenance = z
  .object({
    /** The repository that owns the behaviour this page describes. */
    owner: z.string().optional(),
    /** The path inside that repository, where naming one is safe and useful. */
    sourcePath: z.string().optional(),
    /** Chain the page applies to. */
    chain: z.string().optional(),
    /** Network the page applies to. */
    network: z.string().optional(),
    /** Release the page describes. */
    release: z.string().optional(),
    /** stable, beta, experimental, gated, or not-implemented. */
    lifecycle: z.string().optional(),
    /** Date this page was last checked against the product source. YAML parses
     *  a bare 2026-09-01 into a Date, so both forms are accepted and the
     *  renderer formats it. Requiring authors to quote it would make a
     *  missing quote a build failure for no reader benefit. */
    lastVerified: z.union([z.string(), z.date()]).optional(),
  })
  .optional();

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        provenance,
        /** Protocol ids this page makes creation claims about. Checked against
         *  the registry by scripts/check-capability-truth.mjs. */
        protocols: z.array(z.string()).optional(),
        /** Set when the page renders its own h1 inside its content, so the
         *  layout must not render a second one. */
        ownHeading: z.boolean().optional(),
        /** Creation operations this page documents. Also checked. */
        operations: z.array(z.string()).optional(),
      }),
    }),
  }),
};
