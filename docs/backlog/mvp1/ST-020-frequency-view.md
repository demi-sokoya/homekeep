<!-- title: ST-020 Frequency view | labels: story,mvp1 -->
> **User story** · E04 Rooms and frequency · 2 pts · MVP1, planned sprint S3 · Priority Must

## Story
**As a** person who plans by rhythm rather than by room, **I want** to switch to a view grouped by Daily, Weekly, Monthly and Custom, **so that** I can see my routines by how often they happen.

**Design for:** P1 Demi, reviews the monthly list at the start of each month

## Design
- Stitch prompt Screen 3 — Frequency view · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Toggle on the Rooms tab switches between Rooms grid and Frequency list; same header
- Groups in order: Daily, Weekly, Monthly, Custom (from ST-005 `frequencyGroup`); empty groups are hidden
- Each group: label-caps section label, then task rows inside one card (name, room, interval e.g. "every 3 days", next due)
- Group labels are renameable (PRD 4.2), saved in Settings; tap-and-hold or an edit icon on the label; default names restore if cleared
- The last chosen view is remembered
- Toggle uses `role="tablist"` semantics with keyboard support

### Depends on
- ST-005, ST-018

### Out of scope
- Dashboard-level view toggle (Home stays date-based)

### Test data
- 2 daily, 3 weekly, 1 monthly, 2 custom tasks

## Acceptance criteria
```gherkin
Feature: Frequency view
  As a person who plans by rhythm rather than by room
  I want to switch to a view grouped by how often tasks happen
  So that I can see my routines by rhythm

  Scenario: Switch to Frequency
    Given I am on the Rooms grid
    When I tap "Frequency"
    Then tasks are listed under Daily, Weekly, Monthly and Custom

  Scenario: Switch back
    Given I am on the Frequency view
    When I tap "Rooms"
    Then the room grid returns

  Scenario: Rename a group
    Given the Monthly group
    When I rename it to "Deep clean"
    Then it shows as "Deep clean" after a reload

  Scenario: View remembered
    Given I last used the Frequency view
    When I come back to the Rooms tab
    Then the Frequency view is shown
```

## Security and privacy
None.

PRD reference: §4.2

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
