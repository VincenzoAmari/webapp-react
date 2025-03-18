export default function MovieCard({ movie }) {
  return (
    <div className="card">
      {movie.image && (
        <img
          src={movie.image}
          alt={movie.title}
          className="card-img-top"
          style={{ maxWidth: "200px" }}
        />
      )}
      <div className="card-body">
        <h3 className="card-title">{movie.title}</h3>
        <p className="card-text">Direttore: {movie.director}</p>
        <p className="card-text">Anno: {movie.release_year}</p>
      </div>
    </div>
  );
}
