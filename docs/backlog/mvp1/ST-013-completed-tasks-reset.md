<!-- title: ST-013 Completed tasks reset on schedule | labels: story,mvp1 -->
> **User story** · E02 Track recurring tasks · 2 pts · MVP1, planned sprint S2 · Priority Must

## Story
**As a** person with daily and weekly chores, **I want** finished tasks to come back by themselves when they are due again, **so that** I never have to reset anything by hand.

**Design for:** P1 Demi, does the dishes every night and expects them back on the list each morning

## Design
- design.md §7 Completed task clearing schedule (no visible UI of its own)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Daily tasks clear from Completed at the global reset time (default 02:00, set in ST-026)
- Weekly, monthly and custom tasks clear when their next due date arrives (at that day's reset time)
- On clear: the task returns to active with the due date already calculated at completion
- Clearing runs when the app opens, when it returns to the foreground, and on a timer while open
- Clearing never deletes history: the completion stays in the log

### Depends on
- ST-005, ST-010

### Out of scope
- Background clearing while the app is closed (not needed; state is computed on open)

### Test data
- Fixed clock across 01:59 → 02:01

## Acceptance criteria
```gherkin
Feature: Completed tasks reset on schedule
  As a person with daily and weekly chores
  I want finished tasks to come back by themselves when they are due again
  So that I never have to reset anything by hand

  Scenario: Daily task comes back after reset time
    Given I completed "Wash up" (daily) on Monday evening
    And the reset time is 02:00
    When I open the app on Tuesday at 08:00
    Then "Wash up" is back under Due today and unchecked

  Scenario: Weekly task waits for its interval
    Given I completed "Take bins out" (weekly) on Monday
    When I open the app on Thursday
    Then it is not in Due today
    And it shows under Upcoming for next Monday

  Scenario: App left open overnight
    Given the app is open across the reset time
    When the reset time passes
    Then daily tasks return to active without reloading

  Scenario: History kept
    Given a task has been cleared back to active
    When I view my total tasks completed
    Then the earlier completion still counts
```

## Security and privacy
None.

PRD reference: §4.1 · design.md §7 Completed task clearing schedule

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
