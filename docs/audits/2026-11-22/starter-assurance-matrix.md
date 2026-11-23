# Starter assurance matrix

**Status: pending. No conformance, pass or qualification result is recorded.**

This matrix covers the starter assurance work called out for target C. It
narrows each future claim to a named artifact, journey, environment and result.
A scan, focused test, local happy path or template review is not whole-starter
conformance.

## Campaign identity

| Field | Value |
|---|---|
| Source commit | Working checkout for commit `1a393f1dd3fcdfbe9bc37ede103350d040e5addf` plus uncommitted production-readiness changes; not an exact qualification candidate |
| Starter recipe/version | Pending |
| Candidate hash or inventory digest | Pending |
| Host tuple and model | Pending |
| Reference hardware | Apple silicon, 16 GB; exact machine and OS pending |
| Node.js and package manager | Node.js 24.22.3, npm 11.19.1 |
| Protocol hash | Pending |
| Overall result | Pending — not run |

## Assurance matrix

| ID | Area | Declared scope | Required evidence | Threshold / negative control | Exact command or operator step | Evidence artifact | Result |
|---|---|---|---|---|---|---|---|
| A-ASVS | OWASP ASVS 5.0 Level 1 | Every applicable published requirement ID; non-applicable IDs have reasons | Automated check, behavioral test or manual review for each applicable ID; result per ID | No ASVS claim from scans alone | Generate starter's published applicability list and run its named method for each row | Pending per-ID matrix | Pending |
| A-WCAG | WCAG 2.2 AA | Sign in, browse, reserve, return and admin overview, including loading, empty, error, denied and conflict states | Automated axe, keyboard and VoiceOver evidence per journey/state; named scope | Every declared critical journey and state meets its checks | Run the recipe's `e2e`/`a11y` commands, then the named manual procedure in `docs/a11y-checks.md` | Pending | Pending |
| A-VO | VoiceOver | Safari, keyboard and VoiceOver across each changed/declared critical journey and state | Manual receipt per step: pass or issue with exact location; screen focus and status navigation | All steps pass; failing step narrows the accessibility claim | Follow `docs/a11y-checks.md` and record the three-step operator choice in the kernel decision | Pending | Pending |
| A-CON | Reservation concurrency | 20 simultaneous users; 5 simultaneous reservation attempts on the same item | Real isolated production API/database run, 0 double bookings, clear busy retry response | Bounded retry after busy database, then clear `try again`; no double booking | Run full isolated workload with 5-way same-item burst every 10 seconds | Pending | Pending |
| A-RST | Backup and restore | Migration from prior fixture data, automatic backup, restore, auth and new use through re-upgrade | Consistent supported backup; restore into a fixture; exact compatibility and restore limits | User data preserved; incompatible/destructive control refused; no raw copy of active SQLite file | Run the recipe's migration/backup/restore fixture and collision/killed-step controls; record code version | Pending | Pending |
| A-WORK | Reference workload | 10,000 items, 50,000 loans, 2,000 users; Apple silicon/16 GB; warm start; WAL | Production API; full seed reset per run; 30-second warm-up; 2-minute run; 70/20/10 list/reserve/return; sign-ins; p50/p95/p99, errors, peak RSS, event-loop delay; at least 5,000 samples | p95 ≤ 200 ms for list/reserve/return; peak server RSS ≤ 400 binary MB; 0 double bookings | Build, start the production API and run the frozen `workload` command five times; reset seed each run | Pending raw files and summary | Pending |
| A-TREND | Fitness trend | Reference workload series across candidate changes | Baseline and candidate series, protocol identity, consecutive result count and disposition | A degradation threshold such as >20% p95 across 3 consecutive checks raises `fitness-trend-degraded` | Run against the final frozen fitness function; do not reuse a nonconsecutive series | Pending | Pending |

## Critical journey rows

| Journey | Automated result | Keyboard result | VoiceOver result | States covered | Defects / claim limit | Result |
|---|---|---|---|---|---|---|
| Sign in | Pending | Pending | Pending | Loading, validation, failed, denied, success as applicable | Pending | Pending |
| Browse | Pending | Pending | Pending | Loading, empty, error, conflict, success | Pending | Pending |
| Reserve | Pending | Pending | Pending | Pending, validation, denied, conflict, recovery, success | Pending | Pending |
| Return | Pending | Pending | Pending | Pending, denied, conflict, recovery, success | Pending | Pending |
| Admin overview | Pending | Pending | Pending | Loading, empty, denied, error, success | Pending | Pending |

