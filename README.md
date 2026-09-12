# DestroSolutions website redesign

A responsive, statically rendered React website with 15 pages: homepage, product, capabilities, industry overview, nine industry pages, use cases and contact. Includes a dedicated 404 page.

## Local development

- `npm install --ignore-scripts` installs the supplied starter dependencies on Windows ARM, where the unused Cloudflare workerd dependency is unsupported.
- `npm run dev` starts Vite.
- `npm run build` type-checks, bundles and prerenders all pages into `out`.
- `npm run start` previews the production output.

The generated starter's dependency set is retained. The website itself is static and does not need the Cloudflare Worker runtime. Vite may need normal subprocess permissions on Windows.

## Content and integrations

Content, industry terminology, imagery, email and phone destinations are based on the public destrosolutions.com site. Training, articles, careers, team information, policies and the existing enquiry form link to that site. They have not been migrated. Demo requests open the visitor's email application; no form submission or scheduling backend is simulated.

## Review deployment and production migration

This is a separate review website. It does not change destrosolutions.com. The preview deliberately emits `noindex, nofollow` and disallows crawling to avoid duplicating the current website. Canonical URLs point to the intended original-domain paths. Existing social preview imagery is preserved.

Before replacing the original website, obtain its source and hosting access, merge this design with its existing content and integrations, preserve existing routes and redirects, confirm business copy, then remove preview indexing restrictions in `scripts/prerender.mjs`. Keep current training/booking, application, contact and analytics integrations working during the migration.

No customer logos, testimonials, certifications, performance figures or live security data have been invented.

## Refined design
The second version introduces a navy, white and cyan visual system, responsive product architecture diagrams, an accessible four-stage platform explorer on the homepage and product page, and current-page navigation. The explorer explains workflows using conceptual inputs and outputs; it does not simulate live security data.

## Full-page refinement
All 15 routes use a consistent editorial system with page navigation, clearer capability flows, industry-specific security landscapes, question/workflow/result use cases, and direct contact options. The deployment verifies internal links and in-page anchors before publishing. External training, article, career, team and policy pages remain on the original company website.
