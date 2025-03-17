import express from "express";
import movieRouter from "./routers/movieRouter.js";
import setImagePath from "./middlewares/imagePath.js";
import cors from "cors";

const app = express();
const port = 3000;

// Configura CORS per consentire richieste da http://localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.static("public"));
app.use(express.json());
app.use(setImagePath);

app.get("/", (req, res) => {
  res.send("Server Movies tutto a posto!");
});

app.use("/api/movies", movieRouter);

app.listen(port, () => {
  console.log(`Server Movies in funzione sulla porta: ${port}`);
});
