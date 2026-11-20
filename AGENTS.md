# Portfolio Agentic Workspace Rules

This repository is configured for **mobile-friendly, agentic-driven development** using Antigravity native primitives (`AGENTS.md`, `.agents/skills/`, `swarm`, `browser`, `/plan`, `/learn`) and isolated git branches/worktrees.

## Repository Map

- `frontend/` — Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + `motion`.
  - UI & MVVM: `src/app/`, `src/components/`, `src/context/` (`ThemeContext`, `LanguageContext`), `src/hooks/usePortfolio.ts`, `src/data/portfolioData.ts`, `src/types/`.
  - Serverless API & Data: `src/app/api/{v1,market,cron}/`, `src/lib/{mongodb.ts,schemas/,services/}`.
  - Checks: `cd frontend && npm run lint && npm test && npm run build`
  - **Important**: Always heed `frontend/AGENTS.md` (Next.js 16 breaking changes; check `frontend/node_modules/next/dist/docs/` before assuming legacy Next.js APIs).
- `backend/` — Companion NestJS 11 microservice (`src/modules/{contact,health,projects,telemetry}`, `src/common/{filters,interceptors}`).
  - Checks: `cd backend && npm run lint && npm test && npm run build`

## Non-Negotiable Safety Guardrails

1. **Never commit or edit directly on `main`.** Always work on a feature branch (e.g., `feat/<slug>`, `fix/<slug>`, `ui/<slug>`) or an isolated worktree (`.agents/scripts/worktree.sh` or `swarm` `workspace: "share"`).
2. **Never push to `origin` or merge into `main`** unless the user explicitly approves.
3. **Never expose secrets** (`.env`, `.env.local`, API keys, MongoDB URIs, Resend keys).

## Default Phone-to-Agent Workflow (Two-Step)

When the user sends a rough, short, or exploratory feature/fix instruction (especially from a phone):

1. **Step 1 — Architect (Default)**: Activate the `prompt-architect` skill to turn the rough note into a **full coding-agent prompt & execution plan** with:
   - Exact scope, acceptance criteria, and non-goals
   - Only the **minimum required agents** (to conserve tokens)
   - Strict file-ownership boundaries so parallel workers never collide
   - Verification gates and `/learn` capture criteria
   - **STOP and wait for the user's `"go"`** (or tweaks) before editing code or launching a swarm.
2. **Step 2 — Execute (After `"go"`)**:
   - Ensure work is on an isolated branch/worktree.
   - Orchestrate the selected agents (use `swarm` with `workspace: "share"` only when 2+ independent write streams genuinely benefit from parallelism; otherwise run lean sequential/single-agent execution to save tokens).
   - Run `agent-visual-verifier` for UI changes and `agent-pr-reviewer` before reporting completion.
   - End with a **mobile-scannable summary**: Verdict, Diff Summary, Verification Results, and next-step options (`Merge`, `Iterate`, `/learn`).

## Available Specialist Agent Skills

Load only the skills needed for the current task (progressive disclosure):

- `prompt-architect` — Rough phone note → full coding-agent prompt + execution plan.
- `agent-backend` — NestJS 11 (`backend/`) and Next.js API/data layer (`frontend/src/app/api/`, `frontend/src/lib/`). Spawn **only** when API, schema, or backend code changes.
- `agent-frontend` — Next.js 16, React 19, MVVM hooks, ES/EN bilingual parity, Tailwind v4 (`frontend/src/`).
- `agent-ux-ui` — Design tokens, Dark/Light `ThemeContext`, responsive layouts, WCAG a11y, `motion` micro-interactions.
- `agent-visual-verifier` — Live browser verification (Dark/Light, ES/EN, Desktop/Mobile) + build/lint/test gates.
- `agent-pr-reviewer` — Independent read-only diff audit, contract parity, SOLID/clean architecture, merge readiness.
