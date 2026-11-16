<!-- title: ST-009 Add a task | labels: story,mvp1 -->
> **User story** · E02 Track recurring tasks · 3 pts · MVP1, planned sprint S2 · Priority Must

## Story
**As a** person keeping a home running, **I want** to add a chore with its room, how often it repeats and how much effort it takes, **so that** Homekeep can remind me when it is due again.

**Design for:** P1 Demi, wants to capture "Clean the oven, every 2 weeks, heavy" in a few seconds before forgetting

## Design
- Stitch prompt Screen 2 — Add Task (bottom sheet) · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Opens from the + nav button as a bottom sheet over the current screen
- Fields in order: Task name (placeholder "e.g. Clean the oven"), Room (pre-filled Kitchen or the room I came from), Repeats every [number] [day / week / month], Effort (Quick · Medium · Heavy)
- Name is required (1–60 characters, trimmed); repeat number is a whole number 1–365
- Effort defaults to none selected; one must be chosen. Inactive dots at 50% opacity, selected at full
- New task's first due date is today, so it shows straight away in "Due today"
- "Add task" is the single primary button (weight 700); it stays disabled until the form is valid
- On save: sheet closes, the new card animates in (200ms), and a short message says e.g. "Added to Kitchen"
- Keyboard: Enter on the last field submits; the number field opens a numeric keypad on phones

### Depends on
- ST-004, ST-005, ST-006, ST-007

### Out of scope
- Editing an existing task (ST-014)
- Creating a new room from inside this sheet (ST-017)
- Reminders/notifications (post-MVP)

### Test data
- Clean the oven · Kitchen · every 2 weeks · Heavy
- Water plants · Living Room · every 3 days · Quick

## Acceptance criteria
```gherkin
Feature: Add a task
  As a person keeping a home running
  I want to add a chore with its room, how often it repeats and how much effort it takes
  So that Homekeep can remind me when it is due again

  Scenario: Add a recurring task
    Given the Add Task sheet is open
    When I enter "Clean the oven", choose Kitchen, every 2 weeks, Heavy
    And I tap Add task
    Then the sheet closes
    And "Clean the oven" appears under Due today with a Heavy tag

  Scenario: Name is required
    Given the Add Task sheet is open
    When I leave the name empty
    Then Add task stays disabled

  Scenario: Repeat number must be sensible
    Given the Add Task sheet is open
    When I enter 0 in Repeats every
    Then I see "Pick a number from 1 to 365"
    And Add task stays disabled

  Scenario: Task is saved
    Given I have added "Water plants"
    When I reload the app
    Then "Water plants" is still there
```

## Security and privacy
Task names are stored only on this device.

PRD reference: §4.1, §4.5 effort rating

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
