<!-- title: ST-015 Today at a glance | labels: story,mvp1 -->
> **User story** · E03 Dashboard · 3 pts · MVP1, planned sprint S2 · Priority Must

## Story
**As a** person opening the app for a quick check, **I want** to see what is due today, what slipped and what is coming up, **so that** I know what to do in under 5 seconds.

**Design for:** P2 Adult with ADHD, opens the app from the home screen while the kettle boils

## Design
- Stitch prompt Screen 1 — Dashboard · design.md §7 Task card, §11 Empty states · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Top to bottom: greeting heading + subtext, XP card (ST-021), "DUE TODAY" row with toggle pill (ST-012), active cards, "UPCOMING" label, upcoming cards, Completed section
- Greeting by time of day ("Good morning" / "Good afternoon" / "Good evening")
- Subtext counts overdue + due today warmly: "3 things to tackle today", "1 thing to tackle today"; never "overdue" in the headline
- Overdue tasks sit at the top of Due today with the overdue card style (`#FBF0DC`, 3px `#C87A3A` left accent, radius `0 14px 14px 0`) and a tag such as "2 days over"; never red
- Due today sorted overdue first (most overdue first), then by effort Quick → Heavy
- Upcoming = next 7 days, at 65% opacity, sorted by date, with a due label ("Tomorrow", "Thu")
- Each card shows name, room, effort tag and the task's streak count
- When nothing is due today but tasks exist: sparkles badge + "You're all caught up — enjoy your space"
- Layout is single column at 375px; at 768px+ max-width container, no horizontal scroll

### Depends on
- ST-005, ST-006, ST-007

### Out of scope
- Completing tasks (ST-010), first-run state (ST-016)

### Test data
- 1 overdue (2 days), 2 due today, 3 upcoming, 2 later

## Acceptance criteria
```gherkin
Feature: Today at a glance
  As a person opening the app for a quick check
  I want to see what is due today, what slipped and what is coming up
  So that I know what to do in under 5 seconds

  Scenario: Warm count
    Given 1 task is overdue and 2 are due today
    When I open Home
    Then I see "3 things to tackle today"

  Scenario: Overdue is amber, not red
    Given "Change bedsheets" is 2 days overdue
    When I open Home
    Then it is first in Due today with the amber-orange left accent and a "2 days over" tag

  Scenario: Upcoming week
    Given tasks due in 1, 4 and 10 days
    When I open Home
    Then the first two show under Upcoming and the 10-day task does not

  Scenario: All caught up
    Given I have tasks but none are due today or overdue
    When I open Home
    Then I see "You're all caught up — enjoy your space"
```

## Security and privacy
None.

PRD reference: §2, §4.4, §8 readable in under 5 seconds

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
