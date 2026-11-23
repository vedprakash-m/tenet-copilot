# H1 host-spike record template

**Status: pending. No host action has been run or recorded in this template.**

This template prepares owner-run evidence for SP-08, SP-01 and SP-02. It is
not a qualification record. Use a throwaway project with synthetic data and no
credentials.

## Tuple and preparation

| Field | Value |
|---|---|
| Date and operator | Environment metadata collected 2026-11-22; host operator run pending |
| VS Code version | 1.147.0 (`8a14f0cc1b08d531eb83255ea3764ae22aa932b5`), arm64 |
| Copilot Chat extension version | GitHub Copilot `copilot-chat` 0.75.0, shipped in this VS Code installation; actual profile behavior remains to be observed |
| Node.js version | 24.22.3 installed for the qualification run |
| Git version | 2.56.0 |
| macOS version and architecture | macOS 27.2.1, arm64, Apple M3 Max |
| Requested/resolved model | Pending; unknown is a permitted value |
| Agent harness | Intended: VS Code Local; the active qualification handler is pending observation |
| VS Code profile | `tenet-spike` |
| Relevant feature settings | Pending |
| Copilot plan and organization-policy profile | Pending |
| Plugin source commit | `git rev-parse HEAD`: pending |
| Plugin install path | Pending |
| Bundle SHA-256 | `shasum -a 256 plugin/kernel/tenet.mjs`: pending |
| Throwaway project path | Operator-selected clean TypeScript starter fixture with Node 24 dependencies installed; the local 2026-11-22 fixture is ready |
| Campaign protocol hash | Pending |
| Overall result | Pending — dedicated profile and clean fixture are open; host actions not run |

Preparation commands:

```sh
npm run build
git rev-parse HEAD
shasum -a 256 plugin/kernel/tenet.mjs
```

Operator preparation:

1. Use the `tenet-spike` VS Code profile.
2. Point that profile at this checkout's `plugin/` directory.
3. Create a throwaway TypeScript/Vitest project outside this repository.
4. Put synthetic conflicts, instruction files and review changes in the
   throwaway project only.
5. Record the exact command or host action, exact visible result, failures,
   approvals and the claim each result permits. Do not infer host evidence
   from source, tests or documentation.

## SP-08 — delegation and native tools

One row per case:

| Case | Exact operator action | Raw visible result / failure | Approval state | Permitted claim | Result |
|---|---|---|---|---|---|
| Fresh Reviewer context; declared tool scope; manifest read | Pending | Pending | Pending | Pending | Pending |
| Reviewer workspace search and `usages`; dispatch metadata | Pending | Pending | Pending | Pending | Pending |
| Two read-only children in parallel on the same revision | Pending | Pending | Pending | Pending | Pending |
| Blocked child | Pending | Pending | Pending | Pending | Pending |
| Failed child | Pending | Pending | Pending | Pending | Pending |
| Cancelled child | Pending | Pending | Pending | Pending | Pending |
| Dead child | Pending | Pending | Pending | Pending | Pending |
| Native `askQuestions` in a child | Pending | Pending | Pending | Pending | Pending |
| Native `todos` in a child | Pending | Pending | Pending | Pending | Pending |
| Nested delegation denied or unavailable | Pending | Pending | Pending | Pending | Pending |
| Dispatch, task creation, review, interruption, pause, resume, cancellation and completion remain distinguishable | Pending | Pending | Pending | Pending | Pending |
| Read an admitted manifest outside the workspace | Pending | Pending | Pending | Pending | Pending |
| Compare actual tool list and context behavior with Reviewer restrictions | Pending | Pending | Pending | Pending | Pending |

For a cooperative-only nested-delegation result, record that enforcement is not
established; do not label a tool restriction preventive.

## SP-01 — install and invocation

| Case | Exact operator action | Raw visible result / failure | Files or `.tenet/` changes | Permitted claim | Result |
|---|---|---|---|---|---|
| Complete plugin enable path and actual skill file path before load | Pending | Pending | Pending | Pending | Pending |
| `/tenet help` | Pending | Pending | Pending | Pending | Pending |
| One task through `finish` | Pending | Pending | Pending | Pending | Pending |
| Cold start | Pending | Pending | Pending | Pending | Pending |
| Terminal command active for 15 minutes and then completed through the host | Pending | Pending | Pending | Pending | Pending |
| One denied terminal execution; kernel stayed unrun or ran as stated | Pending | Pending | Pending | Pending | Pending |
| Plugin enable | Pending | Pending | Pending | Pending | Pending |
| Plugin disable | Pending | Pending | Pending | Pending | Pending |
| Plugin uninstall and any snapshot-copy behavior | Pending | Pending | Pending | Pending | Pending |
| Node.js discovery and execution without extra owner setup | Pending | Pending | Pending | Pending | Pending |

## SP-02 — storage and loading

| Case | Exact operator action | Raw result | Permitted claim | Result |
|---|---|---|---|---|
| Plugin writes user directory | Pending | Pending | Pending | Pending |
| Terminal writes user directory | Pending | Pending | Pending | Pending |
| Available MCP tool writes user directory, or is unavailable | Pending | Pending | Pending | Pending |
| Plugin writes `${PLUGIN_DATA}` | Pending | Pending | Pending | Pending |
| Terminal writes `${PLUGIN_DATA}` | Pending | Pending | Pending | Pending |
| Available MCP tool writes `${PLUGIN_DATA}`, or is unavailable | Pending | Pending | Pending | Pending |
| Plugin writes OS temp directory | Pending | Pending | Pending | Pending |
| Terminal writes OS temp directory | Pending | Pending | Pending | Pending |
| Available MCP tool writes OS temp directory, or is unavailable | Pending | Pending | Pending | Pending |
| Both `AGENTS.md` and `.github/copilot-instructions.md`: which instruction file loads | Pending | Pending | Pending | Pending |
| `.tenet/` exclusion from host indexing/search using a synthetic unique token | Pending | Pending | Pending | Pending |
| Host tokenizer or estimator on a bounded packet; compare with Tenet estimate | Pending | Pending | Pending | Pending |
| Skill, user setting and workspace-state load and persistence paths | Pending | Pending | Pending | Pending |
| Persistence across disable, restart and uninstall | Pending | Pending | Pending | Pending |

SP-02 pass threshold: tokenizer/estimator relative error ≤ 15%. If the
tokenizer is unavailable, record `unknown`; do not estimate it.

## H1 summary

| Field | Final value |
|---|---|
| Exact failures | Pending |
| Unknowns | Pending |
| Claims permitted by the raw record | Pending |
| Claims not permitted | Pending |
| Required follow-up | Pending |
| Qualification disposition | Pending; no qualification from a template |

Do not edit the evidence ledger from this template until authorized evidence
exists and the final campaign record is reviewed.
