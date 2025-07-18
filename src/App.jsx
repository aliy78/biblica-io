import { useEffect, useState } from "react";
import BookSelector from "./components/BookSelector";
import ChapterSelector from "./components/ChapterSelector";
import ChapterView from "./components/ChapterView";

function App() {
  const [bibleData, setBibleData] = useState(null);
  const [bookIndex, setBookIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  // Загружаем файл из public
  useEffect(() => {
    fetch("/biblie.json.json")
      .then((res) => res.json())
      .then((data) => setBibleData(data));
  }, []);

  // Пока загружается — показываем сообщение
  if (!bibleData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">⏳ Загрузка текста Библии...</p>
      </div>
    );
  }

  // Выбираем книгу и главу
  const book = bibleData.Books[bookIndex];
  const chapter = book.Chapters[chapterIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">📖 Biblica.io</h1>
          <p className="italic text-sm mt-2 text-gray-500 dark:text-gray-300">
            Перевод: {bibleData.Translation}
          </p>
        </header>

        {/* Компоненты выбора книги и главы */}
        <BookSelector
          books={bibleData.Books}
          setBookIndex={setBookIndex}
          setChapterIndex={setChapterIndex}
        />
        <ChapterSelector
          chapters={book.Chapters}
          chapterIndex={chapterIndex}
          setChapterIndex={setChapterIndex}
        />

        {/* Отображение стихов */}
        <ChapterView chapter={chapter} />
      </div>
    </div>
  );
}

export default App;
