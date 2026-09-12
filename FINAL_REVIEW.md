# Final engineering review — 12 September 2026

## Scope and factual reference

Reviewed the existing 41-route React/TypeScript application, shared components, content, styles, public assets, state and event handling, route utilities, metadata generation, package tree and GitHub Pages workflow. Preserved the existing design and routes. The initial browser interaction suite passed before implementation.

Rendered factual references: [official homepage](https://www.destrosolutions.com/), [platform](https://www.destrosolutions.com/product), [training](https://www.destrosolutions.com/training).

The official platform lists Product Intelligence Suite, Threat Intel Exchange and Agentic AI Threat Automation. These remain a connected ecosystem. The training page now promotes an EU CRA programme; this review replaced the previous unverified course catalogue with its published learning areas and an official booking link. Time-sensitive prices/dates are not duplicated.

## Benchmark decisions

Reviewed public technology/platform pages from NVIDIA, Datadog, Stripe, CrowdStrike, Bosch and Vercel; Palantir and Siemens extraction was limited. Quality references informed clear product framing, connected capabilities, concise evidence, industry context and direct conversion paths. No layouts, logos, testimonials or business metrics were copied. This is a qualitative design assessment, not a measured competitive ranking.

Compared with the official DestroSolutions pages reviewed, this implementation adds explorable architecture, a dependency-impact graph and auditable simulated workflow states. It retains a more conservative distinction between demonstration behavior and real integrations. No claim of superior real-world security performance is made.

## Findings resolved

- OS architecture: expanded six layers to seven, including supplier intelligence and the context engine.
- Signature workflow: replaced the short linear walkthrough with 13 selectable stages from a new threat to verification and evidence. Each explains the event, relevance, data and handoff. Local illustrative approval never authorizes a production action.
- Product graph: a vulnerability selection highlights all four dependency edges through library, software and ECU to product; the same potential-impact path is available as text and on mobile.
- Hero: eight cyber-physical nodes, clearer threat/context descriptions and a vertical mobile architecture. Fixed a signal-label overlap found during visual review.
- Threat/AI interfaces: supplier details and five named analyst roles with concise auditable evidence summaries.
- pSOC: eight panels, including a seven-stage incident timeline; preserved risk filters and local review controls.
- Physical AI: added Learn and autonomous-system context. Lifecycle now ends in verification. Attack surfaces include explicit response guidance.
- Training: five selectable engineering contexts and verified official programme content; no invented standalone courses, accreditations or booking claims.
- Conversion: shared final CTA directs visitors to a discussion or Product Security OS.
- Maintenance: removed 50 unused starter components and unused server/runtime dependencies. Removed obsolete workflow styles. Updated undici to 7.29.1 and Vite to 8.0.16; full npm audit reports zero known vulnerabilities at review time.

## Verification

- Production TypeScript/Vite/prerender build passed for 41 pages plus 404.
- 1,625 local links/assets and 177 anchor destinations verified.
- 128 route/viewport checks across 360, 390, 430, 768, 1024, 1280, 1440 and 1920px: no horizontal overflow.
- Axe WCAG 2/2.1 A/AA checks: no automated violations on all 41 routes; selected threat, graph and workflow states also checked.
- 21 browser interaction checks passed, including all 13 workflow stages, human-review boundary, keyboard graph controls, mobile navigation, search, enquiry context and reduced motion.
- Additional tests cover graph propagation, every learning-map option, Learn, and loaded graph/workflow states at all eight widths.
- Visual screenshots reviewed for desktop graph, workflow and hero, plus mobile workflow and hero.
- Build retains prerendered page titles, descriptions, canonicals, OpenGraph/Twitter metadata, Organization/WebSite schema, sitemap, robots and noindex 404.
- No browser errors in the interaction tests. Obvious credential-pattern scan found no matches in application, public assets, components, scripts or workflow files. This is not a penetration test.

Local mobile Lighthouse results (production preview):

| Page     | Performance | Accessibility | Best practices | SEO |
| -------- | ----------: | ------------: | -------------: | --: |
| Home     |          97 |           100 |            100 | 100 |
| Product  |          98 |           100 |            100 | 100 |
| Contact  |          98 |           100 |            100 | 100 |
| Training |          98 |           100 |            100 | 100 |

Scores are lab measurements, not field data. The graph remains a separate ~2.14 kB gzip chunk; primary JavaScript is ~152.14 kB gzip and CSS ~22.54 kB gzip. New experiences modestly increase browser code; dependency cleanup reduces installation and maintenance surface rather than claiming an equivalent download reduction. No animation library was added.

## Operational boundaries

Security records, scores, analyst output, workflow outcomes and pSOC timelines are labelled simulations. There is no production security backend or AI connection. The enquiry builder prepares a local email draft; sending remains a visitor action. Registered legal entity, full statutory address and identifiers still require verified company input for the Imprint. Automated accessibility results do not establish complete WCAG conformance.

The release target is the existing GitHub Pages site. The separate official domain hosting is unchanged. GitHub Actions installs the lockfile, builds/verifies the static output and deploys Pages on main.

