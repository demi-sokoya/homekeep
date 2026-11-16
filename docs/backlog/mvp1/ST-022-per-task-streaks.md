<!-- title: ST-022 Per-task streaks | labels: story,mvp1 -->
> **User story** · E05 Streaks and XP · 3 pts · MVP1, planned sprint S3 · Priority Must

## Story
**As a** person who sometimes lets one chore slide, **I want** each task to keep its own streak, **so that** missing one thing never wipes out progress on everything else.

**Design for:** P2 Adult with ADHD, a single global streak breaking would make them give up

## Design
- design.md §7 Streak pill · Stitch prompt Screen 5 · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Each task has its own streak = consecutive on-time completions (ST-005 `isOnTime`)
- On-time completion: streak + 1. Late completion (task was overdue): streak restarts at 1
- A streak is "broken" (shown as 0) as soon as the task becomes overdue; no grace period for MVP (PRD open question; revisit after use)
- There is no global streak and no daily gate (PRD 4.5)
- Undo restores the previous streak (ST-011)
- Streaks carry over through Move-Out; tasks overdue at move-out are already broken (ST-025)
- Task cards show the streak with a small streak pill (Lucide flame, 13px) when streak ≥ 1

### Depends on
- ST-005, ST-010

### Out of scope
- Streak freeze / grace days (post-MVP)

### Test data
- Water plants with streak 4, due today; Change bedsheets with streak 6, overdue 1 day

## Acceptance criteria
```gherkin
Feature: Per-task streaks
  As a person who sometimes lets one chore slide
  I want each task to keep its own streak
  So that missing one thing never wipes out progress on everything else

  Scenario: On-time completion grows the streak
    Given "Water plants" has a streak of 4 and is due today
    When I complete it today
    Then its streak is 5

  Scenario: Overdue breaks only that task
    Given "Change bedsheets" (streak 6) becomes overdue
    And "Water plants" has a streak of 5
    When I look at my streaks
    Then "Change bedsheets" shows 0 and "Water plants" still shows 5

  Scenario: Late completion starts again
    Given "Change bedsheets" is overdue with a broken streak
    When I complete it
    Then its streak is 1
```

## Security and privacy
None.

PRD reference: §4.5 Per-task streaks, §9 open question on grace period

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
