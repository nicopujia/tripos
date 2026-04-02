---
title: Ship PWA offline support
priority: 1
assignee: Ralph
depends_on:
  - scaffold-web-foundation
  - add-localization-and-prefs
  - build-play-route
  - build-home-rules-about
  - add-audio-and-motion
acceptance_criteria:
  - The app is installable as a PWA.
  - After a successful first load, the installed app can launch and play Tripos offline.
  - Offline support includes the Home, Play, Rules, and About routes and the assets required for gameplay, localization, and audio.
  - A production build includes the generated PWA assets and service worker configuration.
  - A short verification note is added to the repository documenting how Ralph verified offline gameplay after first load.
---

Finish the static web app as an installable offline-capable PWA.

Implementation notes:

- Use `vite-plugin-pwa`.
- Cache enough app shell and static assets to satisfy the product requirement of full offline gameplay after first visit.
- No backend sync, accounts, or remote game-state storage is needed.
