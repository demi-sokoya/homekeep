<!-- title: ST-030 MVP1 release | labels: story,mvp1,enabler -->
> **Technical enabler** · E08 Quality and release · 2 pts · MVP1, planned sprint S4 · Priority Must

## Why
Shipping should be a non-event: one checklist, one merge, one tag. The checklist is what proves every PRD success criterion is met.

## What
Run the SOP pre-deployment checklist, merge `dev` to `main`, tag `v1.0.0` and update the changelog.

### Business rules
- PRD §8 success criteria all ticked, each linked to the story that proves it
- Code: `npx tsc --noEmit` clean, no `console.log` in production code, every TODO resolved or turned into an issue
- Responsive: checked on a real phone and at 375, 768 and 1280px; no horizontal scroll; 44px targets
- Lighthouse mobile: Performance > 80, Accessibility ≥ 95, PWA installable
- PR from `dev` to `main` with summary, linked issues and the tested Vercel preview link
- After merge: verify production on phone and a second browser, `git tag v1.0.0 && git push --tags`, update `CHANGELOG.md`, add screenshots to `README.md`

### Depends on
- All other MVP1 stories with Priority Must

### Out of scope
- App store listing (post-MVP)

### Test data
- Fresh install on a real iPhone and Android phone

## Done when
```gherkin
Feature: MVP1 release

  Scenario: Success criteria met
    Given the PRD success criteria
    When I check each one on the production build
    Then I can create, complete and reschedule a task
    And Move-Out resets every interval
    And Home is readable in under 5 seconds
    And completion feels satisfying with animation and XP
    And Rooms and Frequency views both work
    And data persists after closing the browser

  Scenario: Quality gates
    Given the release candidate
    When Lighthouse runs on mobile
    Then Performance is above 80 and Accessibility is at least 95

  Scenario: Tagged and documented
    Given the release is merged to main
    When I look at the repository
    Then tag v1.0.0 exists and CHANGELOG.md has a 1.0.0 entry
```

## Security and privacy
No secrets or personal data in the repo or the deployed bundle.

PRD reference: §8 · SOP 6.1, 6.2

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
