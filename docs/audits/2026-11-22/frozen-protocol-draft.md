# Target C frozen protocol draft

**Status: pending. This is a draft, not a frozen or approved protocol. No
qualification result is recorded here.**

Do not freeze this draft, start paid live work, recruit participants, collect
research data, publish results or change a threshold without the applicable
owner authorization. Every final result must name its evidence tier and
artifact identity. A source pass, local fixture result, proxy result or this
draft does not qualify a host, model or requirement.

## Campaign boundary

The campaign covers target C preparation for:

- T3 host and front-end work in H1 and H2;
- T4 formative sessions and qualification participation;
- starter assurance for ASVS, WCAG/VoiceOver, concurrency, restore and the
  reference workload; and
- the target C qualification gate in `specs/plan.md`.

Supporting templates:

- [H1](host-spikes-h1.md)
- [H2](host-spikes-h2.md)
- [Cold install](cold-install.md)
- [Participant study](participant-study-protocol.md)
- [Starter assurance matrix](starter-assurance-matrix.md)

## Freeze fields

Complete and approve these fields before the first qualification run.

| Field | Frozen value | Status |
|---|---|---|
| Protocol version | `2026-11-22-draft-1` | Pending |
| Campaign owner | Pending | Pending |
| Product owner | Pending | Pending |
| Release owner | Pending | Pending |
| Security owner | Pending | Pending |
| Evaluation owner | Pending | Pending |
| UX owner | Pending | Pending |
| Tenet source commit | `git rev-parse HEAD`: pending execution | Pending |
| Tenet plugin version | `plugin.json`: pending read | Pending |
| Installed artifact SHA-256 | `shasum -a 256 plugin/kernel/tenet.mjs`: pending execution | Pending |
| Protocol SHA-256 | Calculate only after approval; command below | Pending |
| Start date and time | Pending | Pending |
| End date and time | Pending | Pending |
| Included tasks and fixtures | Listed below | Pending |
| Allowed actions and authority | Must be frozen per suite | Pending |
| Excluded actions | Remote effects; paid overage; real credentials and private data | Pending |
| Expected results and adjudication rubric | Links to final run records | Pending |
| Negative-control tolerances | Per suite below | Pending |
| Invalid-run list | See Invalid-run rules | Pending |
| Stop rules | See Stop rules | Pending |

The qualification tuple is fixed by PRD Section 2.2. Fill each exact version
before execution; do not shorten it to a model or host name.

| Tuple dimension | Exact value | Status |
|---|---|---|
| VS Code version | Pending | Pending |
| Copilot Chat extension version | Pending | Pending |
| Agent harness | VS Code Local | Pending |
| Plugin format version | Pending | Pending |
| Install path | Pending; SP-01 must select one | Pending |
| Relevant feature settings | Pending | Pending |
| Copilot plan and organization-policy profile | Pending | Pending |
| OS version and architecture | macOS arm64, exact macOS version pending | Pending |
| Execution target | Local machine | Pending |
| Workspace mode | Single-folder workspace, single Git repository, ≤ 10,000 tracked files | Pending |
| Recipe and toolchain versions | TypeScript recipe; exact versions pending | Pending |
| Requested model and resolved model | Pending; unknown remains a valid value | Pending |
| Node.js version | Active or maintenance LTS, exact version pending | Pending |
| Git version | Pending | Pending |

## Tasks and repetitions

| Suite | Task or fixture | Minimum repetitions | Evidence tier | Result |
|---|---|---|---|---|
| AC-01 | Clean install, invocation and removal on the selected install path | 3 per tuple | T3 | Pending |
| H1 / SP-01 | Install, invocation, 15-minute terminal command, denied execution, lifecycle | 1 complete run, then repeat failures that block interpretation | T3 | Pending |
| H1 / SP-02 | Storage, instruction loading, exclusion and tokenizer | 1 complete run, then repeat failures that block interpretation | T3 | Pending |
| H1 / SP-08 | Delegation and native tools | 1 complete matrix | T3 | Pending |
| H2 / SP-12 | Existing TypeScript bug with unrelated dirty file | 5 per eligible front-end | T3 | Pending |
| H2 / SP-12 | Small feature with one new acceptance example | 5 per eligible front-end | T3 | Pending |
| H2 / SP-12 | Review followed by one selected fix | 5 per eligible front-end | T3 | Pending |
| AC-02 formative | Six scenario sessions | 6 sessions; design input only | T4 | Pending |
| AC-02 confirmatory | Unfamiliar technical builders | 5 new participants, with 8–12 cohort study completing paired tasks | T4 | Pending |
| AC-12 | Crossover matched task pairs | At least 2 per qualification participant | T4 | Pending |
| Release qualification | Mapped suite runs by model stratum | At least 5 per model stratum; more for rare-failure conditions | T3 | Pending |
| Starter assurance | ASVS, WCAG/VoiceOver, concurrency, restore and workload matrix | At least 5 qualification runs where the suite varies by run; manual checks once per frozen artifact and journey unless scope changes | T1/T3 | Pending |

