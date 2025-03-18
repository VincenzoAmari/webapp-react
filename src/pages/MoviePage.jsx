import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

export default function MoviePage() {
  // Estrazione informazione (http://localhost:5173/movies/1)
  const { id } = useParams();

  const [movie, setMovie] = useState({});

  // Chiamata fetch per il film
  const fetchMovie = () => {
    axios
      .get(`http://localhost:3000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((error) => console.log(error));
  };

  // Invocazione chiamata al caricamento del componente
  useEffect(fetchMovie, [id]);

  // Rendering delle recensioni
  const renderReviews = () => {
    return movie.reviews?.map((review) => {
      return <ReviewCard key={review.id} review={review} />;
    });
  };

  return (
    <>
      <h1>{movie?.title}</h1>
      {movie?.image && (
        <img
          src={movie.image}
          alt={movie.title}
          style={{ maxWidth: "300px" }}
        />
      )}
      <p>Direttore: {movie?.director}</p>
      <p>Anno: {movie?.release_year}</p>
      <p>Genere: {movie?.genre}</p>
      <p>Abstract: {movie?.abstract}</p>

      <section>
        <h4>Recensioni della community</h4>
        {movie.reviews && movie.reviews.length > 0 ? (
          renderReviews()
        ) : (
          <p>Nessuna recensione disponibile</p>
        )}
      </section>
    </>
  );
}
