const API_KEY = import.meta.env.VITE_API_KEY; 
const BASE_URL = 'https://api.bigbookapi.com';

export async function searchBooks(query) {
  const url = `${BASE_URL}/search-books?api-key=${API_KEY}&query=${encodeURIComponent(query)}&number=20`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(res.status === 402
      ? 'Daily quota exceeded. Try again tomorrow.'
      : `API error ${res.status}`
    );
  }

  const data = await res.json();
  const books = Array.isArray(data.books) ? data.books.flat() : [];

  if (!books.length) throw new Error('No books found. Try a different search.');

  return { books, available: data.available ?? books.length };
}

export async function fetchBookDetail(id) {
  const res = await fetch(`${BASE_URL}/${id}?api-key=${API_KEY}`);
  if (!res.ok) throw new Error(`Could not load book details (${res.status})`);
  return await res.json();
}

export async function fetchSimilarBooks(id) {
  const res = await fetch(`${BASE_URL}/${id}/similar?api-key=${API_KEY}`);
  if (!res.ok) throw new Error(`Could not load similar books (${res.status})`);
  const data = await res.json();

  const books = data.similar_books || [];
  if (!books.length) throw new Error('No similar books found for this title.');

  return books;
}