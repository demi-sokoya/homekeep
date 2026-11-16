<!-- title: ST-014 Edit or delete a task | labels: story,mvp1,design-missing -->
> **User story** · E02 Track recurring tasks · 2 pts · MVP1, planned sprint S3 · Priority Should

## Story
**As a** person whose routines change, **I want** to change a task's name, room, interval or effort, or remove it, **so that** my list stays true to how I actually live.

**Design for:** P1 Demi, realises "water plants every 3 days" should be every 5 in winter

## Design
- Not designed yet: Edit task sheet and delete confirmation (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Opened by tapping the task name area of an active card (checkbox still completes); reuses the Add Task sheet with values filled and title "Edit task"
- Changing the interval recalculates the next due date from the last completion (or creation date if never completed)
- Changing effort affects future XP only
- Streak and history are kept when editing
- Delete is a destructive button (`--color-heavy-light` background) inside the sheet and asks once: "Remove Clean the oven? Its history stays in your stats."
- Deleting removes the task from lists but keeps its completions in the log so XP and totals do not drop

### Depends on
- ST-009, ST-003 (design)

### Out of scope
- Archive / pause a task (post-MVP)

### Test data
- Water plants · every 3 days → every 5 days

## Acceptance criteria
```gherkin
Feature: Edit or delete a task
  As a person whose routines change
  I want to change or remove a task
  So that my list stays true to how I actually live

  Scenario: Change the interval
    Given "Water plants" repeats every 3 days and was last done on 10 March
    When I edit it to every 5 days
    Then its next due date is 15 March
    And its streak is unchanged

  Scenario: Delete a task
    Given "Clean the oven" exists
    When I delete it and confirm
    Then it no longer appears anywhere
    And my total XP and tasks completed are unchanged

  Scenario: Tapping the checkbox still completes
    Given an active task card
    When I tap its checkbox
    Then the task is completed and the edit sheet does not open
```

## Security and privacy
None.

PRD reference: §4.1 (create, complete, reschedule)

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
