// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Pokemon } from "./Pokemon";
import { PokemonDetail } from "./PokemonDetail";
import { Header } from "./Header";
import { FavoritesProvider } from "./FavoritesContext"; // ← DİKKAT: süslü parantez içinde
import { Quizz } from "./Quizz";
import { FavoritesPage } from "./FavoritesPage";

export function App() {
  return (
    <FavoritesProvider> {/* ← Tüm uygulamayı sarar */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route path="/:id" element={<PokemonDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/quizz" element={<Quizz />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}
