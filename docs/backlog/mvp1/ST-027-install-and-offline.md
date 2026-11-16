<!-- title: ST-027 Install on my home screen and use offline | labels: story,mvp1 -->
> **User story** · E07 Settings and install · 2 pts · MVP1, planned sprint S4 · Priority Must

## Story
**As a** person who wants Homekeep one tap away, **I want** to install it on my phone's home screen and use it without signal, **so that** it feels like a real app wherever I am in the house.

**Design for:** P1 Demi, uses it in a basement laundry room with no signal

## Design
- App icon and splash colours from design tokens (`#4E7A25` accent, `#F2F5EE` background) · Figma (ST-003)

_When this story enters a sprint, add a screenshot of the agreed screen as a comment, so the review can compare against it._

### Business rules
- `vite-plugin-pwa` with a web manifest: name "Homekeep", short name "Homekeep", `display: standalone`, theme and background colours from tokens, portrait
- Icons: 192px, 512px, maskable 512px, and Apple touch icon 180px; no emoji
- Service worker precaches the app shell, fonts and the completion sound; app works fully offline after first load
- New versions: a gentle "A fresh version is ready — refresh" message, never a forced reload mid-task
- iOS: `apple-mobile-web-app-capable`, status bar style, and safe areas respected (ST-007)

### Depends on
- ST-001, ST-008

### Out of scope
- Push notifications (post-MVP)
- Custom install banner (use the browser's)

### Test data
- None

## Acceptance criteria
```gherkin
Feature: Install on my home screen and use offline
  As a person who wants Homekeep one tap away
  I want to install it and use it without signal
  So that it feels like a real app wherever I am

  Scenario: Installable
    Given I open the production URL in Chrome on Android or Safari on iOS
    When I choose Add to Home Screen
    Then Homekeep installs with its icon and opens without browser bars

  Scenario: Works offline
    Given I have opened the app once
    When I turn on airplane mode and open it
    Then I can see, add and complete tasks

  Scenario: Update without losing my place
    Given a new version has been deployed
    When I next open the app
    Then I see "A fresh version is ready — refresh" and my data is unchanged
```

## Security and privacy
Service worker serves only same-origin files.

PRD reference: §6 PWA, §7

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
