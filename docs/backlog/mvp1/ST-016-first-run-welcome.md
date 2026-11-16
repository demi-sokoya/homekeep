<!-- title: ST-016 First-run welcome | labels: story,mvp1 -->
> **User story** · E03 Dashboard · 2 pts · MVP1, planned sprint S2 · Priority Must

## Story
**As a** person opening Homekeep for the first time, **I want** a clear, friendly starting point, **so that** I add my first task instead of staring at a blank screen.

**Design for:** P2 Adult with ADHD, will drop off if the first screen gives no next step

## Design
- design.md §11 First-run dashboard · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Shown when there are zero tasks
- Empty-state hero: plus-circle badge, "Nothing here yet — add your first task!", a one-line prompt, and a prominent "Add your first task" primary button that opens the Add Task sheet
- XP card and streak elements are hidden until at least one task exists (design hard constraint)
- Streaks tab shows its own empty state: flame badge, "Add a daily task to start your streak"
- Default rooms already exist (ST-017), so the Room field is ready on first add

### Depends on
- ST-009, ST-015

### Out of scope
- Sample/demo tasks
- Sound prompt (ST-024)

### Test data
- Empty storage

## Acceptance criteria
```gherkin
Feature: First-run welcome
  As a person opening Homekeep for the first time
  I want a clear, friendly starting point
  So that I add my first task instead of staring at a blank screen

  Scenario: Empty home
    Given I have no tasks
    When I open Home
    Then I see "Nothing here yet — add your first task!" and an "Add your first task" button
    And no XP bar or streak is shown

  Scenario: First task unlocks the dashboard
    Given I have no tasks
    When I add my first task
    Then the empty state is replaced by the task list and the XP card appears
```

## Security and privacy
None.

PRD reference: §4.4 · design.md §11

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
