export default function ChapterView({ chapter }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold mb-2">📖 Глава {chapter.ChapterId}</h2>
      {chapter.Verses.map((v) => (
        <div
          key={v.VerseId}
          className="bg-white dark:bg-gray-800 p-3 rounded shadow"
        >
          <strong>{v.VerseId}</strong>. {v.Text}
        </div>
      ))}
    </div>
  );
}
