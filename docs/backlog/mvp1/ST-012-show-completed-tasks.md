<!-- title: ST-012 Show and hide completed tasks | labels: story,mvp1 -->
> **User story** · E02 Track recurring tasks · 1 pt · MVP1, planned sprint S2 · Priority Must

## Story
**As a** person scanning what is left today, **I want** completed tasks tucked away until I ask for them, **so that** the list only shows what still needs doing.

**Design for:** P2 Adult with ADHD, a long list is overwhelming; a short one feels doable

## Design
- Stitch prompt Screen 1 — Toggle row and Completed section · design.md §7 Toggle pill · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Completed section is hidden by default
- Toggle pill sits on the right of the "DUE TODAY" label row: "Show completed (n)" / "Hide completed (n)"
- Pill is hidden when n = 0
- When shown: a "Completed" divider label with an extending rule, then the completed cards
- The choice is remembered for the session, reset to hidden on next app open
- Pill has `aria-expanded` and controls the section

### Depends on
- ST-010

### Out of scope
- None

### Test data
- 2 completed tasks today

## Acceptance criteria
```gherkin
Feature: Show and hide completed tasks
  As a person scanning what is left today
  I want completed tasks tucked away until I ask for them
  So that the list only shows what still needs doing

  Scenario: Hidden by default
    Given I have completed 2 tasks today
    When I open Home
    Then the Completed section is hidden
    And I see "Show completed (2)"

  Scenario: Reveal completed
    Given the Completed section is hidden
    When I tap "Show completed (2)"
    Then the Completed section shows both tasks with strikethrough
    And the pill reads "Hide completed (2)"

  Scenario: Nothing completed
    Given I have not completed anything today
    When I open Home
    Then no completed pill is shown
```

## Security and privacy
None.

PRD reference: §4.4 · design.md §7 Toggle pill

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
