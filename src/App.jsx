import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pokemon } from "./Pokemon";
import { PokemonDetail } from "./PokemonDetail";
import { Header } from "./Header";
import { FavoritesProvider } from "./FavoritesContext"; 
import { Quizz } from "./Quizz";
import { FavoritesPage } from "./FavoritesPage";
import { FortuneCard } from "./FortuneCards"; // Yeni eklenen component

export function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/:id" element={<PokemonDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/quizz" element={<Quizz />} />
          <Route path="/fortune" element={<FortuneCard />} /> {/* Yeni eklenen route */}
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}