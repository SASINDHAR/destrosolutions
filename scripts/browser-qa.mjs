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
  : [1440, 1280, 1024, 768, 390]) {
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
for (const route of Object.keys(routeInfo)) {
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
await page.getByRole('button', { name: /01 Physical Product/ }).click();
assert.match(
  await page.locator('.node-detail').innerText(),
  /Establish the product/,
);
report.interactions.push('Architecture node selection');
await page.getByRole('tab', { name: '02 / AI ENGINE' }).click();
assert.ok(
  await page.getByText('Context turns signals into priorities.').isVisible(),
);
report.interactions.push('Platform tabs');
await page.getByLabel('Product inventory').selectOption('1');
assert.match(
  await page.locator('.product-context').innerText(),
  /Robot Controller/,
);
report.interactions.push('Product selector updates graph and score');
for (let i = 0; i < 5; i++)
  await page.getByRole('button', { name: 'Next step' }).click();
assert.match(
  await page.locator('.workflow-status').innerText(),
  /Human approval required/,
);
report.interactions.push('Agent workflow reaches human approval');
await page.getByLabel('Risk level').selectOption('High');
assert.equal(await page.locator('.event-list article').count(), 1);
await page
  .getByRole('button', { name: 'Mark for demo review', exact: true })
  .click();
assert.ok(
  await page
    .getByRole('button', { name: 'Marked for demo review', exact: true })
    .isDisabled(),
);
report.interactions.push('SOC filter and local review state');
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
