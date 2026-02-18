/**
 * Base path for GitHub Pages (e.g. /cgg-eha.v0.2). Empty when not set.
 * Set NEXT_PUBLIC_BASE_PATH at build time when deploying to GitHub Pages.
 */
const BASE = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '';

/** Prefix a path (e.g. /images/foo.jpg) with the base path for GitHub Pages. */
export function imgPath(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
}
