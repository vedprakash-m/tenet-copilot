# H2 host-spike record template

**Status: pending. No front-end run, count or model measurement has been
recorded in this template.**

This template prepares SP-12. The command-line front-end is the shipped
front-end for target C in the supplied host checklist; the checklist states
there is no MCP prototype in this checkout. Record MCP as `not measured`
unless an eligible prototype is supplied and approved.

## Tuple and preparation

| Field | Value |
|---|---|
| Date and operator | Pending |
| Source commit | `git rev-parse HEAD`: pending |
| Bundle SHA-256 | `shasum -a 256 plugin/kernel/tenet.mjs`: pending |
| VS Code, Copilot extension, Local harness and settings | VS Code 1.147.0 arm64 with built-in GitHub Copilot `copilot-chat` 0.75.0; Local behavior and relevant feature settings remain to be observed |
| Copilot plan and organization-policy profile | Pending |
| macOS, Node.js, Git and architecture | macOS 27.2.1, Apple M3 Max arm64, Node 24.22.3, Git 2.56.0 |
| Requested/resolved model or `unknown` | Pending |
| Front-end under test | Command line; MCP `not measured` unless separately approved |
| Safety-gate result | Pending |
| Protocol hash | Pending |
| Overall result | Pending — not run |

Use a throwaway TypeScript project, synthetic data and no credentials. Freeze
the three task fixtures before the first run.

## Tasks

| ID | Task | Repetitions |
|---|---|---|
| H2-01 | Existing TypeScript bug with a dirty unrelated file | 5 |
| H2-02 | Small feature requiring one new acceptance example | 5 |
| H2-03 | Review followed by one selected fix | 5 |

Do not pool unlike tasks. Preserve all 15 raw counts. Report medians per task
and overall.

## Raw run table

Copy one row per repetition. Do not replace missing data with zero.

| Task/run | Front-end | Candidate/fixture hash | Started/end | Result/end state | Native approval count | Repeated approvals | Approval mode visibility | Elicitation route | Reviewer/analyst retyping | AI credits or `unknown` | Question/result/next-action legibility | Heredoc/stdin | Negative matching | Ended-turn Autopilot behavior | Result |
|---|---|---|---|---|---:|---:|---|---|---:|---|---|---|---|---|---|
| H2-01/1 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-01/2 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-01/3 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-01/4 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-01/5 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-02/1 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-02/2 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-02/3 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-02/4 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-02/5 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-03/1 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-03/2 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-03/3 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-03/4 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |
| H2-03/5 | Command line | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending |

For every run, also record:

- native approval count, repeated approvals and approval-mode visibility;
- native elicitation versus chat for routine and authority choices;
- coordinator retyping of Reviewer or Analyst output;
- AI credits or usage if the host exposes them, otherwise `unknown`;
- legibility of the question, result and next action;
- heredoc/stdin intactness and negative auto-approval matching;
- behavior after an ended turn; and
- exact command, failure, cancellation and unknowns.

## Safety and command-line matching

The safety gate covers kernel and child containment, workspace, user-directory
and OS-temp access, network, cancellation, disconnect behavior and
policy-denied server behavior.

Record a negative case for:

- `&&`;
- `;`;
- `|`;
- `>`;
- command substitution; and
- backtick substitution.

All must fail to match the routine auto-approval rule. No negative case may be
reported as safe because a routine command matched.

## Summary

| Measure | H2-01 | H2-02 | H2-03 | Overall | Threshold | Result |
|---|---|---|---|---|---|---|
| Raw approval counts | Pending | Pending | Pending | Pending | Retained | Pending |
| Approval median | Pending | Pending | Pending | Pending | ≤ 3 Tenet-caused prompts | Pending |
| Approval p90 | Pending | Pending | Pending | Pending | command-line rule: ≤ 3 | Pending |
| Repeated approvals | Pending | Pending | Pending | Pending | 0 | Pending |
| AI credits per task/outcome | Pending | Pending | Pending | Pending | denominators retained; failed/cancelled included | Pending |
| MCP median credits reduction | n/a | n/a | n/a | `not measured` | ≥ 15% if eligible | Pending |
| Retyping | Pending | Pending | Pending | Pending | Recorded, then owner review | Pending |
| Malformed calls | Pending | Pending | Pending | Pending | 0 for a qualification claim | Pending |
| Safety difference | Pending | Pending | Pending | Pending | No eligible safety regression | Pending |
| Legibility decision | Pending | Pending | Pending | Pending | Owner review | Pending |

A source pass, one favorable run or an undocumented host setting is not
front-end qualification.

Do not update a support label or the evidence ledger from this template.
