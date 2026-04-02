---
title: Scaffold web app foundation
priority: 0
assignee: Ralph
depends_on: []
acceptance_criteria:
  - A React + TypeScript + Vite app exists at the repository root and runs with standard `dev`, `build`, and `preview` scripts.
  - React Router is configured with placeholder routes for `/`, `/play`, `/rules`, and `/about`.
  - A shared responsive app shell exists for non-home pages, with navigation links to Home, Play, Rules, and About.
  - The project includes a clear folder structure for routes, game logic, localization resources, audio assets, and shared UI components.
  - A production build succeeds without TypeScript or bundler errors.
---

Set up the base application that all other tasks build on.

Use the stack defined in the repository `README.md`: React + TypeScript + Vite + React Router. Keep the structure simple and maintainable for a small static app.

Implementation notes:

- Put the application at the repository root rather than inside a nested package.
- Create route components for Home, Play, Rules, and About, even if they are placeholders initially.
- Establish shared styling primitives or design tokens that later tasks can reuse for the Tripos board colors, spacing, motion timings, and typography.
- The shared app shell should not place the language toggle globally, because the language toggle belongs only on the Home page.
