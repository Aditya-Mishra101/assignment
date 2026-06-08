import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  function handleSubmit() {
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <div className="search-box">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        placeholder="Enter book title or author..."
        aria-label="Book title or author"
        id="book-input"
      />
      <button id="search-btn" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}