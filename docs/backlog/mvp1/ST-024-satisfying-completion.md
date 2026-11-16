<!-- title: ST-024 Satisfying completion with opt-in sound | labels: story,mvp1,design-missing -->
> **User story** · E05 Streaks and XP · 2 pts · MVP1, planned sprint S4 · Priority Should

## Story
**As a** person who needs a little reward to keep going, **I want** completing a task to look and, if I choose, sound satisfying, **so that** ticking things off feels good.

**Design for:** P2 Adult with ADHD, small sensory rewards help the habit stick

## Design
- design.md §8 Motion · First-run sound prompt not designed yet (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- Completion animation: checkmark fill + card scale/fade 300ms ease-out; XP bar fill; card appear 200ms (built in ST-010/ST-021; this story polishes and tests the full sequence together)
- Sound is off by default (PRD open question resolved: opt-in)
- After the first ever completion, a friendly one-time prompt: "Want a little sound when you finish something?" with "Turn on" and "Not now"; never shown again after either choice
- Sound is short, soft and satisfying (under 500ms), not a fanfare; bundled locally so it works offline
- Sound respects the device's silent mode where the browser allows; never plays when reduce motion is on unless sound was explicitly turned on
- Sound can be changed any time in Settings (ST-026)

### Depends on
- ST-010, ST-021, ST-003 (design)

### Out of scope
- Haptics (post-MVP)

### Test data
- Fresh install, complete first task

## Acceptance criteria
```gherkin
Feature: Satisfying completion with opt-in sound
  As a person who needs a little reward to keep going
  I want completing a task to look and, if I choose, sound satisfying
  So that ticking things off feels good

  Scenario: Sound off by default
    Given a fresh install
    When I complete my first task
    Then no sound plays
    And I am asked once if I want completion sounds

  Scenario: Turn sound on
    Given I see the sound prompt
    When I tap "Turn on"
    Then the next completion plays the soft sound

  Scenario: Prompt only once
    Given I tapped "Not now"
    When I complete more tasks
    Then the prompt does not appear again
```

## Security and privacy
None.

PRD reference: §4.5 Completion feedback, §8 · design.md §8

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
