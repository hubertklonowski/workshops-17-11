import React, { FormEvent } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const SearchBar: React.FC<Props> = ({ value, onChange, onSubmit, loading }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form onSubmit={handleSubmit} aria-label="Formularz wyszukiwania książek">
      <input
        type="text"
        placeholder="Szukaj tytułu, autora..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Pole wyszukiwania"
      />
      <button type="submit" disabled={!value.trim() || loading} aria-live="polite">
        {loading ? 'Szukam...' : 'Szukaj'}
      </button>
    </form>
  );
};

export default SearchBar;
