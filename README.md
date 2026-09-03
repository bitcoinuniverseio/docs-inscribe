# Universe Inscribe Documentation

Welcome to the official interactive documentation and learning environment for [Universe Inscribe](https://inscribe.bitcoinuniverse.io).

Live documentation site: **[https://bitcoinuniverseio.github.io/docs-inscribe/](https://bitcoinuniverseio.github.io/docs-inscribe/)**

---

## Overview

Universe Inscribe is a comprehensive workspace for creating, minting, managing, and recovering Bitcoin-native assets, spanning Ordinals, Runes, BRC-20, Atomicals (ARC-20), Stamps (SRC-20), Taproot Assets, and OP_RETURN.

This repository powers the visual, task-oriented learning platform that accompanies the Inscribe application. It transforms traditional static documentation into an active learning studio with deterministic simulations, interactive decision engines, real-time fee estimators, and verifiable walkthroughs.

---

## Interactive Learning Surfaces

The documentation site provides nine interactive learning products built directly from the application contracts:

1. **[Guided Action Planner](https://bitcoinuniverseio.github.io/docs-inscribe/guided/)** (`/guided/`): Tailors an evidence-backed plan to your goal, protocol choices, cost breakdowns, and safety criteria with deterministic app handoffs.
2. **[Protocol Decision Lab](https://bitcoinuniverseio.github.io/docs-inscribe/labs/protocols/)** (`/labs/protocols/`): Interactive comparison matrix across 27 Bitcoin protocols with filtering by efficiency, immutability, indexer dependencies, and safety rules.
3. **[Practice Studio](https://bitcoinuniverseio.github.io/docs-inscribe/practice/)** (`/practice/`): Network-free simulation runtime mirroring the live Inscribe app against deterministic fixtures. Practice etching Runes, minting tokens, and inscribing files with zero satoshis at risk.
4. **[Visual Walkthrough Library](https://bitcoinuniverseio.github.io/docs-inscribe/visual-guides/)** (`/visual-guides/`): 41 high-fidelity step-by-step walkthroughs covering 14 workspaces with synchronized UI captures pinned to app commits.
5. **[Transaction Review Lab](https://bitcoinuniverseio.github.io/docs-inscribe/labs/transaction-review/)** (`/labs/transaction-review/`): Transparent fee anatomy breaking down miner fees (sat/vB), reveal outputs, postage, padding, and service fees for single and batch orders.
6. **[Recovery Navigator](https://bitcoinuniverseio.github.io/docs-inscribe/recovery/navigator/)** (`/recovery/navigator/`): Interactive diagnostic guide for 16 interrupted or stuck states, including mempool purging, RBF bumping, CPFP acceleration, and padding recovery.
7. **Contextual App Handoff**: URL-safe intent encoding contract enabling seamless transition from documentation articles into pre-filled workspace sessions on [Inscribe](https://inscribe.bitcoinuniverse.io).
8. **Machine-Readable Surfaces**: Verified documentation corpus available for agent discovery at [`/llms.txt`](https://bitcoinuniverseio.github.io/docs-inscribe/llms.txt), [`/llms-full.txt`](https://bitcoinuniverseio.github.io/docs-inscribe/llms-full.txt), and [`/corpus.jsonl`](https://bitcoinuniverseio.github.io/docs-inscribe/corpus.jsonl).
9. **Offline Learning Pack**: Local-first Progressive Web App (PWA) with service worker precaching for complete offline access to guides and interactive runtimes.

---

## Core Guides & Reference

| Section | Description |
| :--- | :--- |
| **[Start Here](https://bitcoinuniverseio.github.io/docs-inscribe/start/what-inscribe-is/)** | What Inscribe is, what you can create, and what to know before spending sats |
| **[First Inscription](https://bitcoinuniverseio.github.io/docs-inscribe/create/first-inscription/)** | End-to-end tutorial from wallet connection to confirmed inscription |
| **[What It Costs](https://bitcoinuniverseio.github.io/docs-inscribe/create/what-it-costs/)** | Complete cost anatomy: network fee, service fee, and postage output |
| **[Workspace Map](https://bitcoinuniverseio.github.io/docs-inscribe/create/workspaces/)** | Directory of every creation, minting, batch, and management workspace |
| **[Asset Safety](https://bitcoinuniverseio.github.io/docs-inscribe/safety/asset-safety/)** | UTXO classification rules preventing valuable assets from being used as fee fuel |
| **[Order Recovery](https://bitcoinuniverseio.github.io/docs-inscribe/safety/order-recovery/)** | Step-by-step resolution for every interrupted or unconfirmed order state |
| **[Protocol Coverage](https://bitcoinuniverseio.github.io/docs-inscribe/protocols/coverage/)** | Authoritative status of all 27 supported protocols |
| **[Accessibility](https://bitcoinuniverseio.github.io/docs-inscribe/about/accessibility/)** | WCAG AA compliance evidence, contrast guarantees, and responsive behavior down to 320px |

---

## Repository Structure

```text
docs-inscribe/
├── data/                  # Learning manifests and protocol metadata
├── public/                # Static assets, machine-readable texts, and offline service worker
│   ├── llms.txt           # Compact machine-readable corpus summary
│   ├── llms-full.txt      # Full machine-readable documentation text
│   ├── corpus.jsonl       # Structured JSONL corpus for retrieval systems
│   └── practice/sim/      # Network-isolated Practice Studio simulation bundle
├── scripts/               # Automated verification and quality gate scripts
├── src/
│   ├── content/docs/      # Starlight markdown documentation articles
│   ├── islands/           # Interactive React islands (Planner, Labs, Navigator)
│   ├── pages/             # Astro standalone learning surface routes
│   └── styles/            # Theme, typography, and component stylesheet
├── vendor/                # Vendored contracts from @universe/inscribe-learning
└── astro.config.mjs       # Astro + Starlight configuration
```

---

## Local Development

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Setup & Running

```bash
# Clone the repository
git clone https://github.com/bitcoinuniverseio/docs-inscribe.git
cd docs-inscribe

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Quality Gates & Verification

Every pull request and build runs an automated test suite enforcing strict editorial, security, and accessibility standards:

```bash
# Run all core verification suites
npm test

# Run Playwright end-to-end browser tests
npm run test:e2e

# Run automated WCAG AA accessibility audit across all 99 pages
npm run check:a11y

# Run markdown style validation
npm run check:markdown
```

### Invariants Enforced by CI

- **Zero Accessibility Violations:** All 99 pages must pass axe-core audits with 0 violations in both light and dark themes at 320px viewport width.
- **Zero Secret Disclosures:** Automated scanning checks for credentials, private keys, private IP addresses, and non-public hostnames.
- **Network Isolation:** The Practice Studio build is audited to ensure zero network call surfaces exist in the simulation bundle.
- **Copy Standards:** Strict linting prevents prohibited characters (no em dashes) and banned terminology.

---

## Contributing

We welcome contributions to documentation clarity, technical accuracy, and learning tools. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for development workflows, style guidelines, and submission requirements.

---

## Security

For security vulnerability disclosures, please review [SECURITY.md](SECURITY.md). Never submit sensitive details, private keys, or wallet seed phrases in public issues.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
