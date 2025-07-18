export default function ChapterSelector({ chapters, chapterIndex, setChapterIndex }) {
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-1">📂 Глава:</label>
      <select
        value={chapterIndex}
        onChange={(e) => setChapterIndex(Number(e.target.value))}
        className="p-2 rounded border w-full"
      >
        {chapters.map((chapter, idx) => (
          <option key={chapter.ChapterId} value={idx}>
            Глава {chapter.ChapterId}
          </option>
        ))}
      </select>
    </div>
  );
}

