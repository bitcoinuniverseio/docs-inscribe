# Verified release artifacts

Inscribe releases use recorded backend and frontend artifacts, including container images. The normal release process verifies the exact source revision, supported runtimes, production configuration and completed checks for that revision.

An explicit owner deployment override may authorize a software update while protocol qualification is incomplete. Failed checks remain recorded, and that deployment does not establish full functional acceptance.

Already verified compiled outputs can be reused when their source inputs,
toolchain and every output hash still match. Changed or extra files refuse reuse.
The source and release checks still apply; a cache match is not a wallet or
protocol test. This avoids rebuilding unchanged components during promotion.

Release evidence includes image identities, dependency inventories, and checks that the production artifact matches the approved source. It is designed to make a release traceable without exposing credentials or customer data.

Production browser route validation builds with the same reviewed feature
profile as the release artifact. This ensures that production-enabled routes,
including Drops and OP-DROP, are tested in their enabled state before a release
is promoted.

Browser route validation also treats an already-dismissed consent choice as the
successful state. A consent control that disappears while the test is
interacting with it does not block release evidence, while a control that
remains visible after an interaction error still fails the validation.
