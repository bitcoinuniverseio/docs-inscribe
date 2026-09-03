# Inscribe Control Center

The Inscribe Control Center is a restricted operational workspace at `/admin`.
It gives authorized operators one view of application health, protocol state,
orders, transactions, indexers, recovery actions, and audit history.

## What operators can see

- application, database, Bitcoin chain, worker, and indexer readiness;
- active, failed, and recoverable order totals;
- protocol deployment state and operation coverage;
- order and transaction search across supported workflows;
- service lag, last successful checks, and current error summaries;
- a complete classification of public state-changing routes; and
- the result, target, time, and correlation identifier for each admin action.

Status labels distinguish healthy, syncing, degraded, unavailable, policy-disabled,
and not-configured states. A successful HTTP response alone is not treated as
proof that a chain source or indexer is current.

The Control Center also compares the Bitcoin node and index heights. It reports
the index as syncing when the node is still rebuilding and sits behind the index,
instead of showing a false healthy state. A short index delay behind a current
node remains normal.

## Safe operations

The workspace exposes only actions that can run safely on the server. Operations
that require a wallet signature remain in the user workflow and cannot be bypassed
from the Control Center. Policy-disabled capabilities stay disabled.

Read-only and safe refresh actions can run directly. State-changing actions show
a preview before execution. High-risk recovery actions require a second explicit
confirmation. Every execution uses a unique action key and writes an audit record
before the underlying operation begins.

## Access and privacy

The unauthenticated route displays only the sign-in screen. The public application
navigation and workspace are not rendered behind it. Passwords are never included
in frontend assets or browser storage.

Successful sign-in creates a short-lived server-side session in a protected cookie.
Requests that change state also require a session-bound verification token. Sign-in
attempts are rate-limited, logout revokes the server session, and expired sessions
must authenticate again.

Audit summaries remove credential-like, wallet-secret, signed-transaction, and
capability fields before storage. Operators should still avoid placing unrelated
sensitive information in free-form fields.

## Operational expectations

The Control Center reports live production state. If a service is shown as
unavailable or not configured, the safe response is to inspect its health evidence
and runbook. Do not enable a protocol or retry a high-risk action simply to clear a
status label.
