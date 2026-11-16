<!-- title: ST-017 Rooms I can shape | labels: story,mvp1,design-missing -->
> **User story** · E04 Rooms and frequency · 3 pts · MVP1, planned sprint S3 · Priority Must

## Story
**As a** person whose home is not a standard floor plan, **I want** to add, rename and remove rooms, **so that** tasks are grouped the way my space actually works.

**Design for:** P1 Demi, has a balcony and a home office that are not in the default list

## Design
- Stitch prompt Screen 3 — "Add room" button · Room manager not designed yet (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Default rooms on first run: Kitchen, Bathroom, Bedroom, Living Room, General, Outdoor
- Rooms are their own collection, independent of tasks (PRD 4.2)
- Add room: name (1–30 characters, unique ignoring case) and an optional icon chosen from a small Lucide set; no emoji (design rule overrides PRD's "emoji/icon")
- Rename any room except General
- Delete any room except General; its tasks move to General; one confirmation: "Remove Balcony? Its 3 tasks move to General."
- "Add room" secondary button sits below the room grid

### Depends on
- ST-004, ST-006, ST-003 (design)

### Out of scope
- Reordering rooms (post-MVP)

### Test data
- Add "Balcony", rename "Bedroom" to "Main bedroom", delete "Outdoor" with 2 tasks

## Acceptance criteria
```gherkin
Feature: Rooms I can shape
  As a person whose home is not a standard floor plan
  I want to add, rename and remove rooms
  So that tasks are grouped the way my space actually works

  Scenario: Default rooms
    Given I open the app for the first time
    When I open Rooms
    Then I see Kitchen, Bathroom, Bedroom, Living Room, General and Outdoor

  Scenario: Add a room
    Given I am on Rooms
    When I add a room called "Balcony"
    Then Balcony appears in the grid and in the Add Task room list

  Scenario: Duplicate name blocked
    Given a room called "Kitchen" exists
    When I try to add "kitchen"
    Then I see "You already have a room with that name"

  Scenario: Delete moves tasks to General
    Given "Outdoor" has 2 tasks
    When I delete Outdoor and confirm
    Then both tasks are in General

  Scenario: General is protected
    Given the General room
    When I open its options
    Then rename and delete are not offered
```

## Security and privacy
None.

PRD reference: §4.2

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
