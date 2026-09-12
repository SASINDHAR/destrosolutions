import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { routeInfo } from '../.prerender/page.js';
const routes = Object.keys(routeInfo);
const base = (process.env.SITE_BASE || '/').replace(/\/$/, '');
const rendered = new Map(
  await Promise.all(
    routes.map(async (route) => [
      route,
      await readFile(
        'out' + (route === '/' ? '' : route) + '/index.html',
        'utf8',
      ),
    ]),
  ),
);
let checked = 0,
  anchors = 0;
for (const [route, html] of rendered) {
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    `${route}: one primary heading`,
  );
  assert.ok(!html.includes('Untitled site'), `${route}: no starter metadata`);
  assert.ok(html.includes('id="main"'), `${route}: skip-link destination`);
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if ((url.startsWith('/') && !url.startsWith('//')) || url.startsWith('#')) {
      const [raw, fragment] = url.split('#');
      const clean = raw
        ? (base && raw.startsWith(base + '/')
            ? raw.slice(base.length)
            : raw
          ).split('?')[0]
        : route;
      if (rendered.has(clean)) {
        if (fragment) {
          assert.ok(
            rendered.get(clean).includes(`id="${fragment}"`),
            `${route}: missing anchor ${url}`,
          );
          anchors++;
        }
      } else await access('out' + clean);
      checked++;
    }
  }
  assert.ok(
    html.includes('mailto:') || route !== '/contact',
    'Contact uses real email destination',
  );
}
assert.ok((await readFile('out/404.html', 'utf8')).includes('PAGE NOT FOUND'));
console.log(
  `Verified ${routes.length} routes, ${checked} local links/assets, ${anchors} anchor destinations, headings and 404 output.`,
);
