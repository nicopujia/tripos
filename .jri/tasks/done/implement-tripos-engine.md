---
title: Implement Tripos game engine
priority: 0
assignee: Ralph
depends_on:
  - scaffold-web-foundation
acceptance_criteria:
  - Game logic exists as UI-independent TypeScript modules.
  - The engine enforces legal moves, alternating turns, the fixed 3x3 color layout, and the four-moves-per-player rule.
  - The engine detects wins by row, column, and same-color three-cell set.
  - The engine ends the game by awarding the second player a win when the first player has not already won by the end of the first player's fourth move.
  - Automated tests cover at least: legal move rejection, row wins, column wins, same-color wins, and the special four-move loss condition.
---

Implement the authoritative Tripos rules in pure logic before finishing the UI.

Implementation notes:

- The fixed color pattern is defined in `README.md` and must not be treated as configurable.
- Expose enough structured state for the UI to render:
  - current board,
  - current turn,
  - move counts by side,
  - game status,
  - winner,
  - winning cells or winning color group.
- Include helpers that make rematch setup predictable for both human-vs-human and human-vs-computer flows.
