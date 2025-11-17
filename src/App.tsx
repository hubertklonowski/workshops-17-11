import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import Pagination from './components/Pagination';
import BookModal from './components/BookModal';
import { useDebounce } from './hooks/useDebounce';
import { searchBooks, getWorkDetail } from './api';
import { OpenLibraryDoc, SearchResponse } from './types';

const LIMIT = 20;

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [detail, setDetail] = useState<any>(null);
  const totalPages = data ? Math.ceil(data.numFound / LIMIT) : 0;

  // Auto search on debounced query change
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setData(null); setPage(1); return;
    }
    fetchData(debouncedQuery, 1);
  }, [debouncedQuery]);

  async function fetchData(currentQuery: string, newPage: number) {
    setLoading(true); setError(null);
    try {
      const res = await searchBooks({ query: currentQuery, page: newPage, limit: LIMIT });
      setData(res); setPage(newPage);
    } catch (e: any) {
      setError(e.message || 'Nieznany błąd');
    } finally {
      setLoading(false);
    }
  }

  async function openDetail(workKey: string) {
    setSelectedKey(workKey); setDetail(null); setError(null); setLoading(true);
    try {
      const d = await getWorkDetail(workKey);
      setDetail(d);
    } catch (e: any) {
      setError(e.message || 'Nie udało się pobrać szczegółów');
    } finally { setLoading(false); }
  }

  function closeDetail() { setSelectedKey(null); setDetail(null); }

  const docs: OpenLibraryDoc[] = data?.docs || [];

  return (
    <>
      <header>
        <h1>Wyszukiwarka Książek – OpenLibrary</h1>
      </header>
      <main>
        <SearchBar value={query} onChange={setQuery} onSubmit={() => fetchData(query, 1)} loading={loading} />
        {error && <div className="error" role="alert">{error}</div>}
        {loading && <div className="loading" aria-live="polite">Ładowanie...</div>}
        {!loading && docs.length === 0 && debouncedQuery && !error && <p>Brak wyników.</p>}
        <div className="results" aria-live="polite">
          {docs.map(doc => <BookCard key={doc.key} doc={doc} onOpen={openDetail} />)}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={(p) => fetchData(query, p)} />
        <BookModal detail={detail} onClose={closeDetail} />
      </main>
    </>
  );
};

export default App;
