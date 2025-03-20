import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoader } from "../App"; // Importa useLoader da App.jsx

export default function CreateMoviePage() {
  const initialData = {
    title: "",
    director: "",
    image: null,
    abstract: "",
    genre: "",
    release_year: "",
  };

  const navigate = useNavigate();
  const { setIsLoading } = useLoader(); // Usa il loader

  const [formData, setFormData] = useState(initialData);

  const setFieldValue = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("director", formData.director);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("abstract", formData.abstract);
    formDataToSend.append("genre", formData.genre);
    formDataToSend.append("release_year", formData.release_year);

    setIsLoading(true); // Attiva il loader
    axios
      .post("http://localhost:3000/api/movies", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setIsLoading(false); // Disattiva il loader
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Disattiva il loader
      });
  };

  return (
    <>
      <h1>Crea un nuovo film</h1>

      <section id="movie-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Titolo:</label>
            <input
              className="form-control"
              name="title"
              type="text"
              value={formData.title}
              onChange={setFieldValue}
              required
            />
          </div>
          <div className="mb-4">
            <label>Direttore:</label>
            <input
              className="form-control"
              name="director"
              type="text"
              value={formData.director}
              onChange={setFieldValue}
              required
            />
          </div>
          <div className="mb-4">
            <label>Anno di uscita:</label>
            <input
              className="form-control"
              name="release_year"
              type="number"
              value={formData.release_year}
              onChange={setFieldValue}
              required
            />
          </div>
          <div className="mb-4">
            <label>Genere:</label>
            <input
              className="form-control"
              name="genre"
              type="text"
              value={formData.genre}
              onChange={setFieldValue}
              required
            />
          </div>
          <div className="mb-4">
            <label>Immagine:</label>
            <input
              className="form-control"
              name="image"
              type="file"
              onChange={setFieldValue}
              required
            />
          </div>
          <div className="mb-4">
            <label>Abstract:</label>
            <textarea
              value={formData.abstract}
              className="form-control"
              name="abstract"
              onChange={setFieldValue}
              required
            ></textarea>
          </div>
          <div className="border-top mb-3 pt-3 d-flex justify-content-between">
            <Link className="btn btn-secondary" to="/">
              Indietro
            </Link>
            <button className="btn btn-success" type="submit">
              Aggiungi Film
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
