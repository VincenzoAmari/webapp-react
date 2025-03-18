export default function MovieCard({ movie }) {
  return (
    <div className="card">
      <h3>{movie.title}</h3>
      <p>Direttore: {movie.director}</p>
      <p>Anno: {movie.release_year}</p>
    </div>
  );
}
