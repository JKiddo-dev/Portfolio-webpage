---
name: prompt-architect
description: >-
  Turns a rough, short, or informal instruction (especially written from a phone)
  into a complete, coding-agent-ready prompt and multi-agent execution plan
  tailored to this portfolio repo. Use whenever the user gives a rough feature
  idea, UI tweak, bug fix, or asks to draft/expand a prompt for agents.
---

# Prompt Architect (Phone-to-Coding-Agent Compiler)

Your job is to transform a brief, rough user instruction into an unambiguous,
high-leverage **coding-agent prompt and execution plan**—not a generic chat
prompt—that leverages Antigravity's native tools (`swarm`, `browser`, `/plan`,
`/learn`, isolated branches/worktrees) while minimizing token waste.

## Workflow (Two-Step by Default)

1. **Quick Repo Grounding (Read-Only, Fast)**:
   - Check current branch (`git branch --show-current`) and only read the 1–3
     files directly relevant to the user's rough idea so file paths and symbols
     in your generated prompt are 100% real.
2. **Select the Leanest Agent Roster**:
   - **Token rule**: Never spawn an agent whose domain isn't touched.
   - `agent-backend`: Include **only** if touching `backend/`, `frontend/src/app/api/`, `frontend/src/lib/`, or `frontend/src/services/api.ts`.
   - `agent-ux-ui`: Include when adding/redesigning layouts, styling, animations, Dark/Light theme tokens, or responsive behavior.
   - `agent-frontend`: Include for React/Next.js components, MVVM hooks, state, data (`portfolioData.ts`), or ES/EN translations.
   - `agent-visual-verifier`: Include for any user-visible UI change.
   - `agent-pr-reviewer`: Include for any non-trivial change (2+ files or cross-layer work).
3. **Choose Execution Mode**:
   - **Single-agent / sequential**: When only 1 writer role is needed (cheapest in tokens).
   - **Swarm (`workspace: "share"`)**: When 2+ writers can work in parallel on **disjoint files** (e.g., `ux-ui` + `frontend` or `backend` + `frontend`), plus `visual-verifier` / `pr-reviewer`.
4. **Emit the Structured Coding-Agent Prompt**:
   - Follow [prompt-template.md](./references/prompt-template.md).
   - Keep formatting **mobile-scannable** (short bullets, clear headers, no walls of text).
   - Explicitly specify:
     - Target branch name (e.g., `feat/<short-slug>`)
     - Exact per-agent ownership (allowed files + forbidden files)
     - Shared interface/contract (if multiple agents collaborate)
     - Concrete verification commands & visual checks
     - Slash-command / tool hooks (`/plan` if architectural, `swarm` if parallel, `browser` for UI check, `/learn` if a new convention emerges)
5. **Pause for Approval**:
   - End with a short prompt: *"Reply **`go`** to run this plan as-is, or tell me what to adjust."*
   - Do **not** edit code or launch a swarm until the user confirms (unless the user explicitly wrote `auto` or `skip approval`).
