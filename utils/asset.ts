// Root-relative paths in frontmatter point into the deck's public folder, under the deck's base URL.
export function resolveAssetUrl(url: string, base: string): string {
  return url.startsWith('/') ? `${base.replace(/\/$/, '')}${url}` : url
}
