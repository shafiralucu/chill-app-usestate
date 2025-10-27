import React from "react";

export default function MovieList({ movies, onSelect, onDelete, onEdit }) {
  if (movies.length === 0) return <p style={{ color: "#64748b" }}>No movies yet. Add one!</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
      {movies.map((m) => (
        <li key={m.id} style={card}>
          <div>
            <div style={title}>{m.title}</div>
            <div style={sub}>{m.genre} • {m.year} • ⭐ {m.rating}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={smallBtn} onClick={() => onSelect(m.id)}>Select</button>
            <button style={smallBtn} onClick={() => onEdit(m.id)}>Edit</button>
            <button style={{ ...smallBtn, background: "#ef4444" }} onClick={() => onDelete(m.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

const card = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: 12, border: "1px solid #e2e8f0", borderRadius: 10 };
const title = { fontWeight: 700 };
const sub = { fontSize: 13, color: "#475569" };
const smallBtn = { padding: "6px 10px", borderRadius: 8, border: 0, background: "#0ea5e9", color: "#fff", cursor: "pointer" };