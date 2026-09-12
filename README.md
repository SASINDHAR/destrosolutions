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
- `app/system-explorer.tsx`: interactive Security Grid hero, six-layer OS architecture, attack surfaces, scroll storytelling, SDV, Physical AI, lifecycle and supplier views.
- `app/intelligence-console.tsx`: searchable inventory, replayable threat feed, evidence-based agent demonstrations and seven SOC panels.
- `app/security-data.ts`: typed fictional product, threat and architecture data shared by the interfaces.
- `app/product-graph.tsx` and `app/product-graph-loader.tsx`: keyboard-accessible SVG relationship graph with zoom/pan and a native mobile alternative; loaded as a separate bundle near the viewport.
- `app/experience-nav.tsx`: current-section navigation with a compact mobile selector.
- `app/security-lab.css`: the shared Security Grid styling, self-hosted Inter variable font, responsive interaction layouts and short progressive-enhancement page transitions.
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

The browser script uses installed Chrome, defaults to the dev server on port 5173, and accepts `QA_URL` for a production preview. It checks 360, 390, 430, 768, 1024, 1280, 1440 and 1920 pixel widths, all routes with axe, threat/graph detail states, UI changes, enquiry context, keyboard controls and reduced motion. `QA_SKIP_LAYOUT=1` or `QA_SKIP_A11Y=1` can isolate a targeted recheck. The Lighthouse script uses the production preview on port 4173 and a Windows Chrome path; adapt that path for another OS. An optional argument (`home`, `product`, `contact`, or `training`) measures one page. Reports and screenshots go to ignored `qa-output/`. Automated checks supplement visual and keyboard review; they do not establish complete WCAG conformance or legal compliance.

## Advanced experience upgrade

The upgrade preserves the existing routes, content boundaries, search, industry comparison and enquiry builder. Static explanatory diagrams were replaced where useful with selectable relationships, evidence panels and controlled demonstration workflows. No AI service, threat feed or production system is connected.

Playback is user-controlled and timers stop when the interface or browser document is hidden. The hero has a motion-pause control, and nonessential animation and transitions respect reduced-motion preferences. Graph interactions use an SVG on larger screens and a select/list view on mobile. A readable relationship summary remains available while the separate graph bundle loads or if loading fails.

The Inter variable font is served locally; its license is included in `public/fonts/OFL-Inter.txt`. No new production package dependencies were added. Superseded diagram styles were removed. Company registration and other unverified legal particulars remain subject to confirmation.
