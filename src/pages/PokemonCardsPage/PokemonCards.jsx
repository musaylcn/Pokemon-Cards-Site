import { useNavigate } from "react-router-dom"; 

export const PokemonCards = ({ pokemonData }) => {
  const navigate = useNavigate();


  const handleMoreInfo = () => {
    navigate(`/${pokemonData.id}`); 
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
        <p style={{ fontSize: "1.6rem", color: "white" }}>Daha Fazla...</p>
      </button>
    </li>
  );
};
