# Verified release artifacts

Inscribe releases use immutable backend and frontend container images. Before an artifact can be published, the release process verifies the exact source revision, the supported Node.js and Docker runtimes, production configuration, and the completed CI evidence for that same revision. Artifact builds run only on a qualified runner whose Docker engine matches the supported version.

If a required validation fails, no release artifact is published and no partial evidence is presented as a release. This keeps an incomplete build from being mistaken for a deployable version.

Release evidence includes image identities, dependency inventories, and checks that the production artifact matches the approved source. It is designed to make a release traceable without exposing credentials or customer data.
