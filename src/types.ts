export interface OpenLibraryDoc {
  key: string; // e.g. '/works/OL45883W'
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_key?: string[];
}

export interface SearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryDoc[];
}
