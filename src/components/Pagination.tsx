import React from 'react';

interface Props {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;
  return (
    <div className="pagination" aria-label="Paginacja wyników">
      <button disabled={prevDisabled} onClick={() => onChange(page - 1)} aria-label="Poprzednia strona">&larr;</button>
      <span style={{alignSelf:'center'}}>Strona {page} / {totalPages}</span>
      <button disabled={nextDisabled} onClick={() => onChange(page + 1)} aria-label="Następna strona">&rarr;</button>
    </div>
  );
};

export default Pagination;
