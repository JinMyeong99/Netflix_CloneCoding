import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthManager from "./components/AuthManager";
import { Toaster } from "react-hot-toast";
import ContentDetailLayer from "./components/ContentDetailLayer";

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
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      <AuthManager />
      <Toaster
        position="top-right"
        containerStyle={{ top: 80, right: 90 }}
        toastOptions={{
          className:
            "!bg-red-950/90 !text-red-50 !border !border-red-400/30 !rounded-xl !shadow-lg !backdrop-blur !px-4 !py-3",
        }}
      />
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
      <ContentDetailLayer />
    </div>
  );
}

export default App;
