import { createContext, useContext, useState } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import CreateMoviePage from "./pages/CreateMoviePage";

const LoaderContext = createContext();

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader deve essere usato all'interno di App");
  }
  return context;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/create" element={<CreateMoviePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoaderContext.Provider>
  );
}

export default App;
