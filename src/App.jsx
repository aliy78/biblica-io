import { useState, useEffect } from "react";

export default function App() {
  const [bibleData, setBibleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/biblie.json")
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить biblie.json");
        return res.json();
      })
      .then((data) => {
        setBibleData(data.Books || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setError("Не удалось загрузить файл.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Biblica.io — проверка данных</h1>

      {loading && <p>⏳ Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <pre>{JSON.stringify(bibleData, null, 2)}</pre>
    </div>
  );
}
