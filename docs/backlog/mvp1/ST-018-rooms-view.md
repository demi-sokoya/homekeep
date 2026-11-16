<!-- title: ST-018 Rooms view with completion rings | labels: story,mvp1 -->
> **User story** · E04 Rooms and frequency · 3 pts · MVP1, planned sprint S3 · Priority Must

## Story
**As a** person who thinks about chores room by room, **I want** a grid of my rooms showing how much of each is done, **so that** I can see at a glance which space needs attention.

**Design for:** P1 Demi, likes the feeling of "finishing" the kitchen

## Design
- Stitch prompt Screen 3 — Rooms · design.md §11 Room card tap affordance · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Heading "Rooms" + subtext "6 rooms · 12 tasks"
- Segmented toggle "Rooms" (active: accent bg, white text) / "Frequency" (ST-020)
- 2-column grid of room cards; each card: 44×44px SVG donut ring, fraction inside ("2/3"), room name, status text
- Ring progress = tasks done for their current interval ÷ tasks in room
- Ring colours: track `bg-subtle`; fill `accent-visual` in progress; `overdue` when the room has any overdue task; solid fill when all done
- Status text: "All done", "1 to go", "1 waiting" (overdue, warm wording), "No tasks yet"
- Whole card is the tap target (opens ST-019), with hover and pressed state (`opacity: 0.85` or slight scale)
- Ring has an accessible label ("Kitchen, 2 of 3 done")

### Depends on
- ST-005, ST-017

### Out of scope
- Room detail screen (ST-019)

### Test data
- Kitchen 2/3, Bathroom 0/2 with 1 overdue, Bedroom 1/1, Outdoor 0/0

## Acceptance criteria
```gherkin
Feature: Rooms view with completion rings
  As a person who thinks about chores room by room
  I want a grid of my rooms showing how much of each is done
  So that I can see at a glance which space needs attention

  Scenario: Progress ring
    Given Kitchen has 3 tasks and 2 are done for this interval
    When I open Rooms
    Then Kitchen's ring is two-thirds filled and shows "2/3"

  Scenario: Room with an overdue task
    Given Bathroom has an overdue task
    When I open Rooms
    Then Bathroom's ring uses the amber-orange overdue colour

  Scenario: Whole card is tappable
    Given the Rooms grid
    When I tap anywhere on the Kitchen card
    Then the Kitchen room detail opens
```

## Security and privacy
None.

PRD reference: §4.2, §4.5 room completion rings

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
