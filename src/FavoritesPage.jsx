import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";

export const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  const handleRemove = (pokemon) => {
    const confirmDelete = window.confirm(
      `${pokemon.name} adlı Pokémon'u favorilerden silmek istiyor musunuz?`
    );
    if (confirmDelete) {
      removeFromFavorites(pokemon.id);
    }
  };

  return (
    <div>
      <h1>Favori Pokémonlar</h1>
      {favorites.length === 0 ? (
        <p>Hiç favori yok.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {favorites.map((pokemon) => (
            <li key={pokemon.id} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10, position: "relative" }}>
              <button
                onClick={() => handleRemove(pokemon)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "none",
                  border: "none",
                  color: "red",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
              <h3>{pokemon.name}</h3>
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
                width={100}
              />
              <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
              <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
              <p><strong>Speed:</strong> {pokemon.stats[5].base_stat}</p>
              <p><strong>Height:</strong> {pokemon.height / 10} m</p>
              <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
