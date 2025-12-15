import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { lazy, Suspense, useEffect } from "react";
import useGenreStore from "./store/useGenreStore";

import AuthManager from "./components/AuthManager";

const Home = lazy(() => import("./pages/Home"));
const Movie = lazy(() => import("./pages/Movie"));
const Series = lazy(() => import("./pages/Series"));
const Trending = lazy(() => import("./pages/Trending"));
const Favorite = lazy(() => import("./pages/Favorite"));
const Search = lazy(() => import("./pages/Search"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  const { fetchGenre, status: genreStatus } = useGenreStore();

  useEffect(() => {
    if (genreStatus === "idle") {
      fetchGenre();
    }
  }, [fetchGenre, genreStatus]);

  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <AuthManager />

      {!hideNavbar && <Navbar />}
      <main>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              로딩 중...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/series" element={<Series />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
