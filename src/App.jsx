import { useState, useEffect } from "react";
import BookSelector from "./components/BookSelector";
import ChapterSelector from "./components/ChapterSelector";
import ChapterView from "./components/ChapterView";

export default function App() {
  const [bibleData, setBibleData] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Загружаем JSON
  useEffect(() => {
    fetch("./biblie.json")
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить biblie.json");
        return res.json();
      })
      .then((data) => {
        setBibleData(data.Books || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка:", err);
        setError("Файл biblie.json не найден или повреждён.");
        setLoading(false);
      });
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

  return (<div style={{ padding: 20 }}>
    <h1>Проверка загрузки</h1>
    <pre>{JSON.stringify(bibleData, null, 2)}</pre>
  </div>
    
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <BookSelector
            books={bibleData}
            selectedBookId={selectedBookId}
            setSelectedBookId={(id) => {
              setSelectedBookId(id);
              setSelectedChapterId(null); // Сброс главы при выборе новой книги
            }}
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
        </>
      )}
    </div>
  );
}
