---
title: Implement computer opponents
priority: 1
assignee: Ralph
depends_on:
  - implement-tripos-engine
acceptance_criteria:
  - The app exposes two computer difficulties: `Normal` and `Insane`.
  - `Insane` always plays optimally and exploits a forced win whenever one exists.
  - `Normal` always takes an immediate win and always blocks an immediate loss.
  - `Normal` uses some randomness among reasonable non-forced moves so repeated games are less deterministic.
  - The AI layer exposes configured move delays of about 700ms for Normal and about 350ms for Insane.
  - Automated tests cover the guaranteed behaviors above.
---

Implement the computer players on top of the game engine.

Implementation notes:

- Keep AI logic separate from route components.
- `Insane` should be solved-play strong, not merely heuristic.
- `Normal` should feel engaging and beatable, but must still satisfy its immediate win/block guarantees.
- If randomness is used in `Normal`, inject it in a way that can be controlled in tests.
