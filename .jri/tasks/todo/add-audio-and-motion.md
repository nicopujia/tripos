---
title: Add audio and motion polish
priority: 2
assignee: Ralph
depends_on:
  - build-play-route
  - build-home-rules-about
acceptance_criteria:
  - Sound is enabled by default and respects the persisted mute preference.
  - The app includes distinct sounds for cell placement, win, loss, and invalid tap.
  - The main game screen mute/unmute control actually affects all app sounds.
  - The app includes lively but controlled motion for page transitions, button states, piece placement, win highlighting, and invalid input feedback.
  - Motion does not block core gameplay or make controls hard to use on mobile.
---

Add the sensory polish expected for v1.

Implementation notes:

- Keep audio and motion cohesive rather than flashy.
- Invalid input feedback should remain subtle.
- Prefer short sounds and short animations so rematches stay fast.
