
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

export default function BookCard({ book, onSelect, onSimilar }) {
  const title   = book.title || 'Untitled';
  const authors = (book.authors || []).map(a => a.name).join(', ') || 'Unknown author';
  const cover   = book.image || null;
  const rating  = book.rating?.average ?? null;

  return (
    <article
      className="book-card"
      data-id={book.id}
      onClick={() => onSelect(book.id)}
    >
      <div className="cover-wrap">
        {cover
          ? <img src={cover} alt={`Cover of ${title}`} loading="lazy"
              onError={e => e.target.parentElement.classList.add('no-cover')} />
          : <div className="cover-placeholder"><span>?</span></div>
        }
        <button
          className="similar-btn"
          title="Find similar books"
          onClick={e => {
            e.stopPropagation(); // prevent card click firing too
            onSimilar(book.id, title);
          }}
        >
          ≋ Similar
        </button>
      </div>

      <div className="card-body">
        <h2 className="book-title">{title}</h2>
        <p className="book-author">{authors}</p>
        <div className="book-rating">{renderStars(rating)}</div>
      </div>
    </article>
  );
}