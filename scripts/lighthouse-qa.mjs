import lighthouse from '../.qa-tools/node_modules/lighthouse/core/index.js';
import { launch } from '../.qa-tools/node_modules/chrome-launcher/dist/index.js';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
await mkdir('qa-output', { recursive: true });
await mkdir('qa-output/lighthouse-profile', { recursive: true });
const chrome = await launch({
  chromePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  chromeFlags: ['--headless', '--no-sandbox'],
  userDataDir: resolve('qa-output/lighthouse-profile'),
});
try {
  for (const [name, path] of [
    ['home', '/'],
    ['contact', '/contact/'],
    ['training', '/training/'],
  ]) {
    const result = await lighthouse(
      'http://127.0.0.1:4173/destrosolutions' + path,
      {
        port: chrome.port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
      },
    );
    await writeFile('qa-output/lighthouse-' + name + '.json', result.report);
    console.log(
      name,
      JSON.stringify(
        Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
      ),
    );
  }
} finally {
  chrome.kill();
}
