import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pokemon } from "./pages/PokemonCardsPage/Pokemon";
import { PokemonDetail } from "./pages/PokemonDetailPage/PokemonDetail";
import { Header } from "./components/navbar/Header";
import { FavoritesProvider } from "./pages/FavoritesPage/FavoritesContext"; 
import { Quizz } from "./pages/QuizzPage/Quizz";
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { FortuneCard } from "./pages/FortuneCardsPage/FortuneCards"; 

export function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/:id" element={<PokemonDetail />} />
          <Route path="/favoriler" element={<FavoritesPage />} />
          <Route path="/quiz" element={<Quizz />} />
          <Route path="/fal" element={<FortuneCard />} /> 
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}