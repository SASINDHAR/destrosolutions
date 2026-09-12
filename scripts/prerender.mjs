import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import App, { routeInfo } from '../.prerender/page.js';
const template = await readFile('out/index.html', 'utf8');
const escape = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
for (const [path, [title, description]] of Object.entries({
  ...routeInfo,
  '/404': ['Page not found', 'Return to DestroSolutions.'],
})) {
  const markup = renderToString(createElement(App, { path }));
  let html = template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escape(title)} | DestroSolutions</title>`,
    )
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(description)}"/>`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escape(title)} | DestroSolutions"/>`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escape(description)}"/>`,
    )
    .replace(
      '</head>',
      `<link rel="canonical" href="https://www.destrosolutions.com${path === '/' ? '/' : path}"/><meta name="robots" content="noindex, nofollow"/></head>`,
    );
  if (path === '/404') await writeFile('out/404.html', html);
  else {
    const dir = 'out' + (path === '/' ? '' : path);
    await mkdir(dir, { recursive: true });
    await writeFile(dir + '/index.html', html);
  }
}
await writeFile('out/robots.txt', 'User-agent: *\nDisallow: /\n');
console.log(
  `Prerendered ${Object.keys(routeInfo).length} pages and a 404 page.`,
);
