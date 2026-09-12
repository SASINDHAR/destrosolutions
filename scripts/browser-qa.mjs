import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { routeInfo } from '../.prerender/page.js';
const base = process.env.QA_URL || 'http://127.0.0.1:5173';
await mkdir('qa-output', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
const report = { layouts: [], accessibility: [], interactions: [], errors };
process.on('uncaughtException', async (error) => {
  await writeFile(
    'qa-output/browser-report.json',
    JSON.stringify({ ...report, failure: String(error) }, null, 2),
  );
  await browser.close();
  process.exit(1);
});
const primary = [
  '/',
  '/product',
  '/solutions',
  '/industries',
  '/technology',
  '/training',
  '/insights',
  '/company',
  '/careers',
  '/contact',
  '/use-cases',
  '/solutions/automotive',
  '/solutions/physical-ai',
  '/insights/controlled-ai',
  '/privacy',
  '/imprint',
];
for (const width of process.env.QA_SKIP_LAYOUT
  ? []
  : [1920, 1440, 1280, 1024, 768, 430, 390, 360]) {
  await page.setViewportSize({ width, height: 1000 });
  for (const route of primary) {
    await page.goto(base + (route === '/' ? '/' : route + '/'), {
      waitUntil: 'networkidle',
    });
    const overflow = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: innerWidth,
      elements: [...document.querySelectorAll('main *')]
        .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
        .slice(0, 8)
        .map((e) => ({
          tag: e.tagName,
          cls: e.className,
          width: e.getBoundingClientRect().width,
        })),
    }));
    report.layouts.push({
      width,
      route,
      overflow: overflow.document > width + 1,
      details: overflow.document > width + 1 ? overflow : undefined,
    });
    if (
      route === '/' ||
      route === '/product' ||
      (width === 390 &&
        ['/contact', '/industries', '/training'].includes(route))
    )
      await page.screenshot({
        path: `qa-output/${route === '/' ? 'home' : route.slice(1)}-${width}.png`,
        fullPage: true,
      });
  }
  await writeFile(
    'qa-output/layout-report.json',
    JSON.stringify(report.layouts, null, 2),
  );
  console.log('Completed layout width', width);
}
await page.setViewportSize({ width: 1440, height: 1000 });
for (const route of process.env.QA_SKIP_A11Y ? [] : Object.keys(routeInfo)) {
  await page.goto(base + (route === '/' ? '/' : route + '/'), {
    waitUntil: 'networkidle',
  });
  assert.equal(await page.locator('h1').count(), 1, route + ' single h1');
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  report.accessibility.push({
    route,
    violations: axe.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  });
  await writeFile(
    'qa-output/accessibility-report.json',
    JSON.stringify(report.accessibility, null, 2),
  );
}
await page.goto(base + '/');

await page.getByRole('button', { name: 'Physical World', exact: true }).click();
assert.match(
  await page.locator('.hero-node-context').innerText(),
  /Establish the physical system/,
);
report.interactions.push('Hero node and relationship selection');
await page
  .getByRole('group', { name: 'Product Security OS layers' })
  .getByRole('button', { name: /AI Correlation/ })
  .click();
assert.match(
  await page.locator('.variant-os .layer-detail').innerText(),
  /Bring the evidence/,
);
report.interactions.push('Six-layer OS explorer');
await page
  .getByRole('group', { name: 'Attack surfaces' })
  .getByRole('button', { name: /Mobile App/ })
  .click();
assert.match(
  await page.locator('.surface-context').innerText(),
  /Shared product credentials/,
);
report.interactions.push('Attack-surface evidence');
await page.getByPlaceholder('Product, supplier, version…').fill('robot');
assert.equal(await page.locator('.asset-results>button').count(), 1);
await page.locator('.asset-results>button').click();
assert.match(
  await page.locator('.inventory-selection').innerText(),
  /Robot Controller/,
);
await page
  .getByRole('tab', { name: 'Vulnerability timeline', exact: true })
  .click();
assert.ok(await page.getByText('SBOM recorded', { exact: true }).isVisible());
await page
  .getByPlaceholder('Product, supplier, version…')
  .fill('does-not-exist');
