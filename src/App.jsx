import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import Trending from "./pages/Trending";
import Favorite from "./pages/Favorite";
import Search from "./pages/Search";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/series" element={<Series />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
