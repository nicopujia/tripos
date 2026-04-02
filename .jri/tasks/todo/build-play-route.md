---
title: Build Play route
priority: 0
assignee: Ralph
depends_on:
  - scaffold-web-foundation
  - add-localization-and-prefs
  - implement-tripos-engine
  - implement-computer-ai
acceptance_criteria:
  - The Play route initially shows a mode picker and no active board.
  - Choosing human vs human starts a game immediately with X moving first.
  - Choosing human vs computer opens a difficulty modal with `Normal`, `Insane`, and a cancel/back path to the mode picker.
  - After difficulty selection, the first human-vs-computer game starts immediately with the starting side chosen randomly; rematches alternate the starter while keeping the same difficulty.
  - The board shows the fixed cell colors, supports touch/mouse input, and rejects invalid input with a subtle shake animation.
  - Human-vs-human clearly shows whose turn it is.
  - Human-vs-computer maps the human to X when starting first and to O when starting second.
  - At game end, the UI shows only the winner in text, visually highlights the deciding winning cells/group on the board, and shows actions for rematch and return to mode selection.
  - The donation button appears below the rematch and mode-selection actions on the game-over state.
  - A mute/unmute control is visible on the main game screen.
  - Keyboard-only play works on the board and surrounding controls.
---

Build the full gameplay UI on the Play route.

Implementation notes:

- Keep the game on a single page flow inside `/play`.
- The difficulty modal should appear only after selecting human vs computer.
- If the player leaves human vs computer and later chooses it again, require a fresh difficulty choice instead of remembering the previous difficulty.
- Keyboard support should include:
  - focusable mode and action controls,
  - visible focus states,
  - arrow-key movement across board cells,
  - Enter/Space placement on the focused cell.
- Choose sensible edge behavior for keyboard board navigation and document it in code comments where implemented.
