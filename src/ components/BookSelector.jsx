export default function BookSelector({ books, setBookIndex, setChapterIndex }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">📘 Книга:</label>
      <select
        onChange={(e) => {
          setBookIndex(Number(e.target.value));
          setChapterIndex(0); // сбрасываем главу при смене книги
        }}
        className="p-2 rounded border w-full"
      >
        {books.map((book, idx) => (
          <option key={book.BookId} value={idx}>
            Книга {book.BookId}
          </option>
        ))}
      </select>
    </div>
  );
}

