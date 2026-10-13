import { getCollection, type CollectionEntry } from 'astro:content';
export type Kind = 'investigations' | 'projects' | 'articles';
export type Entry = CollectionEntry<Kind>;
export const roots: Record<Kind, string> = { investigations: '/explore', projects: '/projects', articles: '/writing' };
export const kindLabels: Record<Kind, string> = { investigations: 'Investigation', projects: 'Project', articles: 'Writing' };
export function href(entry: Entry) { return `${roots[entry.collection]}/${entry.id}/`; }
export function isPublic(entry: Entry) { return !entry.data.draft && entry.data.visibility === 'public'; }
export function isRoutable(entry: Entry) { return !entry.data.draft && entry.data.visibility !== 'private'; }
export async function allContent(): Promise<Entry[]> {
  const groups = await Promise.all([getCollection('investigations'), getCollection('projects'), getCollection('articles')]);
  const entries: Entry[] = groups.flat();
  const byKey = new Map(entries.map(e => [`${e.collection}:${e.id}`, e]));
  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) throw new Error(`Invalid content slug: ${entry.id}`);
    for (const relation of entry.data.related) {
      const target = byKey.get(`${relation.collection}:${relation.id}`);
      if (!target) throw new Error(`Broken relationship in ${entry.id}: ${relation.id}`);
      if (isRoutable(entry) && !isRoutable(target)) throw new Error(`Published content ${entry.id} links to hidden content ${target.id}`);
    }
  }
  return entries.sort((a, b) => a.data.order - b.data.order);
}
export async function publicContent(kind?: Kind) {
  const entries = (await allContent()).filter(e => isPublic(e) && (!kind || e.collection === kind));
  if (kind === 'articles') entries.sort((a, b) => {
    const aDate = 'publishedAt' in a.data ? a.data.publishedAt || '' : '';
    const bDate = 'publishedAt' in b.data ? b.data.publishedAt || '' : '';
    return bDate.localeCompare(aDate) || a.data.order - b.data.order;
  });
  return entries;
}
export async function connections(entry: Entry) {
  const all = await allContent();
  return entry.data.related.map(relation => ({ entry: all.find(e => e.collection === relation.collection && e.id === relation.id)!, reason: relation.reason }));
}
export const formatDate = (date: string) => new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
