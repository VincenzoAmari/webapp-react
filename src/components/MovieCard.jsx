import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="card h-100 shadow-sm">
      {movie.image && (
        <div
          className="card-img-top-wrapper"
          style={{ height: "500px", backgroundColor: "#f8f9fa" }}
        >
          <img
            src={movie.image}
            className="card-img-top"
            alt={movie.title}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text text-muted">Direttore: {movie.director}</p>
        <p className="card-text text-muted">Anno: {movie.release_year}</p>
        <Link to={`/movies/${movie.id}`} className="btn btn-primary">
          <i className="bi bi-eye me-2"></i> Visualizza
        </Link>
      </div>
    </div>
  );
}
