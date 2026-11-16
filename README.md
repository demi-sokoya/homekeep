# Homekeep

A calm, mobile-first web app for keeping on top of recurring home tasks: what is due today, room by room,
with gentle streaks and XP instead of guilt. Designed for a 375px phone first and installable as a PWA
(ST-027). In MVP1 all data stays in your browser (localStorage); nothing is sent to a server.

See [`docs/PRD.md`](docs/PRD.md) for the product requirements and [`docs/backlog/`](docs/backlog/README.md)
for the MVP1 stories.

## Stack

| Layer      | Choice                                                 |
| ---------- | ------------------------------------------------------ |
| Framework  | React 19 + TypeScript, built with Vite                 |
| Styling    | CSS Modules + CSS custom properties (no CSS framework) |
| State      | React state + localStorage                             |
| Unit tests | Vitest + Testing Library (jsdom)                       |
| Quality    | ESLint, Prettier, `tsc` type check                     |
| Hosting    | Vercel (ST-008)                                        |

## Local setup

Requires Node 24 (see [`.nvmrc`](.nvmrc); `nvm use` picks it up).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Scripts

| Script                 | What it does                                   |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the dev server with hot reload           |
| `npm run build`        | Type check and build for production to `dist/` |
| `npm run preview`      | Serve the production build locally             |
| `npm test`             | Run the unit tests once (`vitest run`)         |
| `npm run test:watch`   | Run the unit tests in watch mode               |
| `npm run lint`         | ESLint                                         |
| `npm run typecheck`    | TypeScript type check, no output files         |
| `npm run format`       | Format everything with Prettier                |
| `npm run format:check` | Check formatting without changing files        |

CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) runs formatting, lint, the raw-colour check, type
check, unit tests, build, `npm audit` and a secret scan on every pull request. All must pass before merge.

## Project layout

```
src/
  components/  shared UI components
  pages/       one folder or file per screen
  hooks/       React hooks (including the storage hook, ST-004)
  styles/      global CSS and design tokens (ST-002)
  types/       TypeScript interfaces for the data model
  utils/       pure helpers (dates, scheduling, XP)
docs/          PRD, design language and backlog
tools/ci/      scripts CI runs, with their own tests
```

## Branches and commits

- `main` is production. It is protected: no direct pushes, a pull request is required and CI must pass.
- `dev` is the integration branch. Only `dev` merges into `main`.
- Work happens on `feat/<name>` or `fix/<name>` branches cut from `dev`, one story per pull request into
  `dev`, using [the PR template](.github/pull_request_template.md) with `Closes #<issue>`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`,
  `chore:`, `ci:`, `test:`, `refactor:`.

The protection for `main` is kept in [`.github/rulesets/protect-main.json`](.github/rulesets/protect-main.json).
To apply it: repository **Settings → Rules → Rulesets → New ruleset → Import a ruleset**, and choose that
file.

## Environment

No environment variables are needed for MVP1. [`.env.example`](.env.example) is the template; `.env` files
are git-ignored and secrets never go in the repo.
