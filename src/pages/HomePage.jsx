import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  // Funzione fetch per i film
  const fetchMovies = () => {
    console.log("Fetching movies...");

    axios
      .get("http://localhost:3000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Funzione per il rendering delle card dei film
  const renderMovies = () => {
    return movies.map((movie) => {
      return (
        <div className="col" key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      );
    });
  };

  // Invocazione chiamata al caricamento del componente
  useEffect(fetchMovies, []);

  return (
    <>
      <h1 className="text-primary">Lista dei Film</h1>
      <h2>Tutti i film disponibili</h2>
      <div className="row row-cols-3">{renderMovies()}</div>
    </>
  );
}
