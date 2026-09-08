/**
 * Builds a stable, URL-safe key from a display string, for use in
 * data-semtag-id values (e.g. "San Francisco, CA" -> "san-francisco-ca").
 * Pure helper; adds no runtime behavior.
 */
export const semtagSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
