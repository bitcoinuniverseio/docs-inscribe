# Security policy

## Reporting a vulnerability

**Do not open a public issue for a security problem.**

Report it privately through
[GitHub security advisories](https://github.com/bitcoinuniverseio/docs-inscribe/security/advisories/new)
for this repository. That channel is private until an advisory is published.

Include what you found, how to reproduce it, and what an attacker could do with it. If you
have a proof of concept, include it. You will get an acknowledgement, and you will be told
when a fix ships.

## What belongs here

This repository is **documentation only**. It contains no application code, no server, and
no access to funds.

Report here:

- private infrastructure detail, credentials, or internal routes that have leaked into a
  published page;
- a documented procedure that would cause a reader to lose assets if followed;
- a supply-chain problem in this site build.

Report to the product instead:

- anything in the Inscribe application itself, at
  [inscribe.bitcoinuniverse.io](https://inscribe.bitcoinuniverse.io);
- wallet, order, or transaction handling;
- anything involving real funds.

If you are not sure which, report it here privately and it will be routed.

## Documentation that could cost someone assets

This is worth stating separately, because it is the failure mode specific to a documentation
repository.

A page that tells a reader to do something irreversible and gets it wrong is a security
problem, not a typo. The clearest examples:

- telling someone to pay again when they should not;
- describing an unreleased capability as usable;
- omitting a safety warning that the application itself shows;
- overstating what asset screening protects.

Report these through the private channel above, not as ordinary issues.

## What we ask of you

- Give us reasonable time to fix an issue before disclosing it.
- Do not access, modify, or exfiltrate data that is not yours.
- Do not run tests against the production application that would degrade it for others.

## Scope

| In scope | Out of scope |
| --- | --- |
| This repository and the site it builds | The Inscribe application |
| Published pages, build scripts, workflows | Third-party services |
| Leaked private detail in any published page | Findings from automated scanners with no demonstrated impact |
