import React, { useEffect, useRef } from 'react';
import { WorkDetail } from '../api';
import { coverUrl } from '../api';

interface Props {
  detail: WorkDetail | null;
  onClose: () => void;
}

const BookModal: React.FC<Props> = ({ detail, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (detail && ref.current) {
      ref.current.focus();
    }
  }, [detail]);
  if (!detail) return null;
  const description = typeof detail.description === 'string' ? detail.description : detail.description?.value;
  const cover = detail.covers?.length ? coverUrl(detail.covers[0], 'L') : undefined;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={detail.title}>
      <div className="modal" ref={ref} tabIndex={-1}>
        <button className="close-btn" onClick={onClose} aria-label="Zamknij">×</button>
        <h2>{detail.title}</h2>
        {cover && <img src={cover} alt={`Okładka: ${detail.title}`} style={{maxHeight:400,objectFit:'cover',width:'100%',borderRadius:6}} />}
        {description && <p style={{whiteSpace:'pre-line'}}>{description}</p>}
        {detail.subjects && (
          <p><strong>Tematy:</strong> {detail.subjects.slice(0, 15).join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default BookModal;
