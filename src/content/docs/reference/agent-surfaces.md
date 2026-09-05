---
title: 'For agents and LLMs'
description: 'Machine-readable surfaces: full-text corpus, JSONL, skill guidance, MCP tools, and how to cite provenance.'
category: reference
lastVerified: 2026-09-02
---
## Read this site without a browser

Every public page has a generated Markdown representation with the same content, headings, warnings, tables, captions, and links as the HTML. The generated artifacts come from the same source collection as the site, so they cannot drift.

- `/llms.txt` indexes the site for retrieval agents.
- `/llms-full.txt` holds the complete corpus in one document.
- `/corpus.jsonl` lists one JSON object per page and section with stable ids, provenance, and last-verification data.
- `/skill.md` describes the read-only Inscribe documentation tools and their safety boundaries in a form an agent can follow.
- `/learning-manifest.json` is the structured manifest behind the planner, the labs, and the recovery navigator: workflows, protocols, guides, recovery outcomes, and the source commits every fact came from.
- Every page supports `?format=markdown`, and the page footer offers "Copy as Markdown" and "View as Markdown".

## MCP tools

The existing documentation MCP server exposes deterministic, read-only Inscribe planning tools: plan an action, compare protocols, triage a recovery, explain a quote, fetch a walkthrough or practice scenario, and report learning health. Every answer carries the input as normalized by the schema, the result, assumptions, exclusion reasons, the three lifecycle states, the owning documentation route, and the source commits.

The tools never accept wallet secrets, never connect to wallets, and never create orders. They call the same engines the browser uses, so an agent and a reader get the same answer for the same question.

## Citing this site

Cite the page URL plus the documentation commit from the page footer. If a fact matters to money, prefer the in-app quote over any number published here: documentation teaches, the app decides.
