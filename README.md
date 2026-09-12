# DestroSolutions

The DestroSolutions GitHub Pages website: https://sasindhar.github.io/destrosolutions/

An enterprise product-security website built with React, TypeScript, Vite, Tailwind and accessible Base UI / Shadcn primitives. Forty-one prerendered pages cover the platform, ten solution application areas, thirteen industries, technology, training, insights, company, careers, demonstration scenarios, contact and website information. The original fifteen routes are preserved. This repository does not change the separate destrosolutions.com hosting.

## Development

Use Node 24 and the checked-in package lock.

```sh
npm install --ignore-scripts
npm run dev
npm run build
npm run start
```

`--ignore-scripts` avoids the retained but unused Cloudflare workerd install hook, which does not support Windows ARM. The website is static and does not use that runtime. Builds run TypeScript, Vite and server-side prerendering to `out/`.

For a production-equivalent build set `SITE_BASE=/destrosolutions/` before building and verifying. PowerShell: `$env:SITE_BASE='/destrosolutions/'`. GitHub Actions derives the base from Pages configuration, installs locked dependencies, verifies the site and deploys `out/` on pushes to `main`.

## Architecture

- `app/content.ts`: company contact, navigation, industry/solution/training/scenario content and route metadata.
- `app/experience.tsx`: navigation, footer, page framing, architecture diagrams, product demo, threat record, workflow and SOC components.
- `app/page.tsx`: route selection and page compositions.
- `app/globals.css`: shared tokens, responsive layouts, dark theme and reduced-motion behavior.
- `app/site-search.tsx`: searchable command palette and keyboard shortcut.
- `app/industry-compare.tsx`: industry comparison, stacked on small screens.
- `app/enquiry-builder.tsx` and `app/enquiry-message.ts`: reviewable email drafts with validated URL context.
- `scripts/prerender.mjs`: HTML, per-page metadata, Organization/WebSite schema, canonical URLs, sitemap, robots and 404.

Architecture nodes, product selection, agent workflow, SOC filters and review markers are interactive demonstrations. They do not connect to production systems, perform security actions or send information. The enquiry builder keeps its draft in page memory and opens the visitor's email client; sending is an explicit visitor action.

## Content boundaries

The site uses the company's public product-intelligence, threat-intelligence and AI-workflow context. Numbers, product records and scenarios in demo interfaces are explicitly fictional. Training topics are enquiries with scope/format to confirm, not accredited course promises. Careers are talent invitations, not invented vacancies. Standards are engineering context, not certification or compliance claims. Registered legal entity, address and identifiers must be supplied and verified before treating the Imprint page as complete statutory disclosure.

## Verification

```sh
node scripts/verify.mjs
node --experimental-strip-types scripts/test-enquiry.mjs
```

Verification checks all prerendered routes, internal resources and anchor destinations, one primary heading, indexing, canonicals, structured data, sitemap and enquiry encoding.

Optional local browser tools are isolated from production dependencies:

```sh
npm install --prefix .qa-tools --no-save --package-lock=false --ignore-scripts playwright lighthouse @axe-core/playwright
node scripts/browser-qa.mjs
node scripts/lighthouse-qa.mjs
```

The browser script uses installed Chrome, defaults to the dev server on port 5173, and accepts `QA_URL` for a production preview. It checks 1440, 1280, 1024, 768 and 390 pixel widths, all routes with axe, UI state changes, enquiry context and keyboard controls. The Lighthouse script uses the production preview on port 4173 and a Windows Chrome path; adapt that path for another OS. Reports and screenshots go to ignored `qa-output/`. Automated checks supplement visual and keyboard review; they do not establish complete WCAG conformance or legal compliance.
