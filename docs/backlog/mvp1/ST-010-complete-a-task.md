<!-- title: ST-010 Complete a task | labels: story,mvp1 -->
> **User story** · E02 Track recurring tasks · 3 pts · MVP1, planned sprint S2 · Priority Must

## Story
**As a** person who just finished a chore, **I want** to tick it off straight from the dashboard and see it feel good, **so that** I get a small reward and the next due date sorts itself out.

**Design for:** P2 Adult with ADHD, needs instant, satisfying feedback to keep the habit going

## Design
- Stitch prompt Screen 1 — Dashboard, task card states · design.md §7 Task card, Task completion interaction · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Checkbox is 20×20px visually, inside a 44×44px button with an accessible name ("Mark Clean the oven done")
- On tap: checkmark fills accent green, card plays scale + fade (300ms ease-out), then moves to the Completed section with a strikethrough label
- Next due date = completion date + interval (ST-005); completion is logged (ST-004)
- XP is awarded and the XP bar animates (ST-021); the task's streak updates (ST-022)
- Friendly confirmation copy, e.g. "Nice one! Kitchen's done" when it was the last task due in that room, otherwise "Nice one!"
- Task card states from design.md: rest, hover, pressed (slight scale down), overdue (3px left accent `#C87A3A`, never red)
- Completing works the same for overdue, today and upcoming tasks
- Reduced motion: no scale/fade, but colour and checkmark still change

### Depends on
- ST-005, ST-006, ST-015

### Out of scope
- XP maths (ST-021), streak rules (ST-022), sound (ST-024)

### Test data
- Take bins out · General · every 1 week · Quick · due today

## Acceptance criteria
```gherkin
Feature: Complete a task
  As a person who just finished a chore
  I want to tick it off straight from the dashboard
  So that I get a small reward and the next due date sorts itself out

  Scenario: Complete a task due today
    Given "Take bins out" is due today and repeats every week
    When I tap its checkbox
    Then the checkmark fills green and the card moves to Completed with a strikethrough
    And its next due date is 7 days from today
    And my XP goes up

  Scenario: Complete an overdue task
    Given "Change bedsheets" was due 3 days ago and repeats every 2 weeks
    When I complete it today
    Then its next due date is 14 days from today, not from the old due date

  Scenario: Big enough to tap
    Given a task card
    When I measure the checkbox's tap area
    Then it is at least 44 by 44 pixels

  Scenario: Works with reduced motion
    Given reduce motion is on
    When I complete a task
    Then no animation plays but the checkmark and strikethrough still show
```

## Security and privacy
None.

PRD reference: §4.1, §4.4 quick-complete, §4.5 completion feedback

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
