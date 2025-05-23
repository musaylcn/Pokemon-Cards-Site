import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards"; // PokemonCards bileşenini import ediyoruz

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (pokemon.length === 0) {
    return <h1>Pokemon Bulunamadi</h1>;
  }

  return (
    <div className="container">
      <div className="poke-title">
        <h1>Pokemon Kartları</h1>
      </div>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul className="cards">
        {searchData.map((curPokemon) => (
          <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
        ))}
      </ul>
    </div>
  );
};
