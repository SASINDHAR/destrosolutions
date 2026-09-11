import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { routeInfo } from '../.prerender/page.js';
const routes=Object.keys(routeInfo);
const base=(process.env.SITE_BASE||'/').replace(/\/$/,'');
let checked=0;
for (const route of routes) {
 const file='out'+(route==='/'?'':route)+'/index.html';
 const html=await readFile(file,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one primary heading`);
 assert.ok(!html.includes('Untitled site'),`${route}: no starter metadata`);
 assert.ok(html.includes('id="main"'),`${route}: skip-link destination`);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if(url.startsWith('/')&&!url.startsWith('//')) {
   const raw=url.split(/[?#]/)[0];
   const clean=base && raw.startsWith(base+'/') ? raw.slice(base.length) : raw;
   if(routes.includes(clean)) await access('out'+(clean==='/'?'':clean)+'/index.html');
   else await access('out'+clean);
   checked++;
  }
 }
 assert.ok(html.includes('mailto:')||route!=='/contact','Contact uses real email destination');
}
assert.ok((await readFile('out/404.html','utf8')).includes('PAGE NOT FOUND'));
console.log(`Verified ${routes.length} rendered routes, ${checked} local links/assets, headings, contact destination and 404 output.`);

