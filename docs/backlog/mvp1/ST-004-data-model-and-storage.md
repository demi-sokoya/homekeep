<!-- title: ST-004 Data model and saved data | labels: story,mvp1,enabler -->
> **Technical enabler** · E01 Foundations · 3 pts · MVP1, planned sprint S1 · Priority Must

## Why
Tasks, rooms, completions, XP and settings must survive closing the browser (PRD success criterion). Defining the shapes once, as TypeScript interfaces, stops each screen inventing its own and makes future cloud sync (post-MVP) a migration rather than a rewrite.

## What
TypeScript interfaces for every data model and a single storage module that reads, writes and migrates them in localStorage.

### Business rules
- Interfaces in `src/types/`: `Task`, `Room` (category), `Completion`, `Progress` (xp, level), `Settings`
- `Task`: id, name, roomId, interval `{ every: number; unit: 'day' | 'week' | 'month' }`, effort `'quick' | 'medium' | 'heavy'`, nextDue (ISO date), lastCompleted, completedThisCycle, streak, createdAt
- `Room` stored as its own `rooms` collection, independent of tasks (PRD 4.2)
- `Completion` log keeps every completion (taskId, completedAt, onTime, xpEarned) so history is never lost, including through Move-Out
- `Settings`: resetTime (default `02:00`), soundOn (default false), frequencyLabels, hasSeenSoundPrompt
- One storage key with a `schemaVersion`; a migration runs when the version changes
- Writes go through one hook/module (`useHomekeepStore` or similar); no component touches localStorage directly
- If saved data cannot be read, the app keeps a copy under a backup key and starts clean with a gentle message, never a crash
- Dates are stored as local calendar dates (no time-zone drift on due dates)

### Design
- None (no UI)

### Depends on
- ST-001

### Out of scope
- Cloud sync, accounts, export/import (post-MVP)

### Test data
- Seed file with 6 default rooms and 8 made-up tasks across daily, weekly, monthly and custom intervals

## Done when
```gherkin
Feature: Data model and saved data

  Scenario: Data survives a reload
    Given I have added a task and completed another
    When I close the browser and open the app again
    Then both changes are still there

  Scenario: Old saved data is migrated
    Given saved data from an older schema version
    When the app loads
    Then the data is migrated to the current version without losing tasks, XP or streaks

  Scenario: Unreadable data does not crash the app
    Given the saved data has been corrupted
    When the app loads
    Then the corrupted copy is kept under a backup key
    And the app starts with an empty home and a friendly message

  Scenario: Only the store writes to localStorage
    Given the source code
    When the lint rule runs
    Then any localStorage call outside the storage module fails the build
```

## Security and privacy
All data stays on the device. Nothing is sent to a server.

PRD reference: §4.2, §5, §6, §8

_MVP data stays in the user's browser (localStorage). Use made-up task names in test data; no analytics or tracking._
