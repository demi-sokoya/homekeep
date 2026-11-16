<!-- title: ST-006 Shared UI components | labels: story,mvp1,enabler -->
> **Technical enabler** · E01 Foundations · 3 pts · MVP1, planned sprint S1 · Priority Must

## Why
Buttons, tags, pills, inputs and sheets appear on every screen. Building them once, in isolation, with every state from the design spec keeps screens consistent and makes touch-target and contrast rules automatic.

## What
A small component library in `src/components/`, each with a props interface and JSDoc (SOP 4.3, 5.1).

### Business rules
- Components: `Button` (primary, secondary, destructive), `Input`, `EffortTag` (quick, medium, heavy, overdue), `EffortPicker`, `TogglePill`, `SegmentedToggle` (Rooms / Frequency), `StreakPill` (small 24px, large 32px), `XpBar`, `BottomSheet`, `EmptyState`, `Icon` (Lucide wrapper)
- All buttons: Nunito 14px weight 700, height 44px, radius 10px
- Tags: 6px solid dot + label in a pill; no emoji
- `BottomSheet`: 20px top radius, 32×4px handle, `rgba(0,0,0,0.38)` overlay, opens at 280ms `cubic-bezier(0.32, 0.72, 0, 1)`, closes on overlay tap, Escape and swipe down, traps focus while open
- `XpBar`: 8px pill track, fill animates 400ms ease-out, spring overshoot on level up
- Icons: Lucide only, stroke 1.5, 20px nav / 18px inline / 24px empty state, colour inherits
- Every interactive element is at least 44×44px and has a visible focus ring
- No hover-only affordances
- Each component has a props interface and a JSDoc block with an `@example`

### Design
- design.md §3 Effort tags, §7 Components · Design_spec.md component tokens
- Figma component library (ST-003)

### Depends on
- ST-002

### Out of scope
- Task card and room card (built in their own stories)
- Storybook (optional, not required)

### Test data
- None

## Done when
```gherkin
Feature: Shared UI components

  Scenario: Touch targets
    Given any interactive component
    When its rendered size is measured
    Then it is at least 44 by 44 pixels

  Scenario: Effort tags have no emoji
    Given the Quick, Medium, Heavy and Overdue tags
    When they render
    Then each shows a 6px dot and a text label in the spec colours

  Scenario: Bottom sheet can be dismissed
    Given the bottom sheet is open
    When I tap the overlay, press Escape or swipe it down
    Then it closes and focus returns to the control that opened it

  Scenario: Keyboard focus is visible
    Given I navigate with a keyboard
    When focus lands on any component
    Then a visible focus ring is shown
```

## Security and privacy
None.

PRD reference: §6, §7 · design.md §3, §7, §9 · SOP 4.3, 5.1

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
