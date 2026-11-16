<!-- title: ST-019 Room detail | labels: story,mvp1,design-missing -->
> **User story** · E04 Rooms and frequency · 2 pts · MVP1, planned sprint S3 · Priority Should

## Story
**As a** person cleaning one room at a time, **I want** to open a room and see all its tasks, **so that** I can work through that space in one go.

**Design for:** P1 Demi, does a "kitchen blitz" on Sunday

## Design
- Not designed yet: Room detail screen (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Opened by tapping a room card; back returns to the Rooms grid
- Header: room name, larger completion ring, room options (rename/delete via ST-017, not for General)
- Lists every task in the room, not just today's, grouped Due / Upcoming / Later, using the same task card and completion behaviour as Home
- + opened from here pre-fills this room in Add Task
- When the last due task is completed: "Nice one! Kitchen's done"
- Empty room: "No tasks in Kitchen yet" with an Add task button

### Depends on
- ST-010, ST-018, ST-003 (design)

### Out of scope
- None

### Test data
- Kitchen with 3 tasks (1 today, 1 upcoming, 1 later)

## Acceptance criteria
```gherkin
Feature: Room detail
  As a person cleaning one room at a time
  I want to open a room and see all its tasks
  So that I can work through that space in one go

  Scenario: See every task in a room
    Given Kitchen has tasks due today, in 3 days and in 20 days
    When I open Kitchen
    Then I see all three, grouped Due, Upcoming and Later

  Scenario: Finish the room
    Given Kitchen has one task left due
    When I complete it
    Then I see "Nice one! Kitchen's done"

  Scenario: Add from a room
    Given I am in Bathroom
    When I tap +
    Then the Add Task sheet opens with Bathroom selected
```

## Security and privacy
None.

PRD reference: §4.2

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
