import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

export default function MoviePage() {
  const { id } = useParams();
  const movieId = parseInt(id); // Converti id in numero
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = () => {
    axios
      .get(`http://localhost:3000/api/movies/${movieId}`)
      .then((res) => {
        console.log("Dati del film:", res.data);
        setMovie(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Errore nel caricamento del film");
        setLoading(false);
      });
  };

  useEffect(fetchMovie, [movieId]);

  const renderReviews = () => {
    return movie.reviews?.map((review) => {
      return <ReviewCard key={review.id} review={review} />;
    });
  };

  if (loading) return <p>Caricamento...</p>;
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
