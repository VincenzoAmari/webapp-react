import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLoader } from "../App";

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

  if (error) return <p>{error}</p>;

  return (
    <>
      <h1 className="text-primary">Lista dei Film</h1>
      <h2>Tutti i film disponibili</h2>
      <div className="row row-cols-3">{renderMovies()}</div>
    </>
  );
}
