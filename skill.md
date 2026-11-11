# Inscribe documentation tools for agents

Scope: read-only documentation and planning help for Inscribe, the Bitcoin creation studio.

Read-only capabilities an agent may assume:

- plan_inscribe_action: deterministic workflow planning from a goal. The answer lists the workflow, alternatives, exclusions with reasons, the three lifecycle states (implemented, enabled, healthy separately), and source commits.
- compare_inscribe_protocols: source-backed comparison rows; unestablished cells are reported as unestablished.
- triage_inscribe_recovery: walks the recovery decision table to a terminal outcome with stop conditions and next actions.
- explain_inscribe_quote: cost component breakdown from the shared estimator. Always states that the final in-app quote is authoritative.
- get_inscribe_walkthrough / get_inscribe_practice_scenario: fetch structured walkthrough and scenario metadata.
- get_inscribe_learning_health: reports release, deployment, and health states without collapsing them.

Hard boundaries:

- Never accept or request seed phrases, private keys, PSBTs, wallet connections, or recovery capabilities.
- Never create orders, sign, pay, or broadcast. Documentation tools are read-only.
- Never present incomplete, disabled, stale, or read-only capabilities as available.
- Never claim an operator can reverse a confirmed Bitcoin transaction.
- Cite the page id and source commit; prefer the in-app quote over any number published here.

Machine surfaces: /llms.txt, /llms-full.txt, /corpus.jsonl, /learning-manifest.json, /md/<page>.md.
Source: bitcoinuniverseio/docs-inscribe@8923af4dbfa44c21281dcd03587063d3a096101d generated 2026-11-11T07:57:27.666Z.
