import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { useLoader } from "../App";

export default function MoviePage() {
  const { id } = useParams();
  const movieId = parseInt(id);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { setIsLoading } = useLoader();

  const fetchMovie = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/movies/${movieId}`)
      .then((res) => {
        console.log("Dati del film:", res.data);
        setMovie(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Errore nel caricamento del film");
        setIsLoading(false);
      });
  };

  useEffect(fetchMovie, [movieId, setIsLoading]);

  const renderReviews = () => {
    return movie.reviews?.map((review) => {
      return <ReviewCard key={review.id} review={review} />;
    });
  };

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Film non trovato</p>;

  return (
    <>
      <h1>{movie.title}</h1>
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
          style={{ maxWidth: "300px" }}
        />
      )}
      <p>Direttore: {movie.director}</p>
      <p>Anno: {movie.release_year}</p>
      <p>Genere: {movie.genre}</p>
      <p>Abstract: {movie.abstract}</p>

      <section>
        <h4>Recensioni della community</h4>
        {movie.reviews && movie.reviews.length > 0 ? (
          renderReviews()
        ) : (
          <p>Nessuna recensione disponibile</p>
        )}
      </section>

      <section>
        {movieId && (
          <ReviewForm movie_id={movieId} reloadReviews={fetchMovie} />
        )}
      </section>
    </>
  );
}
