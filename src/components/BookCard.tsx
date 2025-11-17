import React from 'react';
import { OpenLibraryDoc } from '../types';
import { coverUrl } from '../api';

interface Props {
  doc: OpenLibraryDoc;
  onOpen: (key: string) => void;
}

const BookCard: React.FC<Props> = ({ doc, onOpen }) => {
  const authors = doc.author_name?.join(', ');
  const cover = coverUrl(doc.cover_i, 'M');
  return (
    <div className="card" role="group" aria-label={`Karta książki ${doc.title}`}>
      {cover ? (
        <img src={cover} alt={`Okładka: ${doc.title}`} loading="lazy" />
      ) : (
        <div style={{height:300,display:'flex',alignItems:'center',justifyContent:'center',background:'#ddd',borderRadius:4}}>
          Brak okładki
        </div>
      )}
      <strong>{doc.title}</strong>
      {authors && <div className="meta" aria-label="Autorzy">{authors}</div>}
      {doc.first_publish_year && <div className="meta">Rok: {doc.first_publish_year}</div>}
      <button onClick={() => onOpen(doc.key)} aria-label={`Otwórz szczegóły ${doc.title}`}>
        Szczegóły
      </button>
    </div>
  );
};

export default BookCard;
