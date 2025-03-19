import axios from "axios";
import { useState } from "react";

export default function ReviewForm({ movie_id, reloadReviews }) {
  const endpoint = `http://localhost:3000/api/movies/${movie_id}/reviews`;

  const initialValue = {
    name: "",
    text: "",
    vote: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione dei campi
    if (!formData.name || !formData.vote || !formData.text) {
      setError("Nome, voto e testo sono obbligatori");
      return;
    }

    // Validazione del voto
    const vote = parseInt(formData.vote);
    if (vote < 1 || vote > 5) {
      setError("Il voto deve essere compreso tra 1 e 5");
      return;
    }

    axios
      .post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setFormData(initialValue);
        setError(null);
        reloadReviews();
      })
      .catch((err) => {
        console.log(err);
        setError("Errore durante l'invio della recensione");
      });
  };

  const setFieldValue = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="card mt-4">
      <h5>Aggiungi una recensione</h5>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={setFieldValue}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Testo</label>
            <textarea
              name="text"
              className="form-control"
              value={formData.text}
              onChange={setFieldValue}
              required
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label>Voto (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              name="vote"
              className="form-control"
              value={formData.vote}
              onChange={setFieldValue}
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Crea Recensione
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
