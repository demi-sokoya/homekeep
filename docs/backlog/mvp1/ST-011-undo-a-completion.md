<!-- title: ST-011 Undo a completion | labels: story,mvp1 -->
> **User story** · E02 Track recurring tasks · 1 pt · MVP1, planned sprint S2 · Priority Must

## Story
**As a** person who ticked the wrong task, **I want** to tap the completed task to put it back, **so that** mistakes never cost me anything.

**Design for:** P2 Adult with ADHD, taps quickly and sometimes taps the wrong row

## Design
- Stitch prompt Screen 1 — Completed section, "Tap to restore" · design.md §7 Task completion interaction · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Tapping anywhere on a completed card restores it to active; no confirmation, no timer, no toast
- Restoring puts back the previous due date, removes the completion from the log, takes back the XP it earned and restores the previous streak
- XP can go down on undo but never below the total before that completion; level can drop back if the undo crosses a level boundary
- Completed card hint text "Tap to restore" uses `--color-text-functional`, not muted
- Completed hover: opacity 1 to signal it is tappable

### Depends on
- ST-010

### Out of scope
- Permanent delete (ST-014)

### Test data
- Water plants completed today

## Acceptance criteria
```gherkin
Feature: Undo a completion
  As a person who ticked the wrong task
  I want to tap the completed task to put it back
  So that mistakes never cost me anything

  Scenario: Restore a completed task
    Given I completed "Water plants" by mistake
    When I tap it in the Completed section
    Then it returns to Due today unchecked
    And its due date, streak and XP are exactly as before

  Scenario: No confirmation needed
    Given a completed task
    When I tap it
    Then no dialog or timer appears
```

## Security and privacy
None.

PRD reference: §4.1 · design.md §7

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