assert.ok(await page.getByText('No matching products.').isVisible());
await page.getByRole('button', { name: 'Clear filters' }).click();
assert.equal(await page.locator('.asset-results>button').count(), 4);
report.interactions.push(
  'Inventory search, empty state, selection and timeline',
);
await page.getByRole('button', { name: 'Advance signal', exact: true }).click();
assert.equal(await page.locator('.threat-feed-row').count(), 2);
await page.getByRole('button', { name: /Edge runtime dependency/ }).click();
await page.getByRole('dialog').waitFor({ state: 'visible' });
assert.ok(
  await page
    .getByRole('heading', { name: 'Edge runtime dependency' })
    .isVisible(),
);
const modalAxe = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
  .analyze();
report.accessibility.push({
  route: 'threat-detail-panel',
  violations: modalAxe.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  })),
});
await page.keyboard.press('Escape');
await page.getByRole('dialog').waitFor({ state: 'hidden' });
report.interactions.push('Simulated feed and accessible threat drill-down');
await page
  .getByRole('group', { name: 'Investigation agents' })
  .getByRole('button', { name: /Supplier Risk Agent/ })
  .click();
assert.match(
  await page.locator('.agent-evidence').innerText(),
  /Supplier guidance is missing/,
);
report.interactions.push('Agent evidence and recommendation selection');
for (let i = 0; i < 5; i++)
  await page.getByRole('button', { name: 'Next step', exact: true }).click();
assert.match(
  await page.locator('.workflow-status').innerText(),
  /Human approval required/,
);
report.interactions.push('Controlled response approval boundary');
await page.getByLabel('Explore a physical system').selectOption('Vehicles');
await page
  .getByRole('group', { name: 'Physical AI stages' })
  .getByRole('button', { name: /Act/ })
  .click();
assert.match(
  await page.locator('.physical-evidence').innerText(),
  /vehicle functions/,
);
report.interactions.push('Physical AI system and stage context');
await page
  .getByRole('group', { name: 'Vehicle architecture layers' })
  .getByRole('button', { name: /OTA/ })
  .click();
assert.match(
  await page.locator('.variant-vehicle .layer-detail').innerText(),
  /rollback/,
);
report.interactions.push('Interactive SDV architecture');
await page.getByLabel('Risk level', { exact: true }).selectOption('High');
assert.equal(await page.locator('.soc-data-rows article').count(), 1);
await page.getByRole('tab', { name: 'Supplier Risk', exact: true }).click();
assert.equal(
  await page
    .getByRole('tabpanel', { name: 'Supplier Risk', exact: true })
    .locator('article')
    .count(),
  3,
);
report.interactions.push('SOC filters and panel switching');
await page.getByRole('button', { name: 'Advance demo status' }).click();
assert.match(
  await page.locator('.command-status').innerText(),
  /Product context review/,
);
await page
  .getByRole('button', { name: 'Mark for demo review', exact: true })
  .click();
assert.ok(
  await page
    .getByRole('button', { name: 'Marked for demo review', exact: true })
    .isDisabled(),
);
report.interactions.push('AI command status and local review');
await page.goto(base + '/product/');
await page.locator('.product-graph-section').scrollIntoViewIfNeeded();
await page
  .getByRole('button', { name: 'Select DEMO-VULN-001', exact: true })
  .click();
assert.match(await page.locator('.graph-detail').innerText(), /not a real CVE/);
await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
assert.match(await page.getByLabel('Graph zoom').innerText(), /115%/);
await page.getByRole('button', { name: 'Pan right', exact: true }).click();
assert.match(
  await page.locator('.graph-desktop>svg>g').getAttribute('transform'),
  /translate\(70 0\)/,
);
await page
  .getByRole('button', { name: 'Reset graph view', exact: true })
  .click();
assert.match(await page.getByLabel('Graph zoom').innerText(), /100%/);
await page
  .getByRole('button', { name: 'Select Gateway ECU', exact: true })
  .focus();
await page.keyboard.press('Enter');
assert.match(
  await page.locator('.graph-detail').innerText(),
  /Gateway hardware/,
);
report.interactions.push(
  'Graph node selection, zoom, pan, reset and keyboard activation',
);
const graphAxe = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
  .analyze();
