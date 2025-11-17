import { OpenLibraryDoc, SearchResponse } from './types';

const BASE_URL = 'https://openlibrary.org';

export interface SearchParams {
  query: string;
  page: number;
  limit: number;
}

export async function searchBooks({ query, page, limit }: SearchParams): Promise<SearchResponse> {
  const url = new URL(`${BASE_URL}/search.json`);
  url.searchParams.set('q', query);
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
}

export interface WorkDetail {
  description?: string | { value?: string };
  subjects?: string[];
  title?: string;
  covers?: number[];
}

export async function getWorkDetail(workKey: string): Promise<WorkDetail> {
  const cleaned = workKey.startsWith('/works/') ? workKey : `/works/${workKey}`;
  const res = await fetch(`${BASE_URL}${cleaned}.json`);
  if (!res.ok) throw new Error('Nie udało się pobrać szczegółów');
  return res.json();
}

export function coverUrl(coverId?: number, size: 'S'|'M'|'L'='M') {
  return coverId ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg` : undefined;
}
