<!-- title: ST-003 Figma design system and missing screens | labels: story,mvp1,enabler,design -->
> **Technical enabler** · E01 Foundations · 3 pts · MVP1, planned sprint S1 · Priority Must

## Why
The Stitch prompt covers five screens. Several MVP stories have no agreed screen yet (marked `design-missing`), and the SOP requires a Figma design system and handoff before build. Without it, those screens get designed in code.

## What
A Figma file with variables, text styles and a component library that match the tokens, plus hi-fi mockups at 375px for every MVP screen, including the ones the Stitch prompt does not cover.

### Business rules
- Variables with slash names matching CSS tokens (`color/bg/base` ↔ `--color-bg-base`)
- Text styles: heading, subheading, task, body, hint, label-caps, button
- Components with all states: Task card (rest, hover, pressed, completed, completed-hover, overdue, overdue-hover), Button (primary, secondary, destructive, disabled, focus), Effort button, Tag, Toggle pill, Streak pill, XP bar, Bottom sheet, Room card, Nav item, Empty state badge, Input
- Mobile-first: 375px frames for all screens; 768px and 1280px frames for Dashboard and Rooms
- Missing screens to design: Edit task (ST-014), Room manager (ST-017), Room detail (ST-019), Settings list with reset time and sound (ST-026), first-run sound prompt (ST-024), Move-Out confirmation state (ST-025), dark-mode values for accent / amber / semantic tokens
- Handoff checklist from SOP 3.2: semantic layer names, no detached instances, token spacing only, focus/disabled/loading states drawn
- When a screen is agreed, add its link to the story's Design section and remove `design-missing`

### Design
- Stitch prompt screens 1–5 as the starting direction

### Depends on
- ST-002 (token values)

### Out of scope
- Tablet/desktop frames for every screen (only Dashboard and Rooms)

### Test data
- Made-up tasks: Clean the oven, Water plants, Change bedsheets, Take bins out

## Done when
```gherkin
Feature: Figma design system and missing screens

  Scenario: Figma and code tokens match
    Given the tokens file in the repository
    When it is compared with the Figma variables
    Then every name and value matches

  Scenario: Every MVP story has a screen
    Given the MVP1 stories with a user-facing screen
    When I check each story's Design section
    Then each links to an agreed Figma frame and none is labelled design-missing

  Scenario: All interactive states drawn
    Given any interactive component in the library
    When I inspect its variants
    Then rest, hover, pressed, focus and disabled states exist where they apply
```

## Security and privacy
None.

PRD reference: §7 Design direction · SOP 2.2, 3.1, 3.2

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