report.accessibility.push({
  route: 'loaded-product-graph',
  violations: graphAxe.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  })),
});
await page
  .getByRole('group', { name: 'Product lifecycle stages' })
  .getByRole('button', { name: /Update/ })
  .click();
assert.match(
  await page.locator('.variant-lifecycle .layer-detail').innerText(),
  /rollback review/,
);
await page
  .getByRole('group', { name: 'Supplier security tiers' })
  .getByRole('button', { name: /Tier 2/ })
  .click();
assert.match(
  await page.locator('.supplier-evidence').innerText(),
  /firmware versions/,
);
report.interactions.push('Lifecycle and supplier evidence exploration');
await page.setViewportSize({ width: 360, height: 844 });
await page
  .getByLabel('Product relationship', { exact: true })
  .selectOption('cloud');
assert.match(
  await page.locator('.graph-detail').innerText(),
  /Example cloud API/,
);
assert.ok(!(await page.locator('.graph-desktop').isVisible()));
report.interactions.push('Dedicated mobile graph alternative');
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base + '/');
await page.getByRole('button', { name: 'Search the website' }).click();
await page
  .getByPlaceholder('Try automotive, response or suppliers…')
  .fill('training');
assert.ok(
  await page
    .getByRole('option')
    .filter({ hasText: 'Professional Training' })
    .isVisible(),
);
await page.keyboard.press('Escape');
report.interactions.push('Search and Escape dismissal');
await page.goto(base + '/industries/');
await page.getByLabel('First industry').selectOption('energy');
assert.match(
  await page.locator('.compare-table').innerText(),
  /Energy & Infrastructure/,
);
report.interactions.push('Industry comparison');
await page.goto(
  base + '/contact/?industry=Robotics&priority=Threat%20intelligence',
);
assert.equal(
  await page.getByLabel('Industry', { exact: true }).inputValue(),
  'Robotics',
);
await page.getByLabel('Your name').fill('Browser QA');
await page.getByLabel('Company', { exact: true }).fill('Example Engineering');
assert.match(
  await page.locator('.enquiry-preview pre').innerText(),
  /Example Engineering/,
);
report.interactions.push('Enquiry URL context and draft preview');
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base + '/');
await page.getByRole('button', { name: 'Open navigation' }).click();
await page
  .getByRole('navigation', { name: 'Mobile navigation' })
  .waitFor({ state: 'visible' });
await page.keyboard.press('Escape');
await page
  .getByRole('navigation', { name: 'Mobile navigation' })
  .waitFor({ state: 'hidden' });
report.interactions.push('Mobile navigation keyboard dismissal');
await page.keyboard.press('Control+k');
assert.ok(await page.getByRole('dialog').isVisible());
await page.keyboard.press('Escape');
report.interactions.push('Keyboard search shortcut');
assert.equal(
  await page
    .locator('.network-packet')
    .first()
    .evaluate((el) => getComputedStyle(el).animationName),
  'none',
);
report.interactions.push('Reduced-motion rendering');
await page.emulateMedia({ reducedMotion: 'no-preference' });
await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
assert.equal(
  await page
    .locator('.network-packet')
    .first()
    .evaluate((el) => getComputedStyle(el).animationPlayState),
  'paused',
);
report.interactions.push('Explicit motion pause control');
await page.emulateMedia({ reducedMotion: 'reduce' });
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: 950 });
  await page.goto(base + '/');
  await page.screenshot({ path: `qa-output/home-viewport-${width}.png` });
}
await writeFile(
  'qa-output/browser-report.json',
  JSON.stringify(report, null, 2),
);
await browser.close();
console.log(
  JSON.stringify(
    {
      layouts: report.layouts.length,
      overflow: report.layouts.filter((r) => r.overflow),
      accessibility: report.accessibility.filter((r) => r.violations.length),
      interactions: report.interactions,
      errors,
    },
    null,
    2,
  ),
);
if (
  report.layouts.some((r) => r.overflow) ||
  report.accessibility.some((r) => r.violations.length) ||
  errors.length
)
  process.exitCode = 1;
