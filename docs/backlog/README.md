# MVP1 backlog

30 issues in the Mediccord story format (user story or technical enabler, Gherkin acceptance criteria). Source: `docs/PRD.md`, design.md, Design_spec.md, the Stitch prompt and the Web App Development SOP.

File them all with `./docs/backlog/create-issues.sh` (GitHub CLI, logged in). Run it on a repo with no issues or PRs yet and ST-00N becomes issue #N.

| ID | Type | Epic | Pts | Sprint | Priority | Design missing |
|---|---|---|---|---|---|---|
| [ST-001 Project foundations](mvp1/ST-001-project-foundations.md) | Technical enabler | E01 Foundations | 2 | S1 | Must |  |
| [ST-002 Design tokens and type in code](mvp1/ST-002-design-tokens-in-code.md) | Technical enabler | E01 Foundations | 3 | S1 | Must |  |
| [ST-003 Figma design system and missing screens](mvp1/ST-003-figma-design-system.md) | Technical enabler | E01 Foundations | 3 | S1 | Must |  |
| [ST-004 Data model and saved data](mvp1/ST-004-data-model-and-storage.md) | Technical enabler | E01 Foundations | 3 | S1 | Must |  |
| [ST-005 Scheduling rules engine](mvp1/ST-005-scheduling-rules-engine.md) | Technical enabler | E01 Foundations | 3 | S1 | Must |  |
| [ST-006 Shared UI components](mvp1/ST-006-shared-ui-components.md) | Technical enabler | E01 Foundations | 3 | S1 | Must |  |
| [ST-007 App shell and bottom navigation](mvp1/ST-007-app-shell-and-navigation.md) | User story | E01 Foundations | 2 | S1 | Must |  |
| [ST-008 Preview and production deploys](mvp1/ST-008-preview-and-production-deploys.md) | Technical enabler | E01 Foundations | 1 | S1 | Must |  |
| [ST-009 Add a task](mvp1/ST-009-add-a-task.md) | User story | E02 Track recurring tasks | 3 | S2 | Must |  |
| [ST-010 Complete a task](mvp1/ST-010-complete-a-task.md) | User story | E02 Track recurring tasks | 3 | S2 | Must |  |
| [ST-011 Undo a completion](mvp1/ST-011-undo-a-completion.md) | User story | E02 Track recurring tasks | 1 | S2 | Must |  |
| [ST-012 Show and hide completed tasks](mvp1/ST-012-show-completed-tasks.md) | User story | E02 Track recurring tasks | 1 | S2 | Must |  |
| [ST-013 Completed tasks reset on schedule](mvp1/ST-013-completed-tasks-reset.md) | User story | E02 Track recurring tasks | 2 | S2 | Must |  |
| [ST-014 Edit or delete a task](mvp1/ST-014-edit-or-delete-a-task.md) | User story | E02 Track recurring tasks | 2 | S3 | Should | yes |
| [ST-015 Today at a glance](mvp1/ST-015-today-at-a-glance.md) | User story | E03 Dashboard | 3 | S2 | Must |  |
| [ST-016 First-run welcome](mvp1/ST-016-first-run-welcome.md) | User story | E03 Dashboard | 2 | S2 | Must |  |
| [ST-017 Rooms I can shape](mvp1/ST-017-rooms-i-can-shape.md) | User story | E04 Rooms and frequency | 3 | S3 | Must | yes |
| [ST-018 Rooms view with completion rings](mvp1/ST-018-rooms-view.md) | User story | E04 Rooms and frequency | 3 | S3 | Must |  |
| [ST-019 Room detail](mvp1/ST-019-room-detail.md) | User story | E04 Rooms and frequency | 2 | S3 | Should | yes |
| [ST-020 Frequency view](mvp1/ST-020-frequency-view.md) | User story | E04 Rooms and frequency | 2 | S3 | Must |  |
| [ST-021 XP and levels](mvp1/ST-021-xp-and-levels.md) | User story | E05 Streaks and XP | 3 | S3 | Must |  |
| [ST-022 Per-task streaks](mvp1/ST-022-per-task-streaks.md) | User story | E05 Streaks and XP | 3 | S3 | Must |  |
| [ST-023 Streaks and XP screen](mvp1/ST-023-streaks-and-xp-screen.md) | User story | E05 Streaks and XP | 2 | S3 | Must |  |
| [ST-024 Satisfying completion with opt-in sound](mvp1/ST-024-satisfying-completion.md) | User story | E05 Streaks and XP | 2 | S4 | Should | yes |
| [ST-025 Move-Out Mode](mvp1/ST-025-move-out-mode.md) | User story | E06 Move-Out Mode | 3 | S4 | Must |  |
| [ST-026 Settings: reset time and sound](mvp1/ST-026-settings.md) | User story | E07 Settings and install | 1 | S4 | Must | yes |
| [ST-027 Install on my home screen and use offline](mvp1/ST-027-install-and-offline.md) | User story | E07 Settings and install | 2 | S4 | Must |  |
| [ST-028 Accessible and calm](mvp1/ST-028-accessible-and-calm.md) | Technical enabler | E08 Quality and release | 2 | S4 | Must |  |
| [ST-029 End-to-end tests for the core flows](mvp1/ST-029-end-to-end-tests.md) | Technical enabler | E08 Quality and release | 2 | S4 | Must |  |
| [ST-030 MVP1 release](mvp1/ST-030-mvp1-release.md) | Technical enabler | E08 Quality and release | 2 | S4 | Must |  |

**Points by sprint:** S1 20 · S2 15 · S3 20 · S4 14 · total 69

## Decisions to confirm before the sprint they land in

- **XP values** (ST-021): base 10 XP, streak multiplier 1 + 0.1 × streak capped at 2×, level n→n+1 needs 100 × n XP
- **Streak grace period** (ST-022): none for MVP; a streak breaks the moment a task is overdue (PRD open question)
- **Sound** (ST-024): opt-in, asked once after the first completion (PRD open question)
- **Move-Out maths** (ST-025): move-in date counts as the last completion, so next due = move-in date + interval
- **Room icons** (ST-017): Lucide icon picker instead of the PRD's emoji, per the design rule of no emoji
- **Dark mode** (ST-002/ST-003): accent, amber and semantic tokens have no dark values yet
