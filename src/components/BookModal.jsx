
function renderStars(rating) {
  if (rating == null) return <span className="no-rating">No rating</span>;
  const filled = Math.round(rating * 5);
  const pct    = Math.round(rating * 100);
  return (
    <>
      <span className="stars">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`star ${i < filled ? 'filled' : ''}`}>★</span>
        ))}
      </span>
      <span className="rating-pct">{pct}%</span>
    </>
  );
}

export default function BookModal({ book, onClose, onSimilar }) {
  const title   = book.title   || 'Untitled';
  const authors = (book.authors || []).map(a => a.name).join(', ') || 'Unknown';
  const cover   = book.image   || null;
  const rating  = book.rating?.average ?? null;
  const pages   = book.number_of_pages ? `${book.number_of_pages} pages` : null;
  const year    = book.publish_date ? parseInt(book.publish_date, 10) : null;
  const desc    = book.description || null;
  const isbn    = book.identifiers?.isbn_13 || book.identifiers?.isbn_10 || null;

  return (
    <div
      className="modal-overlay open"
      onClick={e => { if (e.target.classList.contains('modal-overlay')) onClose(); }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>

        <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>

        <div className="modal-inner">
          <div className="modal-cover">
            {cover
              ? <img src={cover} alt={`Cover of ${title}`} />
              : <div className="cover-placeholder large"><span>?</span></div>
            }
          </div>

          <div className="modal-info">
            <h2>{title}</h2>
            {book.subtitle && <p className="modal-subtitle">{book.subtitle}</p>}
            <p className="modal-author">by {authors}</p>

            <div className="modal-meta">
              {year  && <span>📅 {year}</span>}
              {pages && <span>📄 {pages}</span>}
              {isbn  && <span>ISBN {isbn}</span>}
            </div>

            <div className="modal-rating">{renderStars(rating)}</div>

            {desc && <p className="modal-desc">{desc}</p>}

            <button
              className="find-similar-modal-btn"
              onClick={() => onSimilar(book.id, title)}
            >
              Find Similar Books →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}