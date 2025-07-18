export default function ChapterView({ book, chapter, toggleFavorite, favorites, handleCopyVerse }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">📖 {book.BookTitle} — Глава {chapter.ChapterId}</h2>
      {chapter.Verses.map((v) => {
        const key = `${book.BookId}_${chapter.ChapterId}_${v.VerseId}`;
        const isFav = favorites.some(f => f.key === key);
        return (
          <div key={v.VerseId} className="p-4 rounded bg-white dark:bg-gray-800 shadow">
            <strong>{v.VerseId}</strong>. {v.Text}
            <div className="mt-2 space-x-4">
              <button
                onClick={() => toggleFavorite(v, book, chapter)}
                className="text-sm text-indigo-500 hover:underline"
              >
                {isFav ? "⭐ Удалить из избранного" : "☆ В избранное"}
              </button>
              <button
                onClick={() => handleCopyVerse(v, book, chapter)}
                className="text-sm text-green-600 hover:underline"
              >
                📤 Поделиться
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
