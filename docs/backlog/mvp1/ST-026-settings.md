<!-- title: ST-026 Settings: reset time and sound | labels: story,mvp1,design-missing -->
> **User story** · E07 Settings and install · 1 pt · MVP1, planned sprint S4 · Priority Must

## Story
**As a** person who often goes to bed late, **I want** to choose when my day resets and whether completions make a sound, **so that** Homekeep fits my routine instead of the clock.

**Design for:** P1 Demi, sometimes does dishes after midnight and wants them to count for "today"

## Design
- Settings list not designed yet; Stitch Screen 4 only covers Move-Out (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Settings tab order: Move-Out card (ST-025), then a "Preferences" section
- Daily reset time: one global setting, default 02:00, hour picker 00:00–06:00 (design rule: single global setting, not per task)
- Completion sound: on/off switch, default off (ST-024)
- Changes save instantly, no Save button; a short "Saved" confirmation
- About row: app version from `package.json`
- Switches are real `<button role="switch">` with `aria-checked`, 44px tall rows

### Depends on
- ST-004, ST-013, ST-003 (design)

### Out of scope
- Notifications, accounts, data export (post-MVP)

### Test data
- Reset time 02:00 → 04:00

## Acceptance criteria
```gherkin
Feature: Settings: reset time and sound
  As a person who often goes to bed late
  I want to choose when my day resets and whether completions make a sound
  So that Homekeep fits my routine

  Scenario: Change reset time
    Given my reset time is 02:00
    When I change it to 04:00
    Then a daily task completed at 03:00 counts for the previous day

  Scenario: Turn sound on
    Given sound is off
    When I turn on completion sound
    Then the next completion plays the sound

  Scenario: Saved without a button
    Given I change a setting
    When I reload the app
    Then the new value is still set
```

## Security and privacy
None.

PRD reference: §4.5 optional sound · design.md §7 Completed task clearing schedule

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
