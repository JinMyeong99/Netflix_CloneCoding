import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import Trending from "./pages/Trending";
import Favorite from "./pages/Favorite";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="bg-neutral-900 min-h-screen text-white">
      {!hideNavbar && <Navbar />}
      <main className={hideNavbar ? "" : "pt-16"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
