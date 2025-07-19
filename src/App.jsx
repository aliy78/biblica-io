import { useState, useEffect } from "react";

export default function App() {
  const [bibleData, setBibleData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/biblie.json")
      .then((res) => {
        console.log("Статус ответа:", res.status);
        if (!res.ok) throw new Error("Файл не найден");
        return res.json();
      })
      .then((data) => {
        console.log("Загруженные данные:", data);
        setBibleData(data.Books || []);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err.message);
        setError("Не удалось загрузить biblie.json");
      });
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>📘 Проверка загрузки данных</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <pre style={{ background: "#f4f4f4", padding: "12px", borderRadius: "6px" }}>
        {JSON.stringify(bibleData, null, 2)}
      </pre>
    </div>
  );
}
