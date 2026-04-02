---
title: Configure Cloudflare deployment
priority: 1
assignee: Ralph
depends_on:
  - ship-pwa-offline
acceptance_criteria:
  - The app has a documented production deployment target of Cloudflare Pages.
  - Build output and SPA routing are configured so the app can be served correctly from Cloudflare Pages.
  - The deployment is documented to use the domain `tripos.justralph.it`.
  - Production deployment is documented to trigger automatically from the `main` branch.
  - Preview deployments for non-main branches are not set as a v1 requirement.
  - Repository documentation includes the exact build command and output directory expected by Cloudflare Pages.
  - The task is implemented with the expectation that Ralph performs the real setup/deploy via Cloudflare CLI when access is available.
  - A short verification note is added describing how the deployed app was validated on `tripos.justralph.it`.
---

Prepare the app for production deployment on Cloudflare Pages under `tripos.justralph.it`.

Implementation notes:

- Ensure direct navigation to `/play`, `/rules`, and `/about` works under SPA hosting.
- Reuse the existing Vite production build rather than introducing a separate deployment build system.
- Keep deployment setup static-only; no backend services are required.
- Use the Cloudflare CLI for deployment-related setup and execution.
