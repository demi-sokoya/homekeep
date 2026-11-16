<!-- title: ST-007 App shell and bottom navigation | labels: story,mvp1 -->
> **User story** · E01 Foundations · 2 pts · MVP1, planned sprint S1 · Priority Must

## Story
**As a** person using Homekeep on my phone, **I want** a bottom bar that takes me to Home, Rooms, Streaks and Settings and lets me add a task from anywhere, **so that** I never have to dig through menus.

**Design for:** P1 Demi, managing a home solo, opens the app for a 5-second check-in from the home screen

## Design
- Stitch prompt: Navigation · design.md §7 Bottom nav items · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- 5 tabs in order: Home · Rooms · + · Streaks · Settings
- + is a 44×44px accent-green rounded square (radius 14px), raised 16px above the bar; it opens the Add Task sheet (ST-009), it is not a page
- Nav height 64px + `env(safe-area-inset-bottom)`
- Rest: icon and label `#5A6E3A`, stroke 1.5 · Hover: `#2D3D1E` · Active: `#4E7A25`, stroke 2, weight 600
- Active tab is announced to screen readers (`aria-current="page"`)
- Page content has 16px side padding and is never hidden behind the nav
- Each tab has its own URL so the back button and reloads work

### Depends on
- ST-006

### Out of scope
- Desktop side navigation (mobile-first; bottom bar at all widths for MVP)

### Test data
- None

## Acceptance criteria
```gherkin
Feature: App shell and bottom navigation
  As a person using Homekeep on my phone
  I want a bottom bar that takes me to each area and lets me add a task from anywhere
  So that I never have to dig through menus

  Scenario: Switch tabs
    Given I am on Home
    When I tap Rooms
    Then the Rooms screen shows and Rooms is marked active

  Scenario: Add from anywhere
    Given I am on any tab
    When I tap the + button
    Then the Add Task sheet opens over the current screen

  Scenario: Safe area respected
    Given a phone with a home indicator bar
    When the app is installed and opened from the home screen
    Then the nav sits above the home indicator and nothing is cut off

  Scenario: Reload keeps my place
    Given I am on Streaks
    When I reload the page
    Then I am still on Streaks
```

## Security and privacy
None.

PRD reference: §2 Glanceable · Stitch prompt Navigation

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
