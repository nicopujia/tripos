---
title: Build Home, Rules, and About
priority: 1
assignee: Ralph
depends_on:
  - scaffold-web-foundation
  - add-localization-and-prefs
acceptance_criteria:
  - The Home page presents Tripos as a polished gateway with prominent branding/hero and clear navigation to Play, Rules, and About.
  - The Home page contains the only language toggle in the app.
  - The Rules page explains how to play in plain language, includes the special four-move rule, shows the board color pattern clearly, and includes static example winning states.
  - The Rules page includes a brief note that `Insane` difficulty plays perfectly.
  - The About page states that the app was built by Nico Pujia as a test for justralph.it.
  - The About page includes the `Buy me a coffee` donation button as a secondary action.
---

Build the non-game routes that frame the product.

Implementation notes:

- Do not duplicate the original article credit on the About page; keep source/rules context on the Rules page only.
- The Rules page examples should be static illustrations, not interactive demos.
- Use the board colors and overall visual language consistently so the pages feel like one product.
