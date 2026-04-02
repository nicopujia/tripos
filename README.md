# Tripos web version

## Product intent

- Build a polished web adaptation of Tripos for Nico Pujia.
- The app should also read as a test project for justralph.it.

## Game rules used by the app

- The board is a 3x3 grid.
- The board's color pattern is fixed:
  - Row 1: 1, 3, 2
  - Row 2: 3, 2, 1
  - Row 3: 2, 1, 3
- Players alternate placing X and O on empty cells.
- A win happens by completing any row, any column, or any same-color three-cell set.
- Each side places at most four marks.
- If the first player has not already won by the end of the first player's fourth move, the second player wins.
- There are no draws.

## Global product decisions

- Required routes: `/`, `/play`, `/rules`, `/about`.
- The Play route owns mode selection.
- Supported modes:
  - human vs human on one device,
  - human vs computer with `Normal` and `Insane` difficulties.
- Human vs human always starts with X, including rematches.
- Human vs computer starts randomly on the first game after difficulty selection, then alternates starter on rematches.
- UI languages: English and Spanish.
- Language is chosen on the Home page, persists across refreshes, and defaults from browser language with English fallback.
- No gameplay persistence or accounts.
- Allowed preference persistence: language and mute state.
- Accessibility scope for v1: strong keyboard support; screen-reader-specific work is not required beyond incidental semantics.
- The app must be mobile-friendly and installable as a PWA.
- After the first successful load, gameplay must work offline.

## Chosen implementation stack

- React + TypeScript + Vite
- React Router for routes
- `i18next` + `react-i18next` for localization
- `vite-plugin-pwa` for installability and offline caching
- Local component/state logic only; no backend

## Deployment target

- Host v1 on Cloudflare Pages.
- Use the domain `tripos.justralph.it`.
- Production deploys should happen automatically from the `main` branch.
- Preview deployments for non-main branches are not required for v1.
- Ralph is expected to perform the real Cloudflare setup and deployment when the required access is available.
- Use the Cloudflare CLI for deployment-related setup and execution.

## Shared UI conventions

- Show the board colors directly on the board.
- End-game text names only the winner; the board highlight explains the winning line/group.
- Invalid input should use a subtle shake animation.
- Sound starts enabled.
- Donation CTA label: `Buy me a coffee`.
- Donation URL: `https://nicolaspujia.com/pay`.
- Donation links open in a new tab.
