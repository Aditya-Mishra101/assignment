
import BookCard from './BookCard';

export default function ResultsContainer({ books, countText, onSelectBook, onSimilar }) {
  return (
    <main id="results-container">
      <p id="results-count">{countText}</p>
      <div id="books-grid">
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onSelect={onSelectBook}
            onSimilar={onSimilar}
          />
        ))}
      </div>
    </main>
  );
}