# Cold-install record template

**Status: pending. No participant, install or timing record exists.**

This is a formative cold-install procedure, not an AC-02 qualification run and
not an install qualification campaign. Use one person who has not seen Tenet
and has no implementation help from the maintainer.

## Record identity

| Field | Value |
|---|---|
| Date and operator | Pending |
| Participant ID | Pending |
| Consent for research capture | Pending; product use alone is not consent |
| VS Code profile and exact host tuple | Pending |
| Source commit | `git rev-parse HEAD`: pending |
| Bundle SHA-256 | `shasum -a 256 plugin/kernel/tenet.mjs`: pending |
| README artifact and hash | `shasum -a 256 plugin/README.md`: pending |
| Synthetic project path | Pending |
| Result | Pending — not run |

## Preconditions

- Use a clean VS Code profile.
- Use synthetic code and no credentials.
- Use the install and invocation instructions in `plugin/README.md`.
- Freeze the exact host tuple and selected install path before timing starts.
- Give the participant no private briefing beyond the written README.
- Record denials and failures rather than bypassing policy or host consent.

## Participant script

Give the participant only:

> Follow the Tenet plugin README Quick start on this clean profile. Stop when
> you reach an actionable result, or stop and report the first prerequisite
> that blocks you.

Record:

1. the time at first engagement with the README;
2. the time the plugin is enabled;
3. the time `/tenet help` first renders;
4. the time the participant reaches an accurate next step for a ready
   fixture;
5. any blocked fixture and the prerequisite the participant names;
6. every question, denial, approval and host explanation;
7. every place the participant leaves the README or asks for rescue; and
8. the resulting project, `.tenet/` and user-directory changes.

## Raw timeline

| Event | UTC/local timestamp | Exact visible text/action | Files/state changed | Participant question | Result |
|---|---|---|---|---|---|
| Read README | Pending | Pending | Pending | Pending | Pending |
| Configure plugin setting | Pending | Pending | Pending | Pending | Pending |
| Enable plugin | Pending | Pending | Pending | Pending | Pending |
| Invoke `/tenet help` | Pending | Pending | Pending | Pending | Pending |
| Start ready fixture task | Pending | Pending | Pending | Pending | Pending |
| Reach first useful result or actual prerequisite | Pending | Pending | Pending | Pending | Pending |
| Disable/uninstall only if in the frozen procedure | Pending | Pending | Pending | Pending | Pending |

## Measures

| Measure | Definition | Provisional target | Raw value | Result |
|---|---|---|---|---|
| Install to engaged | Install starts to plugin responding with a usable next step | ≤ 5 min median on a ready fixture | Pending | Pending |
| First useful outcome | Start to checked change, review, plan, diagnosis or justified no-change result | ≤ 15 min median on a ready fixture | Pending | Pending |
| Accurate next step | Participant reaches an accurate next action without hidden maintainer correction | Required | Pending | Pending |
| Blocked prerequisite | Blocked fixture names the actual missing prerequisite | Required | Pending | Pending |
| Maintainership rescue | Time and cause recorded; rescue is not counted as participant success | Recorded | Pending | Pending |

One formative session cannot satisfy AC-02. The confirmatory run is separate,
frozen in advance, uses new participants and its threshold is 4 of 5
participants within 10 minutes.

## Post-run review

- [ ] Exact failures and screenshots/recording references are attached without
  real credentials or private data.
- [ ] Participant did not receive maintainer-only setup steps.
- [ ] `npm run build` and bundle identity are tied to the run.
- [ ] The result is labeled formative.
- [ ] Follow-up fixes are separate work; no threshold is changed after the run.
- [ ] No evidence-ledger entry is made from a draft or incomplete record.

## Operator actions remaining

1. Owner approves the run and any recording.
2. Recruit an unfamiliar participant under the participant protocol.
3. Freeze the tuple, source, README and installed artifact identities.
4. Run and preserve the raw timeline.
5. Review the record, then file each concrete break as separate work.
