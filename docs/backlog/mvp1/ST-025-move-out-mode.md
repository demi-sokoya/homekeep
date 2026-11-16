<!-- title: ST-025 Move-Out Mode | labels: story,mvp1 -->
> **User story** · E06 Move-Out Mode · 3 pts · MVP1, planned sprint S4 · Priority Must

## Story
**As a** person moving to a new home, **I want** to restart every task's countdown from my move-in date, **so that** I get a fresh start without losing my streaks, XP or history.

**Design for:** P1 Demi, packing for two weeks and not cleaning the old flat's oven, wants the list to make sense in the new place

## Design
- Stitch prompt Screen 4 — Move-Out Mode · design.md §11 Empty states (home, package) · Confirmation state to confirm in Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Lives in Settings: "Settings" heading + "Manage your home" subtext, then the Move-Out card
- Card: 40×40px home icon badge, "Moving out?" title, short description, move-in date input, "Start fresh from this date" primary button
- Two reassurance rows under the card: "Streaks carry over / Your history moves with you" and "XP is never reset / Level stays the same"
- Move-in date can be today or any date in the next 90 days; not in the past
- On confirm: for every task, next due = move-in date + its own interval (move-in date counts as the last completion); completed-this-cycle flags clear
- Streaks, XP, level and the completion log are unchanged; tasks overdue at the moment of moving already have a broken streak (ST-022) and stay at 0 until next completed
- Rooms and tasks are kept
- One confirmation before applying: "Ready for a fresh start?" (package icon)
- Confirmation state after applying: home badge, "Time for a fresh start. Everything reset.", and a summary such as "12 tasks now count down from 3 May"
- Until the move-in date, Home shows the fresh-start state instead of overdue tasks

### Depends on
- ST-005, ST-021, ST-022

### Out of scope
- Multiple homes / profiles (post-MVP; Move-Out evolves into profile switching)
- Picking which tasks move

### Test data
- Move-in 3 May; tasks: daily, every 2 weeks, monthly; one task overdue with streak 0, one with streak 5

## Acceptance criteria
```gherkin
Feature: Move-Out Mode
  As a person moving to a new home
  I want to restart every task's countdown from my move-in date
  So that I get a fresh start without losing my streaks, XP or history

  Scenario: Countdowns shift to move-in date
    Given "Clean the oven" repeats every 2 weeks
    When I start fresh from 3 May
    Then "Clean the oven" is next due on 17 May

  Scenario: Progress is kept
    Given I am Level 4 and "Water plants" has a streak of 5
    When I start fresh from 3 May
    Then I am still Level 4 and "Water plants" still has a streak of 5

  Scenario: Overdue streak already broken
    Given "Change bedsheets" is overdue with a broken streak
    When I start fresh from 3 May
    Then its streak stays 0 and only its due date changes

  Scenario: Date in the past
    Given today is 1 May
    When I pick 28 April
    Then I see "Pick today or a date after it"
    And the button stays disabled

  Scenario: Confirmation shown
    Given I confirm "Start fresh from this date"
    When the change is applied
    Then I see "Time for a fresh start. Everything reset." and how many tasks moved
```

## Security and privacy
None.

PRD reference: §4.3, §4.5 streaks through Move-Out, §8

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
