import { useState, useEffect } from "react";
import BookSelector from "./components/BookSelector";
import ChapterSelector from "./components/ChapterSelector";
import ChapterView from "./components/ChapterView";

export default function App() {
  const [bibleData, setBibleData] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/biblie.json.json")
      .then((res) => res.json())
      .then((data) => setBibleData(data.Books || data));
  }, []);

  const book = bibleData.find((b) => b.BookId === selectedBookId);
  const chapter = book?.Chapters.find((c) => c.ChapterId === selectedChapterId);

  const toggleFavorite = (verse, book, chapter) => {
    const key = `${book.BookId}_${chapter.ChapterId}_${verse.VerseId}`;
    const isFav = favorites.some((f) => f.key === key);
    setFavorites((prev) =>
      isFav ? prev.filter((f) => f.key !== key) : [...prev, { key, ...verse }]
    );
  };

  const handleCopyVerse = (verse, book, chapter) => {
    const text = `${book.BookTitle} ${chapter.ChapterId}:${verse.VerseId} — ${verse.Text}`;
    navigator.clipboard.writeText(text);
    alert("Стих скопирован!");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📘 Biblica.io</h1>
      <BookSelector
        books={bibleData}
        selectedBookId={selectedBookId}
        setSelectedBookId={setSelectedBookId}
        setSelectedChapterId={setSelectedChapterId}
      />
      {book && (
        <ChapterSelector
          book={book}
          selectedChapterId={selectedChapterId}
          setSelectedChapterId={setSelectedChapterId}
        />
      )}
      {book && chapter && (
        <ChapterView
          book={book}
          chapter={chapter}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
          handleCopyVerse={handleCopyVerse}
        />
      )}
    </div>
  );
}
