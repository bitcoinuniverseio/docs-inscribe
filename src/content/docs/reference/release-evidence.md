---
<<<<<<<< HEAD:src/content/docs/reference/release-evidence.md
title: 'Release evidence'
description: 'Immutable images, verified revisions, and browser route validation.'
category: reference
lastVerified: 2026-09-01
---
# Verified release artifacts
========
title: Release evidence
description: "How an Inscribe release is built from an exact commit, what is verified before an artifact is published, and what the evidence contains."
provenance:
  owner: bitcoinuniverseio/inscribe
  chain: Bitcoin
  network: mainnet
  release: Continuous, from a verified commit
  lifecycle: Stable
  lastVerified: 2026-09-01
---

>>>>>>>> f81b73edc3d97beddafed9ab57fbf3530bd423ec:src/content/docs/about/release-evidence.md

Inscribe releases use immutable backend and frontend container images. Before an artifact can be published, the release process verifies the exact source revision, the supported Node.js and Docker runtimes, production configuration, and the completed CI evidence for that same revision. Artifact builds run only on a qualified runner whose Docker engine matches the supported version.

If a required validation fails, no release artifact is published and no partial evidence is presented as a release. This keeps an incomplete build from being mistaken for a deployable version.

Release evidence includes image identities, dependency inventories, and checks that the production artifact matches the approved source. It is designed to make a release traceable without exposing credentials or customer data.

Production browser route validation builds with the same reviewed feature
profile as the release artifact. This ensures that production-enabled routes,
including Drops and OP-DROP, are tested in their enabled state before a release
is promoted.

Browser route validation also treats an already-dismissed consent choice as the
successful state. A consent control that disappears while the test is
interacting with it does not block release evidence, while a control that
remains visible after an interaction error still fails the validation.
