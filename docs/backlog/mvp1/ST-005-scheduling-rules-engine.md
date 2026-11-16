<!-- title: ST-005 Scheduling rules engine | labels: story,mvp1,enabler -->
> **Technical enabler** · E01 Foundations · 3 pts · MVP1, planned sprint S1 · Priority Must

## Why
Due dates, overdue, upcoming, the daily reset and Move-Out all depend on the same date maths. If each screen computes it separately the dashboard, rooms and streaks will disagree. Pure, tested functions keep them consistent.

## What
Pure functions in `src/utils/schedule.ts` with unit tests, used by every feature that reasons about dates.

### Business rules
- `nextDue(completedOn, interval)` = completion date + interval; reschedule from the completion date, not the old due date (PRD 4.1)
- Month maths clamps to month end (31 Jan + 1 month = 28/29 Feb)
- The "day" rolls over at the global reset time (default 02:00), not midnight; a task completed at 01:30 counts for the previous day
- `status(task, now)`: `overdue` if nextDue is before today, `today` if nextDue is today, `upcoming` if within the next 7 days, `later` otherwise
- `daysOverdue(task, now)` returns a whole number for the overdue tag
- `isOnTime(completedOn, dueOn)` = completed on or before the due day
- `frequencyGroup(interval)`: 1 day = Daily, 1 week = Weekly, 1 month = Monthly, anything else = Custom
- No `Date.now()` inside these functions; `now` is passed in so tests are deterministic

### Design
- None (no UI)

### Depends on
- ST-004

### Out of scope
- Time zones beyond the device's local time

### Test data
- Fixed clock: 2026-03-14 09:00 local; edge cases on 31 Jan, 29 Feb, and 01:30 before reset time

## Done when
```gherkin
Feature: Scheduling rules engine

  Scenario: Reschedule from completion date
    Given a task due 10 March that repeats every 3 days
    When I complete it on 12 March
    Then its next due date is 15 March

  Scenario: Month end is clamped
    Given a monthly task completed on 31 January 2027
    When the next due date is calculated
    Then it is 28 February 2027

  Scenario: Day rolls over at reset time
    Given the reset time is 02:00
    When I complete a daily task at 01:30 on 15 March
    Then it counts as completed on 14 March

  Scenario: Status buckets
    Given today is 14 March
    When tasks are due on 12, 14, 18 and 30 March
    Then they are overdue, today, upcoming and later

  Scenario: Frequency groups
    Given intervals of 1 day, 1 week, 1 month and 3 days
    When they are grouped
    Then they are Daily, Weekly, Monthly and Custom
```

## Security and privacy
None.

PRD reference: §4.1, §4.4 · design.md §7 Completed task clearing schedule

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
