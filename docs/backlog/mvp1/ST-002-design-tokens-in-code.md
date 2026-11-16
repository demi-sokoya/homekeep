<!-- title: ST-002 Design tokens and type in code | labels: story,mvp1,enabler -->
> **Technical enabler** · E01 Foundations · 3 pts · MVP1, planned sprint S1 · Priority Must

## Why
Without one shared set of colours, type, spacing, radius and motion values, every screen hard-codes its own and the warm, never-punishing look drifts. Accessibility (ST-028) depends on the contrast rules baked into these tokens.

## What
All tokens from the design spec defined once as CSS custom properties, Nunito self-hosted, light and dark themes, and a global reduced-motion rule.

### Business rules
- Commit the design spec as `docs/design-language.md` (SOP 2.1); it is the source of truth for values
- Tokens live in `src/styles/colors_and_type.css`; names mirror the spec (`--color-bg-base`, `--text-task`, `--space-lg`, `--radius-lg`, ...)
- Nunito variable font (regular + italic) self-hosted in `fonts/`, loaded with `@font-face`; no Google Fonts request
- Only weights 400 / 500 / 600 / 700 are used; line height 1.6; `label-caps` uses 0.06em tracking
- Dark values under `@media (prefers-color-scheme: dark)` for bg-base, bg-surface, bg-subtle, text-primary, text-secondary, border. Accent, amber and semantic tokens need dark values agreed in Figma (ST-003) before they ship
- `--color-text-muted` is decorative only; functional small text uses `--color-text-functional` / `--color-text-secondary`
- Motion tokens: 300ms task completion, 400ms XP fill, 500ms spring level-up, 200ms card appear, 280ms sheet open
- Global `prefers-reduced-motion: reduce` rule from design.md §8
- No raw hex values outside the tokens file; overdue is never red

### Design
- design.md §2 Colour, §4 Typography, §5 Spacing, §6 Radius, §8 Motion
- Figma variables must match the tokens file (ST-003)

### Depends on
- ST-001

### Out of scope
- Components (ST-006)

### Test data
- None

## Done when
```gherkin
Feature: Design tokens and type in code

  Scenario: No raw colours in components
    Given a component file that uses a hex colour not taken from the tokens
    When continuous integration runs
    Then the build fails and names the file

  Scenario: Text colour pairs are readable
    Given each functional text and background pair in the tokens
    When the contrast check runs
    Then every pair reaches at least 4.5 to 1

  Scenario: Font works offline
    Given the app has loaded once
    When I go offline and reload
    Then text still renders in Nunito

  Scenario: Dark mode follows the system
    Given my phone is set to dark mode
    When I open the app
    Then the dark base, surface, subtle, text and border values are used

  Scenario: Reduced motion
    Given my device has reduce motion turned on
    When any animation would play
    Then it completes instantly and the end state is still shown
```

## Security and privacy
Fonts are bundled, so no third-party font request reveals usage.

PRD reference: §7 Design direction · design.md §2, §4–§6, §8 · SOP 2.1, 4.2

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
