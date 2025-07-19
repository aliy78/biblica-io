import { useEffect, useState } from "react";

export default function App() {
  const [bibleData, setBibleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/biblie.json")
      .then((res) => {
        if (!res.ok) throw new Error("Файл не найден");
        return res.json();
      })
      .then((data) => {
        // Если структура начинается с ключа Books
        const books = data.Books || data;
        setBibleData(books);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err.message);
        setError("Не удалось загрузить biblie.json");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>📘 Biblica.io — проверка</h1>

      {loading && <p>⏳ Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {bibleData.length > 0 ? (
        <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
          {JSON.stringify(bibleData, null, 2)}
        </pre>
      ) : !loading && !error ? (
        <p>Нет данных для отображения.</p>
      ) : null}
    </div>
  );
}
