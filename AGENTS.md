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

## Model Routing Policy (Token & Quota Discipline)

Explicitly assign the leanest capable model per worker when spawning or switching `swarm` agents (`swarm{action:"add", model:...}` or `swarm{action:"model", ...}`). Before spawning a swarm, check `swarm{action:"models"}` to avoid depleted quota pools:

| Role / Task Tier | Default Model | Notes |
|---|---|---|
| **Architecture / Complex Refactor / Hard Bugs** | `Gemini 4 Neon (High)` or `Gemini 4 Hydrogen (High)` | Reserve `High` for multi-module design, tricky state/contracts, or debugging |
| **Standard Frontend / UX-UI / Backend Implementation** | `Gemini 4 Neon (Medium)` or `Gemini 4 Hydrogen (Medium)` | Default for component, hook, and API implementation |
| **Simple Copy / Small CSS / Single-File Tweaks** | `Gemini 4 Neon (Low)` or `Gemini 3.8 Flash (Medium)` | Fast, minimal thinking overhead |
| **PR Reviewer** | `Claude Sonnet 5.5 (Medium)` *(fallback: `Gemini 4 Argon (Medium)`)* | Cross-model second opinion + separate quota pool |
| **Visual Verifier (Lint/Test/Build) & Monitor** | `Gemini 3.8 Flash (Low)` or `Gemini 4 Neon (Low)` | Command runner & stall checks need minimal reasoning |

- Always list each worker's planned model in the Step 1 Execution Brief so the user can override in 2 words from their phone (e.g., `"go, neon high on frontend"`).
- Prefer `swarm{action:"model"}` to escalate a stuck worker to `High` rather than killing and re-spawning it.

## Learned UI & Light-Mode Guardrails

- **Never pair `bg-emerald-*` with `text-white`**: `globals.css` overrides `html.light .text-white` to `#09090b`. Always use `.btn-primary` or `bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]` for solid active tabs, badges, and CTAs.
- **Avoid uncovered dark opacity hover/active backgrounds**: Use `bg-[var(--surface-subtle)]` / `hover:bg-[var(--surface-subtle)]` instead of `bg-zinc-800/40` or `hover:bg-zinc-800/70` so Light mode never flashes dark charcoal behind dark text.
- **Dark consoles stay inside `.terminal-window`**: Code viewers, REST inspectors, and telemetry logs must use `.terminal-window` so `globals.css` preserves high-contrast dark chrome in Light mode.
- **Equal container edges**: Use `max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full` consistently across every page section.
- **Distinct 4-Theme Material Identities**: Keep each theme's ground, surface material, and accent unmistakably distinct so themes never look like variants of each other:
  - `dark`: Deep charcoal `#09090b` + emerald `#10b981`
  - `light`: Crisp paper `#fafaf9` + forest emerald `#047857`
  - `glass` *(default)*: Dusk amethyst / obsidian twilight `#0b0a14` + frosted specular glass + silver-lavender `#c4b5fd` *(restrained, never neon cyberpunk purple-pink)*
  - `neumorphism`: Warm Architectural Stone / Braun Clay `#d6cfc2` + high-relief convex/concave dual shadows + burnt terracotta `#b45309` / `#9a3412` + warm obsidian `#161412` `.terminal-window` *(avoid pale cool-grey neumorphism that blurs into Light mode)*.