The H1 repetition rows are a campaign record requirement, not a claim that one
run proves qualification. Safety suites require zero violations across all
runs. A 2-week follow-up is required for escaped-defect claims in the human
study.

## Thresholds and decision rules

### Product and experience

| Measure | Frozen threshold for this draft | Result |
|---|---|---|
| Install to engaged | Median ≤ 5 min on a ready fixture | Pending |
| First useful outcome | Median ≤ 15 min on a ready fixture | Pending |
| AC-02 confirmatory first use | ≥ 4 of 5 unfamiliar technical builders reach an accurate next step within 10 min; blocked fixtures name the actual prerequisite | Pending |
| Active human effort | ≥ 30% fewer active human minutes per accepted outcome | Pending |
| AI credits per accepted outcome | Quick ≤ 1.3×; Standard ≤ 2× native baseline; failed and cancelled runs included | Pending |
| Review recall | ≥ 80%; each critical seeded defect in ≥ 4 of 5 runs; precision ≥ 70% | Pending |
| Duplicate approvals | 0 | Pending |
| Tenet-caused host prompts | ≤ 3 per Standard task | Pending |
| Resume | ≤ 2 min, with 0 unnecessary repeated questions | Pending |
| Comprehension | ≥ 80% in research sessions | Pending |
| False checked-local verdicts | 0 on all seeded fixtures and runs | Pending |
| VoiceOver and keyboard | All declared critical journeys and their states pass their manual steps | Pending |
| Starter concurrency | 20 simultaneous users and a 5-way same-item burst; 0 double bookings | Pending |
| Starter latency | p95 ≤ 200 ms for list, reserve and return | Pending |
| Starter peak server RSS | ≤ 400 binary MB in the reference workload | Pending |

### H2 front-end choice

For each eligible front-end and each of the three tasks, preserve all 15 raw
counts. Do not pool unlike tasks. Report medians per task and overall.

- The command line 90th percentile must not exceed 3 Tenet-caused prompts.
- MCP is eligible only if it passes the safety gate.
- MCP is selected if the command line 90th percentile exceeds 3 prompts, or if
  MCP uses at least 15% fewer credits per Standard task at the median with no
  safety difference.
- Otherwise the command line remains, unless the owner selects MCP after
  reviewing retyping and legibility.

### Negative controls

- Install a clean control and include denial, dirty-tree and failure cases.
- H2 preserves negative heredoc/stdin and auto-approval matching checks for
  `&&`, `;`, `|`, `>`, `$()` and backtick substitution.
- Review campaigns include seeded defects and clean controls.
- Safety, false-verdict and security suites require zero violations across all
  runs.
- Restore and concurrency controls must preserve fixture data and never
  infer success from a happy path.

## Invalid-run rules

An invalid run must be declared before execution and is limited to an
exogenous evaluation-harness failure or host outage outside the supported
conditions. Retain its raw record, reason, cost and time; do not score it as a
product pass or failure.

Session limits and host failures inside supported conditions are scored. A
supported-condition failure, cancellation, malformed call, denied execution,
timeout or missing result stays in denominators and cost. Never repeat a run
to obtain a pass.

For bookkeeping latency, an environment-invalid run is allowed only when a
measured `fsync` or `fdatasync` storage stall of at least 20 ms explains the
wall-time miss and removal of stall time brings the call within budget. More
than 2 of 5 environment-invalid runs leaves the budget unestablished.

## Stop rules

Stop the affected campaign immediately when:

- a real credential, private participant source or sensitive data enters a
  fixture or export;
- the exact tuple or installed artifact identity is unknown or changes during
  the run;
- paid overage cannot be blocked with provider or organization controls;
- a required front-end safety gate fails;
- required authority or participant consent is absent;
- a participant withdraws or requests that collection stop;
- a destructive or remote action would be attempted without explicit authority;
- a never-waivable integrity, privacy, security, Git/state recovery, verdict or
  CI-security case fails;
- thresholds or evaluators would need to change after results are known; or
- a run would change, conceal or discard protected user work.

Stop the individual contract at its attempt, review, delegation or active-time
bound. Do not raise those counters in R1. A user grant may extend only the
active-time check-in interval; exhaustion is not approval.

After a failed cycle, retain and publish the result. A new revision needs a
new frozen qualification cycle. Do not move a threshold after inspecting
results.

## Artifact identity and commands

Run from the repository root. These commands are instructions for the
operator; no command output is embedded in this draft.

```sh
git rev-parse HEAD
git status --short
npm run build
shasum -a 256 plugin/kernel/tenet.mjs
git rev-parse --show-object-format
```

After protocol approval, calculate and record:

```sh
shasum -a 256 docs/audits/2026-11-22/frozen-protocol.md
```

The final protocol, the campaign manifest and every result artifact must stay
bound to one source commit and one installed payload identity.
