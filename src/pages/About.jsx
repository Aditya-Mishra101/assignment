import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <header className="app-header">
        <h1>Book Search</h1>
        <Link to="/" className="nav-link">← Back to Search</Link>
      </header>

      <main className="about-content">

        <section>
          <h2>About This App</h2>
          <p>
            Book Search lets you find books by title or author using the
            Big Book API. Click any book for full details, or find similar
            reads with one tap.
          </p>
        </section>

        <section>
          <h2>API Used</h2>
          <p>
            <strong>Big Book API</strong> — <a href="https://bigbookapi.com" target="_blank" rel="noreferrer">bigbookapi.com</a>
            <br />
            Provides book search, detailed metadata, cover images, ratings,
            and similar book recommendations.
          </p>
        </section>

        <section>
          <h2>User Stories</h2>
          <ul className="user-stories">
            <li>
              <strong>US-1:</strong> As a reader, I want to search books by
              title or author, so that I can quickly find books I'm interested in.
            </li>
            <li>
              <strong>US-2:</strong> As a user, I want to see a book's details
              (description, year, pages, ISBN) in a popup, so that I can decide
              whether to read it without leaving the page.
            </li>
            <li>
              <strong>US-3:</strong> As a reader, I want to find books similar
              to one I liked, so that I can discover new titles in the same genre.
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}