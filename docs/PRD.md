# PRD — Homekeep
**Product Requirements Document v1.0**
*Author: Demi Sokoya | Created: 2026-04-27*

---

## 1. Problem Statement

Recurring household tasks (laundry, cleaning, maintenance) are easy to forget and hard to track without a system. Existing to-do apps are too generic — they don't understand repeating intervals, don't survive life events like moving, and aren't designed to be rewarding to use. People with ADHD especially benefit from visual feedback, satisfying interactions, and low-friction check-ins.

---

## 2. Goal

Build a mobile-first household task scheduler that:
- Makes recurring chores feel manageable and rewarding
- Survives real-life disruptions (moving, schedule changes)
- Is glanceable — useful in 5 seconds without opening a sub-menu

---

## 3. Target User

**Primary:** Demi (solo use, MVP)
**Secondary:** Adults managing a household independently, particularly those with ADHD who benefit from visual structure, streaks, and satisfying feedback loops.

---

## 4. MVP Feature Set

### 4.1 Task Management
- Create tasks with a name, category (room + frequency), and custom repeat interval (e.g. every 3 days, every 2 weeks)
- Mark tasks as complete — triggers a satisfying animation
- Tasks automatically reschedule from the completion date (not the due date), preventing drift

### 4.2 Categorisation
- **By Room:** Starts with defaults (Kitchen, Bathroom, Bedroom, Living Room, General, Outdoor) — fully customisable
  - Create new rooms with a custom name and optional emoji/icon
  - Rename or delete existing rooms (tasks in a deleted room move to "General")
- **By Frequency:** Daily, Weekly, Monthly, Custom interval — frequency group labels are also renameable
- Toggle between both views from the dashboard
- Rooms stored as a separate `categories` collection so they exist independently of tasks

### 4.3 Move-Out Mode
- A dedicated "Move Out" action that prompts for a move-in date
- All task countdowns reset from the new move-in date, respecting each task's original interval
- Effectively a "fresh start" that doesn't wipe history

### 4.4 Dashboard
- Glanceable overview: tasks due today, upcoming (next 7 days), and overdue
- Visual urgency indicators (colour-coded by how overdue)
- Quick-complete from the dashboard without opening a task

### 4.5 Gamification

**Per-task streaks**
- Each task tracks its own consecutive on-time completion count independently
- Missing one task only breaks that task's streak — nothing else is affected
- Streaks carry over through Move-Out Mode (behaviour history is preserved; only due dates shift)
- If a task is overdue at the time of moving out, its streak is already considered broken — Move-Out Mode resets the next due date only

**Global XP + Level**
- Every task completion earns XP — the global level never resets, it only climbs
- Streaks act as an XP multiplier: consecutive on-time completions increase XP earned per task
- XP scales by user-defined effort rating, set when creating a task:
  - 🟢 Quick (under 10 min) — base XP
  - 🟡 Medium (10–30 min) — 2× base XP
  - 🔴 Heavy (30+ min) — 3× base XP
- No global streak, no daily task gate — failure is always contained to the individual task

**Visual progress**
- Global XP bar filling toward next level (always visible on dashboard)
- Per-task streak count displayed on each task card
- Room completion rings (how many tasks in a room are done for their current interval)

**Completion feedback**
- Satisfying animation on task complete
- Optional sound (opt-in, surfaced as a prominent first-run prompt)

---

## 5. Out of Scope (MVP)

- Push notifications (post-MVP — Web Push API, supported via PWA service worker)
- Multi-home / profile switching (post-MVP)
- Shared household / multi-user
- Backend / cloud sync — localStorage for MVP
- Native app (web app only for MVP)

---

## 6. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | React + TypeScript (Vite) | Matches upgrade path from portfolio; component model suits task cards |
| Styling | CSS Modules + CSS custom properties | Design token–friendly, no extra dep |
| State | React state + localStorage | Sufficient for single-user MVP |
| Hosting | Vercel | Already in workflow; preview deploys per branch |
| Animations | CSS keyframes + Web Animations API | No extra lib for MVP |
| PWA | Vite PWA plugin (`vite-plugin-pwa`) | Service worker + web manifest; installable on iOS/Android home screen, offline-capable |

---

## 7. Design Direction

- **Mobile-first:** 375px base, scale up with `min-width` only; designed to be installed as a PWA and used from the home screen
- **Theme:** System default (respects `prefers-color-scheme`)
- **Tone:** Soft, tactile, slightly playful — not clinical. Think: a well-designed physical planner, not a corporate SaaS tool
- **Gamification aesthetic:** Subtle — XP bars and streaks should feel like a natural part of the UI, not a bolt-on

---

## 8. Success Criteria (MVP)

- [ ] Can create, complete, and reschedule a recurring task
- [ ] Move-Out Mode correctly resets all task intervals
- [ ] Dashboard is readable in under 5 seconds
- [ ] Completion of a task feels satisfying (animation + XP feedback)
- [ ] Both room and frequency views work correctly
- [ ] Data persists across browser sessions (localStorage)

---

## 9. Open Questions

- What's the visual language for "overdue"? Red feels punishing for an ADHD-friendly app — consider amber/orange instead.
- Should streaks break immediately when overdue, or have a grace period?
- Sound on by default or opt-in?

---

## 10. Post-MVP Roadmap

1. Push notifications (Service Worker / Web Push)
2. Multi-home profiles (Move-Out Mode evolves into profile switching)
3. Cloud sync + account system
4. React Native port (Expo)
