# Use Ultracite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hand-rolled `.oxlintrc.json` and `.oxfmtrc.json` configs with the Ultracite preset so all lint rules are managed by the preset rather than manually maintained.

**Architecture:** Install `ultracite`, create `oxlint.config.ts` and `oxfmt.config.ts` that extend Ultracite presets, keep type-aware/type-check enabled, preserve the project-specific `sortTailwindcss` path, update lefthook and package scripts to invoke `ultracite`, remove old config files and `oxlint-tsgolint`.

**Tech Stack:** oxlint, oxfmt, ultracite, lefthook, pnpm

---

## File Map

| Action | Path               | Purpose                                                       |
| ------ | ------------------ | ------------------------------------------------------------- |
| Create | `oxlint.config.ts` | Replaces `.oxlintrc.json`; extends Ultracite presets          |
| Create | `oxfmt.config.ts`  | Replaces `.oxfmtrc.json`; extends Ultracite preset            |
| Delete | `.oxlintrc.json`   | Superseded by `oxlint.config.ts`                              |
| Delete | `.oxfmtrc.json`    | Superseded by `oxfmt.config.ts`                               |
| Modify | `package.json`     | Add `ultracite` dep, remove `oxlint-tsgolint`, update scripts |
| Modify | `lefthook.yml`     | Use `ultracite fix` instead of bare oxfmt/oxlint              |

---

### Task 1: Install Ultracite and remove unused dependency

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Add `ultracite` and remove `oxlint-tsgolint`**

```bash
pnpm add -D ultracite
pnpm remove oxlint-tsgolint
```

- [ ] **Step 2: Verify**

```bash
pnpm ls ultracite oxlint-tsgolint
```

Expected: `ultracite` appears, `oxlint-tsgolint` does not.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add ultracite, remove oxlint-tsgolint"
```

---

### Task 2: Create oxlint.config.ts

**Files:**

- Create: `oxlint.config.ts`
- Delete: `.oxlintrc.json`

The project uses React and TanStack Router, so combine `core` + `react` presets. Carry over type-aware and type-check options. The `core` preset exposes `ignorePatterns` that cover `.astro`, `dist`, `node_modules`, `.vercel` — no need to redeclare them.

- [ ] **Step 1: Create `oxlint.config.ts`**

```ts
import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react],
  ignorePatterns: core.ignorePatterns,
  options: {
    typeAware: true,
    typeCheck: true,
  },
});
```

- [ ] **Step 2: Delete `.oxlintrc.json`**

```bash
rm .oxlintrc.json
```

- [ ] **Step 3: Verify oxlint still runs**

```bash
pnpm exec oxlint --type-aware --type-check
```

Expected: exits 0 (or shows lint findings — no config errors).

- [ ] **Step 4: Commit**

```bash
git add oxlint.config.ts .oxlintrc.json
git commit -m "chore: migrate to ultracite oxlint preset"
```

---

### Task 3: Create oxfmt.config.ts

**Files:**

- Create: `oxfmt.config.ts`
- Delete: `.oxfmtrc.json`

Spread Ultracite's oxfmt defaults, then layer the project-specific `sortTailwindcss` path on top. `sortImports` and `sortPackageJson` are included in Ultracite's preset so no need to redeclare them.

- [ ] **Step 1: Create `oxfmt.config.ts`**

```ts
import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  sortTailwindcss: {
    stylesheet: "./src/styles/app.css",
  },
});
```

- [ ] **Step 2: Delete `.oxfmtrc.json`**

```bash
rm .oxfmtrc.json
```

- [ ] **Step 3: Verify oxfmt still runs**

```bash
pnpm exec oxfmt --check .
```

Expected: exits 0 or shows format diffs — no config errors.

- [ ] **Step 4: Commit**

```bash
git add oxfmt.config.ts .oxfmtrc.json
git commit -m "chore: migrate to ultracite oxfmt preset"
```

---

### Task 4: Update lefthook.yml to use ultracite

**Files:**

- Modify: `lefthook.yml`

`ultracite fix` runs both format and lint-fix in one pass. Replace the two separate jobs with a single `ultracite fix` job.

- [ ] **Step 1: Replace `lefthook.yml` content**

```yaml
pre-commit:
  parallel: false
  jobs:
    - name: fix
      run: pnpm exec ultracite fix {staged_files}
      glob: "*"
      stage_fixed: true
```

Note: `parallel: false` because `ultracite fix` already handles both oxfmt and oxlint internally in the right order.

- [ ] **Step 2: Verify hook runs clean on a staged file**

Stage any `.ts` file and trigger the hook manually:

```bash
git stash
git stash pop
lefthook run pre-commit
```

Expected: exits 0, no errors about missing config.

- [ ] **Step 3: Commit**

```bash
git add lefthook.yml
git commit -m "chore: use ultracite fix in lefthook pre-commit"
```

---

### Task 5: Update package.json scripts

**Files:**

- Modify: `package.json`

Replace the direct `oxfmt`/`oxlint` invocations with `ultracite` equivalents. Keep `format` and `format:check` pointing to `oxfmt` directly since `oxfmt .` is still the canonical format-all command; `ultracite check/fix` wraps both tools for the combined `check`/`lint` flows.

- [ ] **Step 1: Update scripts in `package.json`**

Replace the `scripts` block with:

```json
"scripts": {
  "dev": "vite dev",
  "build": "vite build",
  "preview": "vite preview",
  "start": "node .output/server/index.mjs",
  "check": "ultracite check",
  "format": "oxfmt .",
  "format:check": "oxfmt --check .",
  "lint": "ultracite check",
  "lint:fix": "ultracite fix",
  "prepare": "lefthook install"
}
```

- [ ] **Step 2: Verify `pnpm run lint` works**

```bash
pnpm run lint
```

Expected: exits 0 or shows lint findings — no missing binary errors.

- [ ] **Step 3: Verify `pnpm run format:check` works**

```bash
pnpm run format:check
```

Expected: exits 0 or shows format diffs.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "chore: update scripts to use ultracite"
```

---

## Self-Review

**Spec coverage:**

- ✅ Replace `.oxlintrc.json` → `oxlint.config.ts` with Ultracite preset (Task 2)
- ✅ Replace `.oxfmtrc.json` → `oxfmt.config.ts` with Ultracite preset (Task 3)
- ✅ Type-aware + type-check preserved (Task 2, `options` block)
- ✅ `sortTailwindcss` with `./src/styles/app.css` preserved (Task 3)
- ✅ lefthook updated (Task 4)
- ✅ package.json scripts updated (Task 5)
- ✅ `oxlint-tsgolint` removed — Ultracite `core` preset covers TypeScript rules (Task 1)
- ✅ `ultracite` installed as devDep (Task 1)

**Placeholder scan:** None found — all steps have exact commands and code.

**Type consistency:** `defineConfig` used in both `oxlint.config.ts` (from `oxlint`) and `oxfmt.config.ts` (from `oxfmt`) — consistent with the Ultracite docs pattern.
