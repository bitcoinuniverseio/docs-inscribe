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

Bitcoin fee, transaction, address, and UTXO reads use the Universe-operated
Mempool service on the shared Indexers server. Inscription, content, Rune, and
BRC-20 reads use Ord 0.22 on that same server. Inscribe reaches both services
through persistent private tunnels, so node and indexer ports are never exposed
to the browser and public blockchain providers are not used as fallbacks.

Browser fee, transaction, address, and UTXO requests stay on the Inscribe
origin. The API relays only reviewed read paths to the private Mempool service,
so wallet and payment screens never connect to an indexer or public explorer
directly.

Ord 0.29 is synchronized separately as a future parser and verification source.
It remains in **Syncing** state and cannot serve production requests until its
checkpoint reaches the Bitcoin tip and its representative responses pass the
same integrity checks as the active Ord service.

Drops and OP_DROP additionally require two private, Universe-operated Bitcoin
Core processes to agree on the finalized block hash. If either verifier is
unavailable or disagrees, their readiness stays unavailable instead of falling
back to a public blockchain provider.

Their canonical index also runs on a private, loopback-only MySQL 8.4 service.
Database migration is prepared beside the active service from a consistent
snapshot, verified for the complete table set and custody rules, and promoted
only with an exact release candidate. A database version label alone is never
treated as protocol readiness.

The Inscribe application database follows the same no-interruption rule. The
serving MariaDB database keeps accepting writes while a private MySQL 8.4
candidate is loaded and checked. Transactional change capture records the exact
events present in the snapshot and uses committed replay receipts, so a retry
cannot apply an acknowledged event twice. Traffic moves only after schema, row,
health, drain, and smoke checks pass.

Atomicals NFT and Realm browsing uses one unified generation so NFT, Realm, Subrealm, lookup, and resolver views agree at the same chain checkpoint. Drops and OP_DROP use one canonical authority for artifact and token state. BLOCK-20 reads are derived from a self-hosted Bitcoin Ordinals projection rather than an unbounded legacy worker.

## Safety gates

Some research protocols remain visible for documentation or controlled-network work while production actions stay disabled. Universe does not turn these features on merely to make a status page appear healthy. Mainnet writes require the protocol's network profile, independent authorization, authoritative index, transaction safety checks, and a verified readiness canary.

CAT-20 transaction features remain fail-closed when the required Fractal data and signing dependencies are unavailable. Market discovery reports that dependency state directly instead of returning a misleading empty market.
