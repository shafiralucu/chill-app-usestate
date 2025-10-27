import React, { useState } from "react";
import AuthPanel from "../components/movies/AuthPanel";
import MovieForm from "../components/movies/MovieForm";
import MovieList from "../components/movies/MovieList";
import SelectedMovie from "../components/movies/SelectedMovie";

// small id helper
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const SEED_MOVIES = [
  { id: uid(), title: "Your Name", year: 2016, rating: 8.4, genre: "Anime" },
  { id: uid(), title: "Interstellar", year: 2014, rating: 8.6, genre: "Sci‑Fi" },
  { id: uid(), title: "La La Land", year: 2016, rating: 8.0, genre: "Musical" },
];

export default function TaskMovies() {
  // --- Mutable state owners (parent) ---
  // Users & Auth
  const [users, setUsers] = useState([]); // [{id, username, password}]
  const [currentUser, setCurrentUser] = useState(null); // {id, username}

  // Movies
  const [movies, setMovies] = useState(SEED_MOVIES);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [editingMovieId, setEditingMovieId] = useState(null);

  // Derived values (not state)
  const selectedMovie = movies.find((m) => m.id === selectedMovieId) || null;
  const editingMovie = movies.find((m) => m.id === editingMovieId) || null;

  // --- Auth handlers ---
  function handleSignup({ username, password }) {
    if (!username || !password) return alert("Please fill username & password");
    const exists = users.some((u) => u.username === username);
    if (exists) return alert("Username already exists");
    const newUser = { id: uid(), username, password };
    setUsers((prev) => [...prev, newUser]);
    alert("Sign up success. You can login now.");
  }

  function handleLogin({ username, password }) {
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) return alert("Invalid credentials or user not found");
    setCurrentUser({ id: user.id, username: user.username });
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  // --- Movie CRUD (immutable) ---
  function addMovie(movie) {
    const newMovie = { id: uid(), ...movie };
    setMovies((prev) => [newMovie, ...prev]);
  }

  function updateMovie(updated) {
    setMovies((prev) => prev.map((m) => (m.id === updated.id ? { ...m, ...updated } : m)));
    setEditingMovieId(null);
  }

  function deleteMovie(id) {
    setMovies((prev) => prev.filter((m) => m.id !== id));
    if (selectedMovieId === id) setSelectedMovieId(null);
    if (editingMovieId === id) setEditingMovieId(null);
  }

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ margin: 0, marginBottom: 4 }}>🎬 Chill App – Interactive (useState + CRUD)</h1>
      <p style={{ color: "#64748b", marginTop: 0 }}>Login/Signup • Choose a movie • Add/Edit/Delete • Props • Immutable updates</p>

      <section
        className="chill-crud"
        style={{
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 16,
          background: "#f8fafc",
          borderRadius: 12,
          padding: 16,
          border: "1px solid #e2e8f0",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={panelStyle}>
            <h3 style={h3}>Account</h3>
            <AuthPanel
              currentUser={currentUser}
              onLogin={handleLogin}
              onSignup={handleSignup}
              onLogout={handleLogout}
            />
          </div>

          <div style={panelStyle}>
            <h3 style={h3}>Add a Movie</h3>
            <MovieForm onSave={addMovie} />
          </div>

          {editingMovie && (
            <div style={{ ...panelStyle, borderColor: "#f59e0b" }}>
              <h3 style={h3}>Edit Movie</h3>
              <MovieForm movie={editingMovie} onSave={updateMovie} isEdit />
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={panelStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={h3}>Movies</h3>
              {selectedMovie && (
                <span style={badgeStyle}>Selected: {selectedMovie.title}</span>
              )}
            </div>
            <MovieList
              movies={movies}
              onSelect={(id) => setSelectedMovieId(id)}
              onDelete={deleteMovie}
              onEdit={(id) => setEditingMovieId(id)}
            />
          </div>

          <div style={panelStyle}>
            <h3 style={h3}>Details</h3>
            {selectedMovie ? (
              <SelectedMovie movie={selectedMovie} />
            ) : (
              <p style={{ color: "#64748b" }}>Choose a movie to see details.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

const panelStyle = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: 16,
};
const h3 = { margin: 0, marginBottom: 8 };
const badgeStyle = { fontSize: 12, padding: "4px 8px", borderRadius: 9999, background: "#e2e8f0" };