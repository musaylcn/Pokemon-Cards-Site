import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FavoritesContext } from "./FavoritesContext";

export const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const { addToFavorites } = useContext(FavoritesContext);
  const [showMessage, setShowMessage] = useState(false); // 👈 mesaj için state

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemonDetail(data);
    };
    fetchPokemonDetail();
  }, [id]);

  const handleAddToFavorites = () => {
  addToFavorites(pokemonDetail); // Tüm detayı ekliyoruz
  setShowMessage(true);
  setTimeout(() => setShowMessage(false), 2000);
};

  if (!pokemonDetail) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="pokemon-detail">
      <div className="detail-header">
        <h1 className="pokemon-name">{pokemonDetail.name}</h1>
        <button className="add-to-favorites" onClick={handleAddToFavorites}>
          ❤️ Favorilere Ekle
        </button>
        {showMessage && <p style={{ color: "green" }}>✅ Favorilere eklendi!</p>}
      </div>

      <img
        src={pokemonDetail.sprites.other.dream_world.front_default}
        alt={pokemonDetail.name}
        className="pokemon-image"
      />
      <p className="types">
        <strong>Types:</strong>{" "}
        {pokemonDetail.types.map((type) => type.type.name).join(", ")}
      </p>

      <div className="grid-three-cols">
        <p className="pokemon-info"><span>Height:</span> {pokemonDetail.height / 10} m</p>
        <p className="pokemon-info"><span>Weight:</span> {pokemonDetail.weight / 10} kg</p>
        <p className="pokemon-info"><span>Speed:</span> {pokemonDetail.stats[5].base_stat}</p>
      </div>

      <div className="grid-three-cols">
        <div className="pokemon-info"><span>Experience:</span> {pokemonDetail.base_experience}</div>
        <div className="pokemon-info"><span>Attack:</span> {pokemonDetail.stats[1].base_stat}</div>
        <div className="pokemon-info">
          <span>Abilities:</span>
          <p>{pokemonDetail.abilities.map((a) => a.ability.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};