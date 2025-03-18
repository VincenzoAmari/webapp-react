export default function ReviewCard({ review }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{review.name}</h5>
        <p className="card-text">Voto: {review.vote}</p>
      </div>
    </div>
  );
}
