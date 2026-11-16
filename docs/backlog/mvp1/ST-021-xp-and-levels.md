<!-- title: ST-021 XP and levels | labels: story,mvp1 -->
> **User story** · E05 Streaks and XP · 3 pts · MVP1, planned sprint S3 · Priority Must

## Story
**As a** person who finds chores dull, **I want** every completion to earn XP that fills a bar towards my next level, **so that** progress feels visible and keeps going up.

**Design for:** P2 Adult with ADHD, motivated by a bar that visibly fills

## Design
- Stitch prompt Screen 1 — XP card · design.md §7 XP bar, §8 Motion · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Effort sets base XP: Quick = 1×, Medium = 2×, Heavy = 3× (PRD 4.5)
- Proposed values (confirm before sprint): base 10 XP; streak multiplier = 1 + 0.1 × current streak, capped at 2×; XP rounded to whole numbers
- Proposed level curve (confirm before sprint): reaching level n+1 needs 100 × n XP from level n (L1→L2 = 100, L2→L3 = 200, …)
- Level and total XP never reset, including Move-Out (only undo can take back XP from the completion being undone)
- XP card on Home: "Level 4" left, "320 / 400 XP" right, 8px bar below; hidden on first run (ST-016)
- Fill animates 400ms ease-out; on level up the fill springs (500ms `cubic-bezier(0.34, 1.56, 0.64, 1)`), then resets for the new level, with a short "Level 5!" message
- XP calculation is a pure, unit-tested function

### Depends on
- ST-004, ST-006, ST-010

### Out of scope
- Rewards, badges, unlockables (post-MVP)

### Test data
- Level 1 at 90 XP, complete a Quick task with streak 0

## Acceptance criteria
```gherkin
Feature: XP and levels
  As a person who finds chores dull
  I want every completion to earn XP that fills a bar towards my next level
  So that progress feels visible and keeps going up

  Scenario: Effort scales XP
    Given base XP is 10 and the task has no streak
    When I complete a Quick, a Medium and a Heavy task
    Then I earn 10, 20 and 30 XP

  Scenario: Streak multiplier
    Given a Medium task with a streak of 5
    When I complete it on time
    Then I earn 30 XP

  Scenario: Level up
    Given I am Level 1 with 90 of 100 XP
    When I complete a Quick task
    Then I reach Level 2 and the bar springs before settling at 0 of 200

  Scenario: XP never resets
    Given I am Level 4
    When I use Move-Out Mode
    Then I am still Level 4 with the same XP
```

## Security and privacy
None.

PRD reference: §4.5 Global XP + Level, Visual progress

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
