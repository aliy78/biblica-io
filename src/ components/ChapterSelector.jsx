export default function ChapterSelector({ book, selectedChapterId, setSelectedChapterId }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">📄 Выберите главу:</label>
      <select
        value={selectedChapterId || ""}
        onChange={(e) => setSelectedChapterId(Number(e.target.value))}
        className="w-full p-2 border rounded"
      >
        <option value="">-- Выберите главу --</option>
        {book.Chapters.map((chapter) => (
          <option key={chapter.ChapterId} value={chapter.ChapterId}>
            Глава {chapter.ChapterId}
          </option>
        ))}
      </select>
    </div>
  );
}
