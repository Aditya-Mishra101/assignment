import { useState } from 'react';
import { Link } from 'react-router-dom';

import SearchBar        from '../components/SearchBar';
import LoadingState     from '../components/LoadingState';
import ErrorState       from '../components/ErrorState';
import ResultsContainer from '../components/ResultContainer';
import BookModal        from '../components/BookModal';

import { searchBooks, fetchBookDetail, fetchSimilarBooks } from '../utils/api';

export default function Home() {
  const [status, setStatus]           = useState('idle');

  const [books, setBooks]             = useState([]);
  const [errorText, setErrorText]     = useState('');
  const [countText, setCountText]     = useState('');
  const [selectedBook, setSelectedBook] = useState(null); 


  async function handleSearch(query) {
    setStatus('loading');
    try {
      const { books: fetched, available } = await searchBooks(query);
      setBooks(fetched);
      setCountText(`${available.toLocaleString()} results — showing ${fetched.length}`);
      setStatus('success');
    } catch (err) {
      setErrorText(err.message);
      setStatus('error');
    }
  }

  async function handleSelectBook(id) {
    try {
      const book = await fetchBookDetail(id);
      setSelectedBook(book);
    } catch (err) {
      setErrorText(err.message);
      setStatus('error');
    }
  }

  async function handleSimilar(id, title) {
    setStatus('loading');
    try {
      const similar = await fetchSimilarBooks(id);
      setBooks(similar);
      setCountText(`Books similar to "${title}" — showing ${similar.length}`);
      setStatus('success');
    } catch (err) {
      setErrorText(err.message);
      setStatus('error');
    }
  }

  return (
    <div className="app-wrapper">

      <header className="app-header">
        <h1>Book Search</h1>
        <Link to="/about" className="nav-link">About</Link>
      </header>

      <SearchBar onSearch={handleSearch} />

      {status === 'loading' && <LoadingState />}

      {status === 'error' && (
        <ErrorState message={errorText} />
      )}

      {status === 'success' && (
        <ResultsContainer
          books={books}
          countText={countText}
          onSelectBook={handleSelectBook}
          onSimilar={handleSimilar}
        />
      )}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onSimilar={(id, title) => {
            setSelectedBook(null);
            handleSimilar(id, title);
          }}
        />
      )}

    </div>
  );
}