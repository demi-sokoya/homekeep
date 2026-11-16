<!-- title: ST-029 End-to-end tests for the core flows | labels: story,mvp1,enabler -->
> **Technical enabler** · E08 Quality and release · 2 pts · MVP1, planned sprint S4 · Priority Must

## Why
The four prototype flows are what MVP1 promises. Testing them end to end on every pull request means a change to dates, XP or storage cannot quietly break them.

## What
Playwright tests at a 375px phone viewport for the four prototype flows plus persistence, running in CI.

### Business rules
- Flows: (1) complete and restore a task, (2) add a task from the + button, (3) Move-Out shifts countdowns, (4) Rooms ↔ Frequency toggle
- Plus: data persists after reload; first-run state
- Fixed clock and seeded localStorage so tests are deterministic
- axe accessibility scan on each screen visited (ST-028)
- Run in CI on pull requests to `dev` and `main`, with `--trace off` by default
- Unit tests for schedule, XP and streak functions already live with their stories (ST-005, ST-021, ST-022)

### Depends on
- ST-009, ST-010, ST-011, ST-020, ST-025

### Out of scope
- Visual regression screenshots (post-MVP)

### Test data
- Seed with 6 rooms and 8 made-up tasks; clock fixed to 2026-03-14 09:00

## Done when
```gherkin
Feature: End-to-end tests for the core flows

  Scenario: Core flows covered
    Given the Playwright suite
    When it runs against a production build at 375 pixels wide
    Then the complete-and-restore, add-task, Move-Out and view-toggle flows all pass

  Scenario: Pull requests are gated
    Given a pull request that breaks task completion
    When continuous integration runs
    Then the end-to-end job fails and the pull request cannot merge
```

## Security and privacy
Tests use made-up tasks only.

PRD reference: §8 Success criteria · Stitch prompt Prototype flows

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