## ASVS per-requirement table

Copy one row for every requirement in the starter's published applicable
ASVS 5.0 Level 1 list. This draft does not invent or omit requirement IDs.

| ASVS ID | Applicable / non-applicable reason | Verification method: automated, behavioral or manual | Command / file / reviewer | Raw result | Candidate identity | Disposition | Result |
|---|---|---|---|---|---|---|---|
| Pending from published starter list | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

## Restore record

| Step | Candidate / prior schema identity | Exact result | Data comparison | Recovery state | Result |
|---|---|---|---|---|---|
| Build prior fixture state without current migration/seed helpers | Pending | Pending | Pending | Pending | Pending |
| Take supported consistent backup | Pending | Pending | Pending | Pending | Pending |
| Upgrade/migrate | Pending | Pending | Pending | Pending | Pending |
| Restore compatible backup on fixture copy | Pending | Pending | Pending | Pending | Pending |
| Authenticate and use existing/new loan data | Pending | Pending | Pending | Pending | Pending |
| Destructive or incompatible-history negative control | Pending | Pending | Pending | Pending | Pending |
| Interrupted step and collision recovery controls | Pending | Pending | Pending | Pending | Pending |

Restore claims must state the data version and code version compatibility.
Never reset real or fixture data to make tests pass.

## Workload raw-run table

| Run | Seed identity | Warm-up | Duration | Samples | p50 list/reserve/return | p95 list/reserve/return | p99 list/reserve/return | Error rates | Peak RSS | Event-loop delay | Double bookings | Raw artifact | Result |
|---|---|---|---:|---:|---|---|---|---|---:|---:|---:|---|---|
| 1 | Pending | 30 s | 120 s | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 2 | Pending | 30 s | 120 s | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 3 | Pending | 30 s | 120 s | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 4 | Pending | 30 s | 120 s | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| 5 | Pending | 30 s | 120 s | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

Do not use the CI startup/health RSS check as a replacement for the full
reference workload.

## Evidence and claim summary

| Claim candidate | Permitted scope | Excluded scope | Blocking unknown/failure | Result |
|---|---|---|---|---|
| Applicable ASVS 5.0 Level 1 requirement results | Only IDs with method and raw result | Whole-application security or production readiness | Pending | Pending |
| WCAG 2.2 AA for named critical journeys | Only named journeys and states | Unnamed journeys or whole application | Pending | Pending |
| Concurrency | Only 20-user / 5-way declared workload | Scalability beyond envelope | Pending | Pending |
| Restore | Only declared schema/data/code combination and tested limits | General recovery or production backup schedule | Pending | Pending |
| Workload | Only declared Apple-silicon/16 GB warm-start envelope | Other hardware or scalability | Pending | Pending |

## Automated execution record

On 2026-11-22, the tracked starter template was rebuilt and tested on Node.js
24.22.3 with the pinned lockfile, then retested after the password, restore and
authentication changes:

| Command | Result |
|---|---|
| `npm rebuild better-sqlite3` | Passed after rebuilding an existing node_modules binary from Node 26 ABI 147 to Node 24 ABI 137 |
| `npm test` | Passed after source changes: 155 tests, 0 failed, 15 files |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed |
| `npm run openapi` | Passed; OpenAPI 3.1.0 emitted |
| `npm run e2e` | Passed: 12 browser tests, 0 failed |

These results are deterministic evidence for this working checkout. They do not
resolve the five applicable ASVS gaps, VoiceOver/manual WCAG evidence, the full
20-user reference workload, independent security review, exact-artifact
binding, or host/human qualification.

Operator actions remaining:

1. Freeze the starter candidate, recipe version, fixture hashes and exact tuple.
2. Populate the published ASVS applicability list without inventing IDs.
3. Run the automated journey, concurrency, restore and workload commands and
   retain raw artifacts.
4. Complete the VoiceOver/Safari manual procedure on each named journey/state.
5. Review failures and unknowns; narrow claims rather than filling gaps with a
   source pass.
6. Submit the completed matrix, protocol hash and raw artifacts for owner
   review before any evidence-ledger decision.
