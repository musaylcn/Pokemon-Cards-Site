import { useNavigate } from "react-router-dom"; // useNavigate hook'unu import ediyoruz

export const PokemonCards = ({ pokemonData }) => {
  const navigate = useNavigate();

  // "Daha Fazla..." butonuna tıklandığında URL'yi değiştirecek fonksiyon
  const handleMoreInfo = () => {
    navigate(`/${pokemonData.id}`); // Pokemon'un ID'sini URL'ye ekliyoruz
  };

  return (
    <li className="pokemon-card">
      <figure>
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
      </figure>
      <h1 className="pokemon-name">{pokemonData.name}</h1>
      <div className="pokemon-info pokemon-highlight">
        <p>{pokemonData.types.map((curType) => curType.type.name).join(", ")}</p>
      </div>
      <button className="more-info" onClick={handleMoreInfo}>
        <p>Daha Fazla...</p>
      </button>
    </li>
  );
};
