import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLoader } from "../App";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { setIsLoading } = useLoader();

  const fetchMovies = () => {
    console.log("Fetching movies...");

    setIsLoading(true);
    axios
      .get("http://localhost:3000/api/movies")
      .then((res) => {
        setMovies(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Errore nel caricamento dei film");
        setIsLoading(false);
      });
  };

  const renderMovies = () => {
    return movies.map((movie) => {
      return (
        <div className="col" key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      );
    });
  };

  useEffect(fetchMovies, []);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4 text-primary">
          <i className="bi bi-camera-reels me-2"></i> Lista dei Film
        </h1>
        <Link to="/movies/create" className="btn btn-primary btn-lg">
          <i className="bi bi-plus-circle me-2"></i> Crea Nuovo Film
        </Link>
      </div>
      <h2 className="mb-4">Tutti i film disponibili</h2>
      {movies.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">{renderMovies()}</div>
      ) : (
        <div className="alert alert-info">
          Nessun film disponibile. Crea un nuovo film!
        </div>
      )}
    </div>
  );
}
