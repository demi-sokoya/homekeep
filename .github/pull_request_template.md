<!--
One story per pull request. Title: Conventional Commit + story, e.g. "feat: add a task (ST-009)".
Feature (feat/) and fix (fix/) branches merge into dev; only dev merges into main (SOP 1.3).
Delete these comments before opening. Use made-up task names only.
-->

## Story

Closes #<!-- issue number --> (ST-<!-- 000 -->)

## What changed

<!--
Two or three sentences a reviewer can read cold: what the user can now do, which agreed Figma frame it
matches, and anything it builds on (earlier PRs) or leaves for a later story.
-->

- `src/...`: <!-- one line per file: what it is and why it changed -->

<!--
If this changes or loosens an existing test, list each one under a bold heading and say why the rule it
guards still holds, e.g.:

**Changes to ST-0xx tests (please review):**
- `some.test.ts`: what changed, and why the original rule is still checked.
-->

## How to test

1. `npm test`: the ST-<!-- 000 --> scenarios in `<!-- file -->.test.tsx` pass.
2. `npm run dev`, open the app at 375px (or the Vercel preview on a phone) and <!-- steps for each acceptance scenario -->.
3. Compare with the agreed screenshot on #<!-- issue number -->.

## Questions for the reviewer

<!--
Decisions you made that the story did not settle, follow-ups for later stories, and review feedback with
how it was resolved (mark it "(resolved)" and give the commit). Write "None" if there are none.
-->

## Definition of done

- [ ] Tests written first from the story's Gherkin scenarios, and they pass
- [ ] Colours, type, spacing and radius come from the design tokens only (raw-colour check passes)
- [ ] Every interactive element is at least 44×44px and works by touch and keyboard, with visible focus
- [ ] Animations respect reduced motion; state is still clear without them
- [ ] Checked at 375px, 768px and 1280px with no horizontal scroll, and on a real phone via the Vercel preview
- [ ] Matches the agreed Figma frame; no emoji; overdue is amber-orange, never red; copy follows the design.md voice
- [ ] New components have a props interface and a JSDoc block with an `@example`
- [ ] Saved-data changes go through the storage module, with a schema version bump and migration if the shape changed
- [ ] Made-up data only; no secrets, keys or tokens in code, tests or config
- [ ] `docs/design-language.md`, `README.md` or `CHANGELOG.md` updated if this changes them
- [ ] Branch up to date with `dev`; CI green

## Self-review

<!--
Read the whole diff once more before asking for review and paste the result: PASS, or what you found and fixed.
Cover: anything stored in localStorage (what, and whether it is needed), anything sent off the device
(should be nothing in MVP), new dependencies (why, licence, size), and accessibility (screen reader names,
contrast, motion).
-->
