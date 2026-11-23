# Participant study protocol and consent plan

**Status: pending. This document authorizes no recruitment, recording, paid
run, publication or data collection. No participant or result is recorded.**

## Purpose and evidence boundary

The study separates:

- six formative sessions for design input; and
- an 8–12 participant qualification cohort for value and experience.

Formative results do not qualify AC-02, AC-12 or any experience claim. A
qualification result needs a separately frozen confirmatory protocol, new
participants and the canonical thresholds.

Participants must be external technical builders for the qualification cohort.
Use synthetic or public repositories by default. Private repositories require
separate exact-scope consent and may never leave the participant's control
without redaction.

## Authorization checklist

Before contact with a participant:

- [ ] Evaluation owner names the protocol owner.
- [ ] UX owner reviews the experience rubric.
- [ ] Product owner and evaluation owner approve the frozen thresholds.
- [ ] Recording, access, storage and publication plan is approved.
- [ ] Recruitment wording and compensation, if any, are separately approved.
- [ ] Provider/organization spending controls hard-block paid overage, or live
  work is not started.
- [ ] Private-data handling and incident steps are approved.
- [ ] Protocol, fixture hashes, task order and artifact identity are frozen.
- [ ] Named evaluators and access list are recorded.

## Six formative sessions

Use think-aloud. These sessions are design input only and must use the
canonical scenarios in this order or a separately approved randomized order:

| Session | Scenario | Capture | Result |
|---|---|---|---|
| F-01 | Clear bug fix | Timings, kernel call logs, redacted synthetic inputs/outputs where capture mode is authorized; failure causes | Pending |
| F-02 | Ambiguous new feature | Same | Pending |
| F-03 | Review followed by selected fixes | Same | Pending |
| F-04 | Interrupted task with conflicting human edits | Same | Pending |
| F-05 | Temporary preference change | Same | Pending |
| F-06 | Status question during active work | Same | Pending |

Do not count formative sessions in the qualification cohort, reuse their
participants for confirmatory AC-02 or cite their aggregate as qualification.

## Qualification cohort

Recruit 8–12 external technical builders. Each participant completes at least
two matched task pairs:

| Condition | Requirement |
|---|---|
| Tenet arm | Installed artifact on the frozen tuple |
| Native arm | Same participant using a fixed, good-practice `AGENTS.md` published before the study |
| Matching | Host, model, recipe and endpoint |
| Assignment | Similar size and risk; randomized order and assignment within each pair |
| Reuse | A solved task is never reused in the other condition |
| Stratification | Task complexity and familiarity |
| Follow-up | 2 weeks for escaped defects |

All eligible work enters the denominator, including failed, rejected,
cancelled and blocked tasks. A missing research acceptance judgment is
censored, not a success or failure.

## Measures and provisional thresholds

| Measure | Definition | Threshold or rule | Result |
|---|---|---|---|
| Active human minutes | Reading, deciding, prompting, correcting and verifying; excludes waiting | Tenet/native participant ratio; primary target ≥ 30% reduction | Pending |
| Primary estimate | Cohort geometric mean with 90% bootstrap interval resampled over participants | Point estimate ≤ 0.70 and interval upper bound < 1.0, plus guardrails | Pending |
| Escaped defects | Defects found in the 2-week follow-up | No increase claim beyond the evaluated sample | Pending |
| Cost | Premium requests, model calls, tokens and elapsed time for both conditions | Quick ≤ 1.3×; Standard ≤ 2× native, failed/cancelled included | Pending |
| AC-02 | Accurate next step within 10 min from README | ≥ 4 of 5 new unfamiliar technical builders | Pending |
| First useful outcome | Ready fixture | Median ≤ 15 min | Pending |
| Seeded misreadings | Consequential misinterpretations caught before build | ≥ 70% | Pending |
| Comprehension | Scope, endpoint, limits and material risk | ≥ 80% | Pending |
| Duplicate approvals | Required count | 0 | Pending |
| Tenet-caused host prompts | Per Standard task | ≤ 3 | Pending |
| Voluntary reuse | Later task chosen without prompting | Reported, not a standalone pass | Pending |

## Consent form fields

Present a specific written form before capture. Keep one signed copy under the
approved access controls and give the participant a copy.

| Required disclosure | Final text / attachment | Complete |
|---|---|---|
| Research purpose and that this is not product telemetry | Pending | Pending |
| What is recorded: timings, kernel call logs and, only with synthetic fixtures and capture mode, redacted inputs/outputs | Pending | Pending |
| Screen/recording, think-aloud and self-report scope | Pending | Pending |
| Synthetic/public/private repository policy | Pending | Pending |
| Storage location and named evaluation/UX owner access | Pending | Pending |
| Redaction method and publication limits | Pending | Pending |
| Research retention: deleted 90 days after analysis unless separately agreed | Pending | Pending |
| Operational state, product traces, synthetic evaluation capture and migration backups are outside this consent policy | Pending | Pending |
| Local deletion path: delete a local bundle before upload | Pending | Pending |
| Withdrawal: at any time, by participant ID, deletes participant data and derived records within Tenet's control | Pending | Pending |
| Provider-held copies cannot be deleted by Tenet | Pending | Pending |
| Raw recordings and participant source are never published | Pending | Pending |
| Only aggregated results and separately consented excerpts may be published | Pending | Pending |
| Product use never implies research consent | Pending | Pending |
| Contact and withdrawal request method | Pending | Pending |
| Compensation, if separately approved | Pending | Pending |
| Participant confirmation that consent is voluntary | Pending | Pending |
| Participant confirmation that questions were answered | Pending | Pending |

Silence, a default setting, a selected option, signing a product-use flow or
accepting a task result is not research consent.

## Session procedure

For every session:

1. Verify identity, signed consent and capture scope.
2. Reconfirm the fixture is synthetic/public and the host tuple matches.
3. Record participant ID, not a name, in the working record.
4. Start only the frozen task and condition.
5. Preserve complete session boundaries, including stop, failure, cancellation
   and recovery.
6. Record exact timings, prompts, approvals, host explanations and unknowns.
7. Separate participant acceptance from any product endpoint.
8. Ask no post-task question that changes a prior result.
9. Store approved artifacts; redact before any handoff.
10. End with withdrawal information and the 2-week follow-up plan where
    applicable.

## Withdrawal and deletion

Withdrawal may occur at any time. The operator must:

1. stop new collection;
2. identify the participant by ID;
3. remove local recordings, prompts, transcripts, derived analysis and exports
   within Tenet's control;
4. record the deletion boundary and any provider-held copy outside Tenet's
   control;
5. preserve a minimal non-research audit statement if required and approved,
   without participant content; and
6. exclude withdrawn participant data from all later cohort calculations.

Default retention is deletion 90 days after analysis unless the participant
separately agrees otherwise. Any different period needs specific consent and
owner approval; it is not implied by this protocol.

## Reporting

Report:

- protocol hash, tuple and strata;
- all results, including failures, cancellations, dropout and unknowns;
- cohort totals and denominators;
- 90% bootstrap uncertainty;
- selection and dropout bias;
- adjudication notes and role-consolidation disclosure;
- access, retention and withdrawal outcomes; and
- the owner disposition.

With 8–12 participants, only large effects are detectable. Publish results as
directional with uncertainty. Any no-increase escaped-defect wording must stay
limited to the evaluated sample and supported raw records. This template makes
no such claim.
