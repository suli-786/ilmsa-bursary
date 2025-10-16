const baseUrl = new URL(import.meta.env.BASE_URL ?? '/', 'http://astro.local');
const ABSOLUTE_URL_PATTERN = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

/**
 * Prefix a relative path or hash fragment with Astro's configured base URL.
 * External URLs (http, https, mailto, etc.) are returned unchanged.
 */
export const withBase = (path = '/'): string => {
  if (!path) {
    return baseUrl.pathname;
  }

  if (ABSOLUTE_URL_PATTERN.test(path) || path.startsWith('//')) {
    return path;
  }

  const [pathnamePart, hashPart = ''] = path.split('#');
  const normalizedPath = pathnamePart.replace(/^\//, '');
  const resolved = new URL(normalizedPath, baseUrl);
  let pathname = resolved.pathname;
  const search = resolved.search;

  if (!normalizedPath && pathnamePart === '') {
    pathname = baseUrl.pathname;
  } else if (!normalizedPath && pathnamePart === '/') {
    pathname = resolved.pathname;
  } else if (!pathnamePart.endsWith('/') && pathname.endsWith('/') && normalizedPath) {
    pathname = pathname.replace(/\/$/, '');
  }

  const hash = hashPart ? `#${hashPart}` : '';
  return `${pathname}${search}${hash}`;
};
