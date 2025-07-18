import { useEffect, useState } from "react";
import BookSelector from "./components/BookSelector";
import ChapterView from "./components/ChapterView";

function App() {
  const [bibleData, setBibleData] = useState(null);
  const [bookIndex, setBookIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  useEffect(() => {
    fetch("/biblie.json.json") // путь к файлу из public/
      .then((res) => res.json())
      .then((data) => setBibleData(data));
  }, []);

  if (!bibleData) return <p className="p-4 text-center">⏳ Загрузка текста Библии...</p>;

  const book = bibleData.Books[bookIndex];
  const chapter = book.Chapters[chapterIndex];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">📖 Biblica.io</h1>
      <p className="italic mb-6">Перевод: {bibleData.Translation}</p>
      <BookSelector books={bibleData.Books} setBookIndex={setBookIndex} />
      <ChapterView chapter={chapter} />
    </div>
  );
}

export default App;

