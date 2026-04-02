---
title: Add localization and prefs
priority: 1
assignee: Ralph
depends_on:
  - scaffold-web-foundation
acceptance_criteria:
  - The app supports complete English and Spanish UI copy for every route and shared control that exists when the task is finished.
  - On first load, language defaults from browser language when it clearly resolves to English or Spanish, and otherwise falls back to English.
  - The selected language persists across refreshes.
  - The language toggle exists on the Home page and nowhere else.
  - A persisted mute preference exists and can be read by later audio work, even if the sound assets are not added yet.
---

Add localization infrastructure and preference persistence.

Implementation notes:

- Use `i18next` with `react-i18next`.
- Keep all user-facing copy in translation resources rather than inline strings.
- The language toggle should update the entire app, not only the current page.
- Persist both language and mute state locally in the browser.
- The Play, Rules, and About pages should rely on the persisted language choice after navigation from Home.
