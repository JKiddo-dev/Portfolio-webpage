# Coding-Agent Prompt Template

Use this structure when compiling a rough phone instruction into an execution-ready prompt. Omit sections that don't apply to keep it crisp on mobile.

```markdown
## Execution Brief: <Short Title>

- **Branch**: `feat/<slug>` (isolated from `main`; use `workspace: "share"` if swarming)
- **Mode**: `<Single-Agent | Swarm (N workers)>` — *<1-line reason for token efficiency>*
- **Goal**: <1–2 sentences stating the exact user outcome>
- **Non-Goals**: <What NOT to touch or over-engineer>

### Acceptance Criteria
- [ ] <Observable functional criterion>
- [ ] <ES/EN bilingual parity & Dark/Light theme parity (if UI)>
- [ ] <Tests / build / lint passing>

### Agent Assignments, Models & File Ownership
*(Include ONLY active agents for this task; assign the leanest model tier per `AGENTS.md`)*

1. **`<agent-name>`** — Model: **`<Model Display Name>`** (Skill: `.agents/skills/agent-<role>/SKILL.md`)
   - **Owns**: `<exact file/folder globs>`
   - **Must Not Touch**: `<disjoint files owned by others>`
   - **Tasks**:
     - <Concrete step 1>
     - <Concrete step 2>
   - **Done When**: <Exact deliverable + command output>

*(Repeat for each active agent)*

### Shared Contract (only if 2+ writers)
- <TypeScript interface, API endpoint shape, CSS token, or prop signature agreed upfront>

### Tooling & Verification Pipeline
1. **Plan**: Verify file paths & Next.js 16 docs (`frontend/node_modules/next/dist/docs/`) before editing.
2. **Build & Test**:
   - Frontend: `cd frontend && npm run lint && npm test && npm run build`
   - Backend *(only if touched)*: `cd backend && npm run lint && npm test && npm run build`
3. **Visual Audit** *(if UI)*: Run `agent-visual-verifier` via `browser` subagent (Light/Dark, ES/EN, Desktop + Mobile).
4. **PR Review**: Run `agent-pr-reviewer` on `git diff main...HEAD` for final Merge/Changes verdict.
5. **Learn**: If a reusable convention or gotcha was discovered, suggest a `/learn` update to `AGENTS.md` or `.agents/skills/`.
```
