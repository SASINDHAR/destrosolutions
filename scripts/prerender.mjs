import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import App, { routeInfo } from '../.prerender/page.js';
const template = await readFile('out/index.html', 'utf8');
const origin = 'https://sasindhar.github.io';
const base = (process.env.SITE_BASE || '/destrosolutions/').replace(/\/$/, '');
const siteURL = origin + base + '/';
const escape = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const urls = [];
for (const [path, [title, description]] of Object.entries({
  ...routeInfo,
  '/404': ['Page not found', 'Return to DestroSolutions.'],
})) {
  const fullTitle = path === '/' ? title : title + ' | DestroSolutions';
  const url = siteURL + (path === '/' ? '' : path.slice(1) + '/');
  const markup = renderToString(createElement(App, { path }));
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': siteURL + '#organization',
        name: 'DestroSolutions',
        url: 'https://www.destrosolutions.com/',
        email: 'avinashchowdam@destrosolutions.com',
        telephone: '+91 9398793452',
        sameAs: ['https://www.linkedin.com/company/destrosolutions'],
      },
      {
        '@type': 'WebSite',
        '@id': siteURL + '#website',
        url: siteURL,
        name: 'DestroSolutions',
        publisher: { '@id': siteURL + '#organization' },
      },
    ],
  };
  const html = template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(description)}"/>`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${escape(fullTitle)}"/>`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escape(description)}"/>`,
    )
    .replace(
      '</head>',
      `<link rel="canonical" href="${url}"/><meta property="og:url" content="${url}"/><meta name="twitter:title" content="${escape(fullTitle)}"/><meta name="twitter:description" content="${escape(description)}"/><meta name="robots" content="${path === '/404' ? 'noindex, follow' : 'index, follow'}"/><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script></head>`,
    );
  if (path === '/404') await writeFile('out/404.html', html);
  else {
    const dir = 'out' + (path === '/' ? '' : path);
    await mkdir(dir, { recursive: true });
    await writeFile(dir + '/index.html', html);
    urls.push(url);
  }
}
await writeFile(
  'out/robots.txt',
  `User-agent: *\nAllow: /\nSitemap: ${siteURL}sitemap.xml\n`,
);
await writeFile(
  'out/sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls.map((url) => `<url><loc>${url}</loc></url>`).join('') +
    '</urlset>',
);
console.log(
  `Prerendered ${Object.keys(routeInfo).length} pages, 404, sitemap and structured metadata.`,
);
