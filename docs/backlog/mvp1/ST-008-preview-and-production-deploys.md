<!-- title: ST-008 Preview and production deploys | labels: story,mvp1,enabler -->
> **Technical enabler** · E01 Foundations · 1 pt · MVP1, planned sprint S1 · Priority Must

## Why
Testing on a real phone is the only way to check safe areas, touch targets and PWA install. A preview URL on every pull request makes that a habit from day one, and makes the final release a non-event (SOP 6.2).

## What
Vercel connected to the repo: a preview deploy for every pull request and a production deploy on every push to `main`.

### Business rules
- Preview URL is posted on each pull request
- `main` deploys to production automatically
- Build command and output match Vite defaults (`npm run build`, `dist/`)
- Single-page routing works on refresh (rewrite all routes to `index.html`)

### Depends on
- ST-001

### Out of scope
- Custom domain (optional)

### Test data
- None

## Done when
```gherkin
Feature: Preview and production deploys

  Scenario: Preview per pull request
    Given I open a pull request
    When Vercel finishes building
    Then a preview link is posted on the pull request

  Scenario: Production on merge
    Given a pull request is merged into main
    When the build finishes
    Then the production URL serves the new version

  Scenario: Deep links survive refresh
    Given I am on the Rooms tab of a deployed build
    When I refresh the page
    Then Rooms loads instead of a 404
```

## Security and privacy
No environment secrets are needed for MVP.

PRD reference: §6 Hosting · SOP 6.2

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
