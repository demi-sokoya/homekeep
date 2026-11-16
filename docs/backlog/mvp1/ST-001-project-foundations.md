<!-- title: ST-001 Project foundations | labels: story,mvp1,enabler -->
> **Technical enabler** · E01 Foundations · 2 pts · MVP1, planned sprint S1 · Priority Must

## Why
Every later story needs the same scaffold, folder layout, type checks and branch rules. Setting them up once, before any feature code, keeps the repo readable and the commit history clean (SOP 1.3, 4.1, 5.2).

## What
A Vite + React + TypeScript project on a `dev` branch, with the agreed folder structure, linting, type checks in CI and the required repo documents.

### Business rules
- Scaffold from `dev`, not `main`: `npm create vite@latest . -- --template react-ts`
- Folders: `src/components/`, `src/pages/`, `src/hooks/`, `src/styles/`, `src/types/`, `src/utils/`, `docs/`
- Branches: `main` (production, PR only), `dev` (integration), `feat/[name]`, `fix/[name]`
- Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- CSS Modules + CSS custom properties; no CSS framework
- Vitest set up for unit tests
- `main` protected: no direct pushes, PR required, CI must pass
- `package.json` scripts the CI workflow (`.github/workflows/ci.yml`) already calls: `format:check` (Prettier), `lint` (ESLint), `typecheck` (`tsc -b`; the root tsconfig only holds project references, each with `noEmit`), `test` (`vitest run`), `build`; `test:e2e` arrives with ST-029
- In the same pull request: remove the "App scaffold present (until ST-001)" steps and their `if:` lines from `ci.yml`, and add an npm entry to `.github/dependabot.yml`
- `.github/pull_request_template.md` is used for every story PR (one story per PR, `Closes #n`)
- Repo root has `README.md` (overview, stack, local setup), `CHANGELOG.md` (Keep a Changelog), `.env.example` (empty template is fine)

### Depends on
- None

### Out of scope
- Deploys (ST-008)
- PWA setup (ST-027)

### Test data
- None

## Done when
```gherkin
Feature: Project foundations

  Scenario: Fresh clone runs
    Given a fresh clone of the repository
    When I run npm install and npm run dev
    Then the app starts locally without errors

  Scenario: Type errors fail the build
    Given a pull request that introduces a TypeScript error
    When continuous integration runs npm run typecheck (tsc -b)
    Then the check fails and names the file

  Scenario: Checks run on every pull request
    Given a pull request to dev or main
    When continuous integration runs
    Then lint, type check and unit tests all run and must pass before merge

  Scenario: Main is protected
    Given I try to push directly to main
    When the push reaches GitHub
    Then it is rejected
```

## Security and privacy
No secrets in the repo; `.env` is git-ignored and only `.env.example` is committed.

PRD reference: §6 Tech stack · SOP 1.3, 4.1, 5.2

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
