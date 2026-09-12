import { currentPath } from './site-path';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { routeInfo } from './page';
import './globals.css';
import './pages.css';
const path = currentPath();
const info = routeInfo[path];
if (info) {
  document.title = info[0] + ' | DestroSolutions';
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', info[1]);
}
const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App path={path} />
  </React.StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
