<!-- title: ST-028 Accessible and calm | labels: story,mvp1,enabler -->
> **Technical enabler** · E08 Quality and release · 2 pts · MVP1, planned sprint S4 · Priority Must

## Why
Homekeep is built for people with ADHD; low contrast, tiny targets, surprise motion or a screen reader that cannot find the checkbox would undo that. These checks run across every screen before release rather than per component.

## What
An accessibility pass and automated checks across all MVP screens.

### Business rules
- WCAG 2.2 AA: functional text ≥ 4.5:1; `text-muted` only on decorative text
- Every interactive element ≥ 44×44px; no hover-only affordances
- Every screen usable with keyboard alone, in a logical order, with visible focus
- Screen reader names: checkboxes ("Mark Water plants done"), rings ("Kitchen, 2 of 3 done"), nav (`aria-current`), toggles (`aria-expanded`, `aria-checked`)
- Completion and level-up announced through a polite live region
- Reduced motion respected everywhere; state still clear without animation
- Overdue never relies on colour alone (tag text "2 days over")
- Text zoom to 200% without horizontal scroll at 375px
- axe checks run in CI on every screen (ST-029)
- Copy review: no "overdue" in headlines, no "failed", no "No X found"; voice matches design.md §1

### Depends on
- ST-015 to ST-026

### Out of scope
- Full WCAG audit by a third party

### Test data
- Seed data with every card state present

## Done when
```gherkin
Feature: Accessible and calm

  Scenario: Automated checks pass
    Given every MVP screen with seed data
    When axe runs in continuous integration
    Then there are no serious or critical issues

  Scenario: Screen reader completes a task
    Given VoiceOver on iOS
    When I move to "Water plants" and activate its checkbox
    Then I hear the task name, then that it is done and how much XP I earned

  Scenario: Keyboard only
    Given a keyboard and no mouse
    When I add a task, complete it and restore it
    Then every step is reachable and focus is always visible

  Scenario: Large text
    Given text zoom at 200 percent on a 375 pixel screen
    When I open Home, Rooms, Streaks and Settings
    Then nothing scrolls sideways and nothing overlaps
```

## Security and privacy
None.

PRD reference: §3, §7 · design.md §1, §8, §10 · SOP 6.1

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
