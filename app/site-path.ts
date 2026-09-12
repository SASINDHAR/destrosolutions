/// <reference types="vite/client" />
/** Preserve root routing on custom domains and repository paths on GitHub Pages. */
export function sitePath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
}
export function currentPath(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let path = window.location.pathname;
  if (base && (path === base || path.startsWith(base + '/')))
    path = path.slice(base.length);
  return path.replace(/\/$/, '') || '/';
}
