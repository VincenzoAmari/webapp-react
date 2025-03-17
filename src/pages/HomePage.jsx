export default function HomePage() {
  const movies = [
    { id: 6, title: "The Matrix", director: "Wachowski", release_year: 1999 },
    { id: 7, title: "Inception", director: "Nolan", release_year: 2010 },
  ];

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
