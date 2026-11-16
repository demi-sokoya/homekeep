#!/usr/bin/env bash
# Files every MVP1 backlog item as a GitHub issue, in order (ST-001 -> issue #1 on a fresh repo).
# Usage: ./docs/backlog/create-issues.sh [owner/repo]   (needs the GitHub CLI, logged in: gh auth login)
# Safe to re-run: any issue (open or closed) whose title already exists is skipped.
set -euo pipefail
REPO="${1:-demi-sokoya/homekeep}"
DIR="$(cd "$(dirname "$0")/mvp1" && pwd)"

gh label create story          --repo "$REPO" --color 4E7A25 --description "User story or technical enabler" --force
gh label create mvp1           --repo "$REPO" --color C8DDB0 --description "In scope for MVP1" --force
gh label create enabler        --repo "$REPO" --color 5A6E3A --description "Technical enabler (no direct user-facing story)" --force
gh label create design         --repo "$REPO" --color D4A843 --description "Design work in Figma" --force
gh label create design-missing --repo "$REPO" --color C87A3A --description "No agreed screen yet; design before build" --force

existing="$(gh issue list --repo "$REPO" --state all --limit 1000 --json title --jq '.[].title')"

for f in "$DIR"/ST-*.md; do
  header="$(head -n 1 "$f")"
  title="$(sed -E 's/^<!-- title: (.*) \| labels: .* -->$/\1/' <<<"$header")"
  labels="$(sed -E 's/^.*\| labels: (.*) -->$/\1/' <<<"$header")"
  if grep -Fxq -- "$title" <<<"$existing"; then
    echo "Skipping (already exists): $title"
    continue
  fi
  echo "Creating: $title"
  tail -n +2 "$f" | gh issue create --repo "$REPO" --title "$title" --label "$labels" --assignee demi-sokoya --body-file -
done
