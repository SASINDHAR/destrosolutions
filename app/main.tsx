import { currentPath } from './site-path';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { routeInfo } from './page';
import { pageTitle } from './content';
import './globals.css';
const path = currentPath();
const info = routeInfo[path];
if (info) {
  document.title = pageTitle(path);
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
