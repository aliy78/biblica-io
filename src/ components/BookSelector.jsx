export default function BookSelector({ books, selectedBookId, setSelectedBookId, setSelectedChapterId }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">📚 Выберите книгу:</label>
      <select
        value={selectedBookId || ""}
        onChange={(e) => {
          setSelectedBookId(Number(e.target.value));
          setSelectedChapterId(null);
        }}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Выберите книгу --</option>
        {books.map((book) => (
          <option key={book.BookId} value={book.BookId}>
            {book.BookTitle}
          </option>
        ))}
      </select>
    </div>
  );
}
