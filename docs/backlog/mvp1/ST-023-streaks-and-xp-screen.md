<!-- title: ST-023 Streaks and XP screen | labels: story,mvp1 -->
> **User story** · E05 Streaks and XP · 2 pts · MVP1, planned sprint S3 · Priority Must

## Story
**As a** person who likes seeing how far I have come, **I want** one screen with my level, totals and every task's streak, **so that** I can feel proud of the habits I am building.

**Design for:** P1 Demi, checks progress at the end of the week

## Design
- Stitch prompt Screen 5 — Streaks + XP · design.md §11 Empty states · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- "Streaks + XP" heading + subtext
- XP card: "Level 4" with the large streak pill (best current streak, flame 16px) on the same row; XP fraction subtext; progress bar
- Two stat cards: tasks completed (all time) and total XP earned
- "PER-TASK STREAKS" label, then one card listing each task: name, interval ("every 3 days"), streak pill
- Broken streaks stay in the list: `overdue-light` background, `overdue` text, value 0, "Streak broken" label; never hidden
- Sorted by streak, highest first; broken last
- Empty state when no tasks: flame badge, "Add a daily task to start your streak"

### Depends on
- ST-021, ST-022

### Out of scope
- Charts/history graphs (post-MVP)

### Test data
- 5 tasks: streaks 7, 4, 2, 1 and one broken

## Acceptance criteria
```gherkin
Feature: Streaks and XP screen
  As a person who likes seeing how far I have come
  I want one screen with my level, totals and every task's streak
  So that I can feel proud of the habits I am building

  Scenario: See totals
    Given I have completed 42 tasks and earned 1,180 XP
    When I open Streaks
    Then I see 42 tasks completed and 1,180 XP

  Scenario: Broken streak is shown, not hidden
    Given "Change bedsheets" has a broken streak
    When I open Streaks
    Then it is listed with 0 and "Streak broken" in amber-orange

  Scenario: Empty state
    Given I have no tasks
    When I open Streaks
    Then I see "Add a daily task to start your streak"
```

## Security and privacy
None.

PRD reference: §4.5 Visual progress

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
