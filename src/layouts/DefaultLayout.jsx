import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useLoader } from "../App";

export default function DefaultLayout() {
  const { isLoading } = useLoader();

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
