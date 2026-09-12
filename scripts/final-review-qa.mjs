import { chromium } from '../.qa-tools/node_modules/playwright/index.mjs';
import AxeBuilder from '../.qa-tools/node_modules/@axe-core/playwright/dist/index.mjs';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
});
const page = await context.newPage();
const base = process.env.QA_URL || 'http://127.0.0.1:4173/destrosolutions';
const report = { checks: [], violations: [], errors: [] };
page.on('pageerror', (e) => report.errors.push(e.message));
try {
  await page.goto(base + '/product/');
  await page.locator('.product-graph-section').scrollIntoViewIfNeeded();
  await page.locator('[data-node="vuln"]').click();
  assert.equal(await page.locator('.graph-edge.is-impact').count(), 4);
  assert.match(
    await page.locator('.graph-detail').innerText(),
    /DEMO-VULN-001 → Link library → Firmware 4.2.1 → Gateway ECU → Vehicle/,
  );
  await page
    .locator('.product-graph')
    .screenshot({ path: 'qa-output/review-graph.png' });
  report.checks.push(
    'Complete vulnerability-to-product propagation, including textual path',
  );
  await page.locator('.remediation-workflow').scrollIntoViewIfNeeded();
  await page
    .getByRole('group', { name: 'Security workflow stages' })
    .getByRole('button', { name: /11 Remediation/ })
    .click();
  await page
    .locator('.remediation-workflow')
    .screenshot({ path: 'qa-output/review-workflow.png' });
  report.violations.push(
    ...(
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  );
  await page.goto(base + '/training/');
  for (const button of await page
    .getByRole('group', { name: 'Engineering learning areas' })
    .getByRole('button')
    .all()) {
    await button.click();
    assert.ok(
      (await page.locator('.learning-context').innerText()).length > 100,
    );
  }
  assert.ok(
    await page
      .getByRole('link', {
        name: 'View the official programme and booking details',
      })
      .isVisible(),
  );
  report.checks.push(
    'All five learning-map selections and official training link',
  );
  await page.goto(base + '/');
  await page
    .getByRole('group', { name: 'Physical AI stages' })
    .getByRole('button', { name: /Learn/ })
    .click();
  assert.match(
    await page.locator('.physical-evidence').innerText(),
    /feedback provenance/,
  );
  await page.getByLabel('Risk level', { exact: true }).selectOption('Low');
  assert.equal(
    await page
      .getByRole('tabpanel', { name: 'Threat Intelligence', exact: true })
      .locator('article')
      .count(),
    1,
  );
  report.checks.push('Physical AI Learn stage and SOC risk filtering');
  for (const width of [360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base + '/product/');
    await page.locator('.product-graph-section').scrollIntoViewIfNeeded();
    if (width <= 600)
      await page
        .getByLabel('Product relationship', { exact: true })
        .selectOption('vuln');
    else await page.locator('[data-node="vuln"]').click();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await page
      .getByRole('group', { name: 'Security workflow stages' })
      .getByRole('button', { name: /11 Remediation/ })
      .click();
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    if (width === 360) {
      await page
        .locator('.remediation-workflow')
        .screenshot({ path: 'qa-output/review-workflow-mobile.png' });
      report.violations.push(
        ...(
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()
        ).violations,
      );
    }
    report.checks.push('Loaded graph and selected workflow: ' + width + 'px');
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + '/');
  await page.locator('.hero').screenshot({ path: 'qa-output/review-hero.png' });
  await page.setViewportSize({ width: 360, height: 1000 });
  await page.goto(base + '/');
  await page
    .locator('.security-grid-hero')
    .screenshot({ path: 'qa-output/review-hero-mobile.png' });
  assert.equal(report.errors.length, 0);
  assert.equal(report.violations.length, 0);
  console.log(JSON.stringify(report, null, 2));
} finally {
  await writeFile(
    'qa-output/final-review-report.json',
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
