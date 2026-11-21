# Tenet plan — remaining work

Status: **2026-11-21.** The v0.1.0 unqualified developer preview is published ([release](https://github.com/vedprakash-m/tenet/releases/tag/v0.1.0), built from `e52c2ec`). Source for target A is complete and deterministically tested. Qualification, host evidence and release identity are not. This file is the only plan and progress record. The three canonical specs (`PRD.md`, `tech-spec.md`, `ux-spec.md`) win over it wherever they disagree. The earlier runbook, with every finished work item, is archived locally at `.archive/specs/re-plan.md` (git-ignored; not in a fresh checkout).

**Current R1 structural mapping: 165 mapped / 15 host-only / 0 unmapped of 181 Musts, 0 qualified.** This is structural test and host categorization, not qualification or release approval.

---

## 1. Where things stand

| Area | State | Evidence |
|---|---|---|
| Kernel, plugin, starter recipe | ✅ Complete for target A. Undo, cleanup, GIT-09, the verdict table and the safety waves are in. | Frozen source `b7869a0`: `untrusted` run 44885756509 and `system-budgets` run 44885756487 green. |
| Current `main` | ◐ Local `npm run ci` 2,602 pass, 4 skips, 0 fail; `npm run uat` 158 observations. Hosted `untrusted` green after a rerun of a timing-flaky test; `system-budgets` long-history warm p95 failed at 300.7 ms vs 300 ms (see §7). | `e52c2ec` run 44935222346 (`untrusted`) and 44935222259 (`system-budgets`). |
| v0.1.0 preview | ✅ Published by hand, unsigned, notes disclose the failing budget row. | GitHub release `v0.1.0`; tarball built from the payload manifest, 103 files. |
| Product name | ✅ "Tenet" is final (PRD Q-13 closed 2026-11-21). | README, PRD, Tech Spec. |
| Host behavior (VS Code, Copilot) | ⛔ Unobserved beyond the October 19–20 observations. | `docs/user/qualified-tuple.md`. |
| Qualification | ⛔ 0 of 181 Musts qualified; 34 M0 ledger rows are `not-qualified`. | `docs/audits/evidence-ledger.json`. |

Status words: `☐` not started, `◐` in progress or local-only evidence, `✅` done with a commit or CI run, `⛔` blocked. `🔬` needs a dated observation on the real host.

---

## 2. Owner sign-off

| # | Decision | Recommendation | Owner answer |
|---|---|---|---|
| S1 | Target: A personal use, B public preview, C full R1 | A, then B | Direct requests selected a public preview (B) and its launch on 2026-11-21; target C source work continued. Signature pending. |
| S2 | Approve the working rules and the gates in §3 (work directly on `main`; no per-item sign-off for items the canonical specs define) | approve | Pending signature. |
| S3 | Authorize host spikes H1 (SP-08 remainder, SP-01, SP-02) and H2 (SP-12) | approve both | Pending. Spikes no longer gate the preview (§4). |
| S4 | Contracts for undo and cleanup (decisions of 2026-11-15) | approve | Implemented and merged; signature pending. |
| S5 | Canonical-spec edits for GIT-09 and the removal of the undo/cleanup limit from Tech Spec Appendix D | approve | Done; signature pending. |

Signed: ____ (date) ____

---

## 3. Rules

- Work directly on `main`; run the same gates a branch would: typecheck, both lints, coverage, build, payload and reproducibility checks, `npm test`, `npm run uat`, then privacy. See `.github/copilot-instructions.md`.
- Never force-push, rewrite history, or delete `refs/preserved/*`. Never commit anything under `specs/` except the three canonical specs and this file, anything under `.archive/`, or `.tenet/`.
- Never weaken, skip or delete a test, raise a timeout, budget or size ceiling to make CI pass. A flaky hosted check is rerun and disclosed, not loosened.
- Never write "works", "passes" or "qualified" without the command output or CI run that shows it. Host behavior is "unobserved" until a spike records it.
- Stop and write a row in §5 when the item needs a product decision the specs do not settle, a spec contradicts the contract, a fix would change the state schema or a reason code's meaning, or CI fails twice on the same cause.

---

## 4. Host track

The preview launches without these. They are required for qualification and for the M0 claim. Real hosts can also report through the host-observation issue form while they wait.

**H1 ◐ SP-08 remainder, SP-01, SP-02.** The owner checklist is `docs/audits/2026-11-21/target-a-host-checklist.md`; no one has run it. Run it in the `tenet-spike` VS Code profile and record VS Code, Copilot extension and model versions and, per step, observed / not observed (why) / documented only. Write the record to `docs/audits/<date>/host-spikes-h1.md`.

**H2 ◐ SP-12.** Measure the CLI front-end, 3 tasks × 5 runs, using the same checklist. If there is no MCP prototype, record that MCP was not measured; the CLI stays the shipped front-end.

**Cold install ☐.** Have one person who has not seen the project follow the README Quick start in a clean VS Code profile and report where it breaks. Fix what they find.

---

## 5. Open decisions and backlog

Add one row per stop: date, item, question, options, recommendation. The owner answers in the same row. An empty answer is an open gate.

| Date | Item | Question and options | Recommendation | Owner answer |
|---|---|---|---|---|
| 2026-11-21 | W4a/H1/H2 | Host qualification, owner M0 approval and dogfooding need owner execution on the qualified Mac tuple. | Run H1/H2, then approve the M0 claim. | |
| 2026-11-21 | EVD-04 sealed baseline | Tech Spec §9.8 names a temporary-index checkout with filter consent, while Appendix D says the blob materializer refuses applying filters, submodules, links and large trees. Choose the narrower claim (keep the fail-closed unknown) or approve the temporary-index protocol. | Keep the fail-closed claim; do not broaden sealed checkout silently. | |
| 2026-11-21 | QLT-11/QLT-13 traits | PRD §3.8.4–3.8.5 says traits contribute questions, invariants, checks, review items and specialists, but no closed obligation registry or reviewer field exists. Specify the registry and the missed-trait review finding first. | Specify, review, then test missed, late and unknown traits against it. No guessed obligation. | |
| 2026-11-21 | CON-07 reconstruction | Decision contents and unfinished-work selection after `.tenet/` loss need a closed projection. | Recover only admitted IDs; keep policy and charter undecided. | |
| 2026-11-21 | Reason codes | `observation-incomplete`, `ended-without-finish`, `port-in-use`, `server-identity-weak`, `migration-needs-approval`, `accessibility-claim-narrowed`, `audit-unavailable` and `dependency-unverified` need an observer, runtime declaration or approved migration flow. | Keep the registered code and no false producer; implement after the runtime contract exists. | |
| 2026-11-21 | Release identity | Signing key and revocation procedure, designated publisher, protected `release` environment with reviewers, `main` branch protection, maintainer MFA. | Create the key and environment, test the release workflow with a throwaway signed tag in a private repository, then enable branch protection once a run passes both workflows. | |
| 2026-11-21 | Flaky hosted checks | `system-budgets` long-history warm p95 (target ≤ 300 ms) failed 21 of the last 30 runs on shared GitHub runners; `storage-eviction` journal reduction (300 ms bound) failed once at 440 ms. The PRD names no reference hardware. | Decide a reference runner or a PRD amendment (for example a noise allowance or a dedicated runner) through the narrowing route in PRD §4.7. Do not loosen a budget in code. | |
| 2026-11-21 | Plugin README | `plugin/README.md` ships in the tarball and lacks the VS Code minimum and Git prerequisites now in the root README. Fixing it changes the payload. | Include it in v0.1.1 with other fixes from the cold install. | |

---

## 6. Remaining work, target C

### 6.1 Source and evidence status

| Area | Status | What remains |
|---|---|---|
| Commit and host the 2026-11-21 reconciliation | ✅ pushed to `main` | Exact-head hosted CI on the latest commit is unconfirmed. |
| Qualification structure | ◐ 181 Musts structurally mapped; 34 ledger records; 0 qualified | Semantic review and evidence for 147 more Musts, campaign manifests bound to one tuple and artifact SHA-256, owner decisions on all 19 Shoulds (`docs/audits/2026-11-21/should-dispositions.md`). |
| CON-07 reconstruction | ◐ 500-commit bound, decision and tag IDs, confirmed lock preview | Decision-content recovery and unfinished-work selection (§5). |
| EVD-04 sealed baseline | ⛔ | Owner choice in §5. |
| QLT-05 workload | ◐ source gaps closed locally | Native performance and host evidence; project-produced numbers do not become kernel measurements. |
| QLT-11 / QLT-13 traits | ⛔ | Owner semantics in §5. |
| RSC-08 model qualification | ◐ strict table and lookup exist; 0 records | Authorized campaign records and an observed model and tuple. |
| Appendix D reason codes | ◐ `alternative-check-missing` and `build-not-fresh` produced | The remaining codes in §5. |
| Security and release source | ◐ privacy, CI and diagnostics controls reviewed; finalization checklist in `docs/release/target-c-finalization.md` | Signing, publisher identity, branch protection, protected `release` environment, a 72-hour public review window on a PR. Private vulnerability reporting, secret scanning and Dependabot security updates are on. |
| Full R1 qualification | ⛔ | Spikes SP-03, SP-04, SP-05, SP-06, SP-07, SP-10, SP-11; starter ASVS, WCAG/VoiceOver, concurrency, restore and workload evidence; pilot with 8–12 participants, six formative sessions, calibration; all 181 Musts and 19 Shoulds reviewed; a PRD amendment batch. Needs participants and calendar time. |

---

## 7. Launch follow-ups

| Item | State |
|---|---|
| CI badge and flaky checks | ◐ The README shows the `untrusted` badge; it can turn red on the timing flake above. Remove the badge if it keeps flickering after §5's decision. |
| Spec defects | None recorded. Log any here and raise at once if one touches a never-waivable requirement (PRD §4.7). |
| First cold-install report | ☐ §4. |
| A real recording of a `/tenet` run for the README | ☐ Capture from the first real run; do not fabricate output. |
| v0.1.1 | ☐ Plugin README fix and anything the cold install finds. |
| Past commits | Public history includes personal author emails. The rules forbid history rewrites; recorded as accepted by the owner's decision to keep the repository public. |

---

## 8. Progress log (newest first, one line per event)

- 2026-11-21 — Condensed the runbook into this file; archived `re-plan.md` to `.archive/specs/`; recorded completed work in PRD Appendix D (v0.17.1) and Tech Spec Appendix D. Release notes and docs now read `specs/plan.md`.
- 2026-11-21 — Published pre-release v0.1.0 (unqualified, unsigned) from `e52c2ec`. Local `npm run ci` and UAT pass; hosted `untrusted` green after a rerun; `system-budgets` long-history warm p95 300.7 ms vs 300 ms, disclosed in the notes. Old draft releases deleted.
- 2026-11-21 — "Tenet" fixed as the final name; host spikes taken off the preview path; host-observation and install-help issue forms added; README rewritten around a five-minute quick start and a professional layout; community files moved to `.github/`.
- 2026-11-21 — Pushed `main` at `f2a4614` with exact-head `untrusted` and `system-budgets` green; read-only `open` fast path, CON-07 recovery of decision and tag IDs, QLT-05 build and series handling, and target-C finalization docs.
- 2026-11-20 — W1/W2 work items (routing, policy continuity, GIT-09, undo, cleanup, verdict table, P114, P52/P53, process and storage safety) merged at `b7869a0`; hosted CI green (`untrusted` 44885756509, `system-budgets` 44885756487).
- 2026-11-20 — `plan.md` and 85 earlier specs and reviews archived locally; `specs/` holds the canonical specs and the plan.

---

## 9. Where things are

| Location | Contents |
|---|---|
| `.archive/specs/re-plan.md` | The archived runbook and full progress log (local only) |
| `.archive/specs/plan-2026-11-20.md` | The first plan, with the defect index and spike runbook (local only) |
| `.archive/specs/open-drafts/` | Unsigned drafts that still inform the open items above (local only) |
| `docs/audits/2026-11-21/target-a-host-checklist.md` | H1/H2 and dogfood checklist for the owner |
| `docs/release/target-c-finalization.md` | Release readiness checklist |
| `docs/audits/evidence-ledger.json` | The 34 M0 ledger records, all `not-qualified` |
