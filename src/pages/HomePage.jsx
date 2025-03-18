import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/movies")
      .then((response) => {
        console.log("Dati ricevuti:", response.data);
        setMovies(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore dettagliato:", err.message);
        console.error("Risposta del server:", err.response);
        setError("Errore nel caricamento dei film: " + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Home Page - Lista dei Film</h1>
      <ul className="list-group">
        {movies.map((movie) => (
          <li key={movie.id} className="list-group-item">
            <h2>{movie.title}</h2>
            <p>Direttore: {movie.director}</p>
            <p>Anno: {movie.release_year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
