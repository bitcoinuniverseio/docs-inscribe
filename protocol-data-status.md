# Protocol data status and recovery

Universe Inscribe keeps protocol construction tools separate from live discovery data. A provider problem in one protocol does not disable unrelated pages, wallet access, or inscription workflows.

## What each state means

- **Healthy** means the configured source is reachable, on the correct network, structurally valid, and within its freshness limit.
- **Syncing** means a replacement index is being built and has not yet been promoted for production reads.
- **Stale** means the last verified generation is available but is too old to be represented as current.
- **Unavailable** means the source cannot currently provide trustworthy data. This state is never presented as an authoritative empty result.
- **Disabled by policy** means the protocol is intentionally unavailable because its production safety requirements have not been satisfied.

Empty results are shown only after a healthy source confirms that no records match the request. Retry controls repeat read-only requests and never replay mint, transfer, deploy, signing, or broadcast actions.

## Live data architecture

The production service uses independently monitored sources for OP-20, Drops and OP_DROP, ARC-20 and Atomicals, TAP on Dogecoin, BLOCK-20, ChainBloom, DUST-20, and other enabled explorers. Each source has its own liveness, readiness, freshness, network, schema, and checkpoint checks.

Drops and OP_DROP additionally require two private, Universe-operated Bitcoin
Core processes to agree on the finalized block hash. If either verifier is
unavailable or disagrees, their readiness stays unavailable instead of falling
back to a public blockchain provider.

Atomicals NFT and Realm browsing uses one unified generation so NFT, Realm, Subrealm, lookup, and resolver views agree at the same chain checkpoint. Drops and OP_DROP use one canonical authority for artifact and token state. BLOCK-20 reads are derived from a self-hosted Bitcoin Ordinals projection rather than an unbounded legacy worker.

## Safety gates

Some research protocols remain visible for documentation or controlled-network work while production actions stay disabled. Universe does not turn these features on merely to make a status page appear healthy. Mainnet writes require the protocol's network profile, independent authorization, authoritative index, transaction safety checks, and a verified readiness canary.

CAT-20 transaction features remain fail-closed when the required Fractal data and signing dependencies are unavailable. Market discovery reports that dependency state directly instead of returning a misleading empty market.
