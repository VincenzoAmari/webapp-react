import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ movieId, onReviewAdded }) {
  const [name, setName] = useState("");
  const [vote, setVote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !vote) {
      alert("Nome e voto sono obbligatori");
      return;
    }

    const newReview = { name, vote: parseInt(vote) };

    axios
      .post(`http://localhost:3000/api/movies/${movieId}/reviews`, newReview)
      .then((res) => {
        onReviewAdded(res.data.review); // Passa la nuova recensione al componente genitore
        setName(""); // Resetta il form
        setVote("");
      })
      .catch((error) => {
        console.error("Errore durante l'invio della recensione:", error);
        alert("Errore durante l'invio della recensione");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h5>Aggiungi una recensione</h5>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nome
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="vote" className="form-label">
          Voto (1-10)
        </label>
        <input
          type="number"
          className="form-control"
          id="vote"
          value={vote}
          onChange={(e) => setVote(e.target.value)}
          min="1"
          max="10"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Invia Recensione
      </button>
    </form>
  );
}
